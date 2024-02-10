import type { PreviewImage, PreviewImageMap } from 'components/timg'
import lqip from 'lqip-modern'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { normalizeUrl } from 'tools/client/norm'

import { db } from './db'

export async function getPreviewImageMap(urls: string[]) {
  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url) as string
        return [cacheKey, await getPreviewImage(url, { cacheKey })]
      },
      {
        concurrency: 8,
      }
    )
  )

  return previewImagesMap
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreviewImage | null> {
  try {
    try {
      const cachedPreviewImage = await db.get(cacheKey)
      if (cachedPreviewImage) {
        return cachedPreviewImage
      }
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err.message)
    }

    const body = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    )
    const result = await lqip(body)
    console.log('lqip', { ...result.metadata, url, cacheKey })

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64,
    }

    try {
      await db.set(cacheKey, previewImage)
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err.message)
    }

    return previewImage
  } catch (err) {
    console.warn('failed to create preview image', url, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage)
