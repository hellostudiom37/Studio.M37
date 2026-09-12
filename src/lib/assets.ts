import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

export function getLogoPath(): string | null {
  if (fs.existsSync(path.join(publicDir, "logo.svg"))) return "/logo.svg";
  if (fs.existsSync(path.join(publicDir, "logo.png"))) return "/logo.png";
  return null;
}

export function hasFounderPhoto(): boolean {
  return fs.existsSync(path.join(publicDir, "images", "founder.jpg"));
}
