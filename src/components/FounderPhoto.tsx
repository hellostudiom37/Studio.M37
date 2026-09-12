import Image from "next/image";
import { hasFounderPhoto } from "@/lib/assets";

export default function FounderPhoto() {
  const ready = hasFounderPhoto();

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black">
      {ready ? (
        <Image
          src="/images/founder.jpg"
          alt="Founder of Studio M.37"
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-8 text-center">
          <span className="font-light-brand text-sm uppercase tracking-[0.15em] text-offwhite/50">
            Founder photo pending — add an image to source-assets/
          </span>
        </div>
      )}
    </div>
  );
}
