import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'
import { rdyBitch, redisNamespace, redisURL } from 'tools/siteConfig'

let db: Keyv
if (rdyBitch) {
  const keyvRedis = new KeyvRedis(redisURL)
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
} else {
  db = new Keyv()
}

export { db }
