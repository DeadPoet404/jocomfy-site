"use client";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export function Leadership() {
  return (
    <section className="bg-[#f5eee2] px-5 py-20 sm:px-8 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="h-[520px] rounded-3xl bg-[repeating-linear-gradient(45deg,#ddd,#ddd_10px,#e5e5e5_10px,#e5e5e5_20px)] flex items-center justify-center"
        >
          <span className="text-sm font-bold tracking-widest text-[#17186b]/40">HEADTEACHER IMAGE</span>
        </motion.div>
        
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-sm font-bold tracking-widest text-[#ed4545]">A NOTE FROM OUR HEAD</p>
          <h2 className="mt-4 font-[Poppins] text-4xl font-black leading-none tracking-tight text-[#17186b] sm:text-5xl">
            “We nurture <br/>kindness as much <br/>as knowledge.”
          </h2>
          <p className="mt-6 max-w-md leading-7 text-[#17186b]/70">
            At Jocomfy, every corridor, every classroom, and every playground is designed to make your child feel seen, heard, and inspired to lead. This is more than a school — it’s a community that grows together.
          </p>
          <p className="mt-8 font-bold text-[#17186b]">— Mrs. Jane Doe, Headteacher</p>
        </motion.div>
      </div>
    </section>
  );
}