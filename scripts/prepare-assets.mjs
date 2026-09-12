// Picks up files dropped into /source-assets and prepares them for the site:
// - a file named like "founder*" is center-cropped to a 3:4 vertical and written to public/images/founder.jpg
// - a file named like "logo*" is copied through to public/logo.<ext> as-is (svg preferred, raster otherwise)
//
// Idempotent by content, not just by name: each source file's hash is recorded after
// processing. If public/images/founder.jpg (or public/logo.*) gets hand-edited or
// replaced directly — bypassing source-assets/ — this script leaves it alone on the
// next run, since the source-assets file itself hasn't changed. It only reprocesses
// when the dropped-in source file's content actually changes.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "source-assets");
const imagesDir = path.join(root, "public", "images");
const publicDir = path.join(root, "public");
const hashFile = path.join(root, "src", "data", "asset-hashes.generated.json");

fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(path.dirname(hashFile), { recursive: true });

const hashOf = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
const hashes = fs.existsSync(hashFile) ? JSON.parse(fs.readFileSync(hashFile, "utf8")) : {};

if (!fs.existsSync(sourceDir)) {
  console.log("[prepare-assets] no source-assets folder found, skipping.");
  process.exit(0);
}

const files = fs.readdirSync(sourceDir).filter((f) => !f.startsWith("."));

const logoFile = files.find((f) => /logo/i.test(f));
// Any image that isn't the logo is treated as the founder portrait candidate.
const founderFile = files.find((f) => f !== logoFile && /\.(jpe?g|png|webp|heic)$/i.test(f));

let founderReady = fs.existsSync(path.join(imagesDir, "founder.jpg"));
let logoReady = fs.existsSync(path.join(publicDir, "logo.svg")) || fs.existsSync(path.join(publicDir, "logo.png"));

if (founderFile) {
  const input = path.join(sourceDir, founderFile);
  const currentHash = hashOf(input);
  if (hashes.founder === currentHash && founderReady) {
    console.log(`[prepare-assets] founder photo unchanged since last run — leaving public/images/founder.jpg as-is.`);
  } else {
    const output = path.join(imagesDir, "founder.jpg");
    // Smart "attention" cropping (finds the most salient region, e.g. the face)
    // rather than a blind center-crop, since source photos aren't pre-cropped.
    await sharp(input)
      .resize(1200, 1600, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 90 })
      .toFile(output);
    founderReady = true;
    hashes.founder = currentHash;
    console.log(`[prepare-assets] founder photo (${founderFile}) cropped to 3:4 -> public/images/founder.jpg`);
  }
}

if (logoFile) {
  const input = path.join(sourceDir, logoFile);
  const currentHash = hashOf(input);
  const ext = path.extname(logoFile).toLowerCase();
  const output = path.join(publicDir, `logo${ext === ".svg" ? ".svg" : ".png"}`);
  if (hashes.logo === currentHash && logoReady) {
    console.log(`[prepare-assets] logo unchanged since last run — leaving public/logo${ext === ".svg" ? ".svg" : ".png"} as-is.`);
  } else {
    if (ext === ".svg") {
      // Make the mark recolorable (white in dark contexts, black in light ones)
      // instead of the fixed black the export tool wrote into every <path>.
      const svg = fs.readFileSync(input, "utf8").replace(/<path(?![^>]*fill=)/g, '<path fill="currentColor"');
      fs.writeFileSync(output, svg);
    } else {
      await sharp(input).png().toFile(output);
    }
    logoReady = true;
    hashes.logo = currentHash;
    console.log(`[prepare-assets] logo copied -> public/logo${ext === ".svg" ? ".svg" : ".png"}`);
  }
}

fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 2) + "\n");

fs.writeFileSync(
  path.join(root, "src", "data", "assets-status.generated.json"),
  JSON.stringify({ founderReady, logoReady }, null, 2)
);

if (!founderFile) console.log("[prepare-assets] no founder photo found yet in source-assets/ (looking for a filename containing 'founder').");
if (!logoFile) console.log("[prepare-assets] no logo file found yet in source-assets/ (looking for a filename containing 'logo').");
