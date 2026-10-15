import Image from "next/image";
import { site } from "@/lib/data";

/**
 * Plain portrait: no border, no radius, so a cut-out or any shape of photo sits directly on the glow.
 * The image is /public/profile.jpg. Animated by Hero via the data-photo-* hooks.
 */
export default function HeroPhoto() {
  return (
    <div data-photo-float className="relative mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[440px]">
      <div data-photo-glow aria-hidden="true" className="absolute -inset-[22%]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.32),rgb(var(--accent-deep)/0.12)_60%,transparent)] [animation:orb-pulse_6s_ease-in-out_infinite]" />
      </div>

      <div data-photo-frame className="relative">
        <div data-photo-reveal className="relative aspect-[4/5] w-full overflow-hidden">
          <div data-photo-img className="absolute inset-0">
            <Image
              src="/projects/profile.png"
              alt={site.name}
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 340px, 260px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
