import pMap from 'p-map'
import path from 'path'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'

export type PreviewImage = {
  width: number
  height: number
  base64: string
}

type ImageNode = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    blurDataURL?: string
    placeholder?: 'blur'
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Potrace = require('oslllo-potrace')
export async function lqip(
  input: AsyncIterable<any> | Iterable<any>,
  opts: {
    concurrency?: number
    outputFormat?: 'webp' | 'avif' | 'jpeg' | 'jpg'
    outputOptions?: object
    resize?: number | any[]
  } = {}
) {
  const { concurrency = 4, ...rest } = opts

  if (Array.isArray(input)) {
    return pMap(input, async (image) => compute(image, rest), {
      concurrency,
    })
  } else {
    return compute(input, opts)
  }
}

async function compute(
  input: any,
  opts: {
    concurrency?: number
    outputFormat?: 'svg' | 'webp' | 'avif' | 'jpeg' | 'jpg'
    outputOptions?: object
    resize?: number | any[]
  } = {}
) {
  const { resize = 12, outputFormat = 'webp', outputOptions } = opts
  //const traced = await Potrace(input).trace()
  //console.log(traced)
  const image = sharp(input).rotate()
  const metadata = await image.metadata()

  const resized = image.resize(
    ...(Array.isArray(resize)
      ? resize
      : [
          Math.min(metadata.width!, resize),
          Math.min(metadata.height!, resize),
          { fit: 'inside' },
        ])
  )

  let output

  if (outputFormat === 'svg') {
    output = resized.avif({
      quality: 8,
      ...outputOptions,
    })
  } else if (outputFormat === 'avif') {
    output = resized.avif({
      quality: 8,
      ...outputOptions,
    })
  } else if (outputFormat === 'webp') {
    output = resized.webp({
      quality: 10,
      alphaQuality: 10,
      smartSubsample: true,
      ...outputOptions,
    })
  } else if (outputFormat === 'jpg') {
    output = resized.jpeg({
      quality: 20,
      ...outputOptions,
    })
  } else {
    throw new Error(`Invalid outputformat "${outputFormat}"`)
  }

  const { data, info } = await output.toBuffer({ resolveWithObject: true })

  return {
    content: data,
    metadata: {
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      width: info.width,
      height: info.height,
      type: outputFormat,
      dataURIBase64: `data:image/${outputFormat};base64,${data.toString('base64')}`,
    },
  }
}
function isImageNode(node: ImageNode) {
  const img = node
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

async function createPreviewImage(node: ImageNode) {
  let result
  const url = node.properties.src
  const ext_img = url.startsWith('http')
  const local_img = path.join(`./public`, url)
  console.log(url)

  try {
    if (!ext_img) {
      result = await lqip(local_img)
    } else {
      const body = await fetch(url).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      )
      result = await lqip(body)
    }
    const previewImage: PreviewImage = {
      width: result.metadata.originalWidth,
      height: result.metadata.originalHeight,
      base64: result.metadata.dataURIBase64,
    }

    if (!result) throw Error(`Invalid image with src "${url}"`)
    ;(node.properties.width = previewImage.width ?? 768),
      (node.properties.height = previewImage.height ?? 432),
      (node.properties.blurDataURL = previewImage.base64),
      (node.properties.placeholder = 'blur')
  } catch (err) {
    // ignore redis errors
    console.warn(`redis error set "${url}"`, err)
  }

  //console.warn('failed to create preview image', url, err)
  return null
}

const smol = () => {
  return async function transformer(tree: any) {
    const images: ImageNode[] = []

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        images.push(node)
      }
    })

    for (const image of images) {
      await createPreviewImage(image)
    }

    return tree
  }
}

export default smol
