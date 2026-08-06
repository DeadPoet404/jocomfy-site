import { SectionLabel } from "../shared/SectionLabel";
import "@fontsource/baloo-2/400.css";
import "@fontsource/fredoka/400.css";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/lilita-one/400.css";
import "@fontsource/bubblegum-sans/400.css";
import "@fontsource/comic-neue/400.css";

export function GrowthMarquee() {
  return (
    <section id="growth" className="overflow-hidden bg-[#fffdf7] px-5 py-28 sm:px-8 sm:py-36 lg:px-8">
      <div className="mx-auto max-w-[1450px] text-center">
        <SectionLabel>Growth at every stage</SectionLabel>
        <div className="growth-marquee">
          <div className="growth-track growth-track-left">
            <span className="font-baloo">Curiosity</span><span className="font-fredoka">Character</span><span className="font-patrick">Confidence</span>
            <span className="font-lilita">Creativity</span><span className="font-bubblegum">Community</span><span className="font-comic">Kindness</span>
          </div>
          <div className="growth-track growth-track-right">
            <span className="font-lilita">Preschool</span><span className="font-bubblegum">Primary</span><span className="font-comic">Junior High</span>
            <span className="font-baloo">Explore</span><span className="font-fredoka">Learn</span><span className="font-patrick">Lead</span>
          </div>
        </div>
      </div>
    </section>
  );
}