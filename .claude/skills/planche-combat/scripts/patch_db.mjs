// Writes a combat sheet into src/assets/database/database.ts for one character or enemy.
// usage: node patch_db.mjs <database.ts> <entry id, e.g. ch-hugo> <sheet.png> <still.png> <desc.json>
// desc.json: { "frame": {"w":64,"h":64}, "anchor": {"x":32,"y":52}, "mirror": true, "anims": [...] }
// still.png: the first idle frame (south-east), trimmed (magick sheet.png -crop 64x64+0+0 +repage -trim +repage still.png)
import fs from "node:fs";

const [file, id, sheetPng, stillPng, descJson] = process.argv.slice(2);
let src = fs.readFileSync(file, "utf8");
const start = src.indexOf(`"id": "${id}"`);
if (start < 0) throw new Error(`no entry ${id}`);
// The row ends at its closing brace (rows are indented by 4 spaces): the next rows are never touched
const end = src.indexOf("\n    }", start);
if (end < 0) throw new Error(`no end of entry ${id}`);
let block = src.slice(start, end);
const b64 = (p) =>
  "data:image/png;base64," + fs.readFileSync(p).toString("base64");
const sheet = { image: b64(sheetPng), ...JSON.parse(fs.readFileSync(descJson, "utf8")) };
const json = JSON.stringify(sheet, null, 2).replace(/\n/g, "\n      ");
block = block.replace(/("sprite": ")[^"]*(")/, `$1${b64(stillPng)}$2`);
if (/"sheet": \{/.test(block)) {
  block = block.replace(/"sheet": \{[\s\S]*?\n      \},\n/, `"sheet": ${json},\n`);
} else {
  block = block.replace(/("sprite": "[^"]*",\n)/, `$1      "sheet": ${json},\n`);
}
if (!block.includes('"sheet": {')) {
  throw new Error(`${id} has no "sprite" to put the sheet after: add one first`);
}
src = src.slice(0, start) + block + src.slice(end);
fs.writeFileSync(file, src);
console.log(`sheet written for ${id}`);
