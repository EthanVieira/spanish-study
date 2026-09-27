// Builds the standalone GitHub Pages version of the tracker from site/index.html.
// The artifact version (site/index.html) is body-only; GitHub Pages needs a full document.
// Run: node site/build-pages.js   -> writes ../index.html at the repo root.
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const head = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n';
// Move <title> into <head>; everything else becomes the body.
const title = (src.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
const body = src.replace(/<title>[\s\S]*?<\/title>\s*/, '');
const out = head + title + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), out);
console.log('wrote index.html (' + out.length + ' bytes)');
