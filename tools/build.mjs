/* eslint-disable no-undef */
await Bun.build({
  entrypoints: ['tools/server/potrace.js'],
  outdir: 'tools/server/out',
  minify: false,
  target: 'node',
  external: ['potrace', 'sqip'], // default: []
})
export {}
