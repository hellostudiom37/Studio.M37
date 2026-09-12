import fs from "node:fs";
import path from "node:path";

// Inlines the logo SVG markup (rather than <img src="/logo.svg">) so its
// fill="currentColor" paths actually pick up the wrapping element's text
// color — an <img>-loaded SVG renders in its own document and ignores that.
export default function Logo({ className = "h-5" }: { className?: string }) {
  const svgPath = path.join(process.cwd(), "public", "logo.svg");
  if (!fs.existsSync(svgPath)) {
    return <span className={`${className} font-semibold-brand inline-block text-lg leading-none`}>Studio M.37</span>;
  }

  const raw = fs.readFileSync(svgPath, "utf8");
  const markup = raw.replace("<svg ", '<svg class="h-full w-auto block" ');

  return <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}
