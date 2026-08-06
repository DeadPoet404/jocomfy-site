
import { ImagePlaceholder } from "../shared/ImagePlaceholder";

export function ImageRhythm() {
  return (
    <section className="bg-[#fffdf7] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-0 lg:px-16" aria-label="Jocomfy school life">
      <div className="relative mt-16 mx-0 grid max-w-[1320px] grid-cols-1 items-end gap-5 md:ml-[18%] md:grid-cols-3">
        <ImagePlaceholder label="School community" className="h-72 rounded-3xl sm:h-64" />
        <ImagePlaceholder label="Learning together" className="h-56 rounded-3xl sm:h-80" />
        <ImagePlaceholder label="Jocomfy school life" className="h-96 rounded-3xl sm:h-[30rem]" />
      </div>
      <div className="mx-5 mt-10 h-px bg-black sm:mx-8 lg:mx-16" />
    </section>
  );
}
