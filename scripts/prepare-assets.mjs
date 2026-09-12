// Picks up files dropped into /source-assets and prepares them for the site:
// - a file named like "founder*" is center-cropped to a 3:4 vertical and written to public/images/founder.jpg
// - a file named like "logo*" is copied through to public/logo.<ext> as-is (svg preferred, raster otherwise)
// Safe to re-run any time; only touches its own output files.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "source-assets");
const imagesDir = path.join(root, "public", "images");
const publicDir = path.join(root, "public");

fs.mkdirSync(imagesDir, { recursive: true });

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
  const output = path.join(imagesDir, "founder.jpg");
  // Smart "attention" cropping (finds the most salient region, e.g. the face)
  // rather than a blind center-crop, since source photos aren't pre-cropped.
  await sharp(input)
    .resize(1200, 1600, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 90 })
    .toFile(output);
  founderReady = true;
  console.log(`[prepare-assets] founder photo (${founderFile}) cropped to 3:4 -> public/images/founder.jpg`);
}

if (logoFile) {
  const ext = path.extname(logoFile).toLowerCase();
  const input = path.join(sourceDir, logoFile);
  const output = path.join(publicDir, `logo${ext === ".svg" ? ".svg" : ".png"}`);
  if (ext === ".svg") {
    // Make the mark recolorable (white in dark contexts, black in light ones)
    // instead of the fixed black the export tool wrote into every <path>.
    const svg = fs.readFileSync(input, "utf8").replace(/<path(?![^>]*fill=)/g, '<path fill="currentColor"');
    fs.writeFileSync(output, svg);
  } else {
    await sharp(input).png().toFile(output);
  }
  logoReady = true;
  console.log(`[prepare-assets] logo copied -> public/logo${ext === ".svg" ? ".svg" : ".png"}`);
}

fs.writeFileSync(
  path.join(root, "src", "data", "assets-status.generated.json"),
  JSON.stringify({ founderReady, logoReady }, null, 2)
);

if (!founderFile) console.log("[prepare-assets] no founder photo found yet in source-assets/ (looking for a filename containing 'founder').");
if (!logoFile) console.log("[prepare-assets] no logo file found yet in source-assets/ (looking for a filename containing 'logo').");
