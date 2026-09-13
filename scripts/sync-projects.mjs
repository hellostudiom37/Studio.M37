// Reads content/projects/projectN/{projectN_name.txt, projectN_link.txt, projectN_preview_image/*}
// and produces:
//   - public/projects/projectN/<image files>  (resized/compressed, so Next can serve them lean)
//   - src/data/projects.generated.json        (name/link/slug/images consumed by the Portfolio page)
// Re-run safe: wipes and rebuilds both outputs from the content/ source each time.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Cards render well under 500px wide even on large desktops; 1600px covers
// retina without shipping full-resolution export files (which run several MB).
const MAX_WIDTH = 1600;

async function processImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const pipeline = sharp(inputPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  if (ext === ".png") {
    await pipeline.png({ quality: 82, compressionLevel: 9 }).toFile(outputPath);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: 82 }).toFile(outputPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(outputPath);
  }
}

const root = path.resolve(import.meta.dirname, "..");
const contentDir = path.join(root, "content", "projects");
const publicProjectsDir = path.join(root, "public", "projects");
const dataFile = path.join(root, "src", "data", "projects.generated.json");

fs.mkdirSync(path.dirname(dataFile), { recursive: true });

if (!fs.existsSync(contentDir)) {
  fs.writeFileSync(dataFile, "[]\n");
  console.log("[sync-projects] no content/projects folder found; wrote empty project list.");
  process.exit(0);
}

const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

const projectFolders = fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.rmSync(publicProjectsDir, { recursive: true, force: true });
fs.mkdirSync(publicProjectsDir, { recursive: true });

const projects = [];

for (const folder of projectFolders) {
  const dir = path.join(contentDir, folder);
  const readFirstMatch = (suffix) => {
    const file = fs.readdirSync(dir).find((f) => f.toLowerCase() === `${folder}${suffix}`.toLowerCase());
    return file ? fs.readFileSync(path.join(dir, file), "utf8").trim() : "";
  };

  const name = readFirstMatch("_name.txt") || folder;
  const link = readFirstMatch("_link.txt") || "";

  const imageFolder = path.join(dir, `${folder}_preview_image`);
  let images = [];
  if (fs.existsSync(imageFolder)) {
    const files = fs
      .readdirSync(imageFolder)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const destDir = path.join(publicProjectsDir, folder);
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of files) {
      await processImage(path.join(imageFolder, file), path.join(destDir, file));
    }
    images = files.map((f) => `/projects/${folder}/${f}`);
  }

  projects.push({ slug: folder, name, link, images });
}

fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2) + "\n");
console.log(`[sync-projects] wrote ${projects.length} project(s) to src/data/projects.generated.json`);
for (const p of projects) {
  if (!p.link) console.log(`[sync-projects]   ! ${p.slug}: missing link file (content/projects/${p.slug}/${p.slug}_link.txt)`);
  if (p.images.length === 0) console.log(`[sync-projects]   ! ${p.slug}: no preview images found in content/projects/${p.slug}/${p.slug}_preview_image/`);
}
