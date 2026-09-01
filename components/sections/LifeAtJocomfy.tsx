"use client";
import { motion, Variants } from "framer-motion";
import { SectionLabel } from "../shared/SectionLabel";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
}

export function LifeAtJocomfy() {
  return (
    <section className="bg-[#fffdf7] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <SectionLabel>Life at Jocomfy</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-[Poppins] text-4xl font-black leading-none tracking-[-0.06em] text-[#17186b] sm:text-6xl">
          A place to <span className="text-[#ed4545]">explore,</span> <br /> create & belong.
        </h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12"
        >
          {/* Large Image Card */}
          <motion.div variants={item} className="md:col-span-8 min-h-[400px] rounded-3xl bg-[#0d104c] p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <span className="relative text-sm font-bold text-[#f2c500]">01 — Creative Arts</span>
            <div className="relative">
              <h3 className="font-[Poppins] text-3xl font-bold text-white">The Studio</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">Music, dance, and visual arts in a sun-lit space designed for self-expression.</p>
            </div>
          </motion.div>

          {/* Small Yellow Card */}
          <motion.div variants={item} className="md:col-span-4 min-h-[400px] rounded-3xl bg-[#f2c500] p-8 flex flex-col justify-between">
            <span className="text-sm font-bold text-[#0d104c]">02 — Play</span>
            <div>
              <h3 className="font-[Poppins] text-3xl font-bold leading-none tracking-tight text-[#0d104c]">Sports &<br/> Movement</h3>
              <p className="mt-3 text-sm leading-6 text-[#0d104c]/70">Building character, teamwork and confidence on the field.</p>
            </div>
          </motion.div>

          {/* Small Beige Card */}
          <motion.div variants={item} className="md:col-span-4 min-h-[400px] rounded-3xl bg-[#f5eee2] p-8 flex flex-col justify-between">
            <span className="text-sm font-bold text-[#ed4545]">03 — Discovery</span>
            <div>
              <h3 className="font-[Poppins] text-3xl font-bold leading-none tracking-tight text-[#17186b]">Science &<br/> Robotics Lab</h3>
              <p className="mt-3 text-sm leading-6 text-[#17186b]/70">Hands-on innovation where curious minds build the future.</p>
            </div>
          </motion.div>

          {/* Large Light Blue Card */}
          <motion.div variants={item} className="md:col-span-8 min-h-[400px] rounded-3xl bg-[#a8cdf8] p-8 flex flex-col justify-between">
            <span className="text-sm font-bold text-[#17186b]">04 — Community</span>
            <div>
              <h3 className="font-[Poppins] text-3xl font-bold text-[#17186b]">Library & Leadership</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#17186b]/70">Quiet corners for readers and bold stages for tomorrow’s leaders.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}