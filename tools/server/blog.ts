import { time, timeEnd } from 'console'
import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  isFeatured?: boolean
  image?: string
}

function parse(docs) {
  let rgx = /---\s*([\s\S]*?)\s*---/
  let match = rgx.exec(docs)
  let block = match![1]
  let content = docs.replace(rgx, '').trim()
  let lines = block.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  lines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    //@ts-ignore
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDX(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => (path.extname(file) === '.mdx' ? '.mdx' : '.md'))
}

function readMDX(loc) {
  let rawContent = fs.readFileSync(loc, 'utf-8')
  return parse(rawContent)
}

function getTweets(content) {
  let tweetMatches = content?.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
  return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)?.[0]) || []
}

function getMDXData(dir) {
  let mdxFiles = getMDX(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDX(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))
    let tweetIds = getTweets(content)
    return {
      metadata,
      slug,
      tweetIds,
      content,
    }
  })
}

export function getPosts() {
  return getMDXData(path.join(process.cwd(), 'app/content/posts'))
}
export function getProjects() {
  return getMDXData(path.join(process.cwd(), 'app/content/projects'))
}
let x

/* import { Glob } from "bun";

const glob = new Glob("*.mdx");

// Scans the current working directory and each of its sub-directories recursively
for await (const file of getMDXData(glob.( "app/content/posts"))) {
  console.log(file); // => "index.ts"
} */
