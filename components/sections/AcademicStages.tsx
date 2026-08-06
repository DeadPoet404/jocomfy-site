"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../shared/SectionLabel";

export function AcademicStages() {
  // Animation variants for the container to stagger the children
  // 1. Add 'as const' to the containerVariants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const; // <--- Add this

// 2. Add 'as const' to the cardVariants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring", // Now TypeScript knows this is specifically "spring"
      stiffness: 100,
      damping: 12
    }
  },
} as const; // <--- Add this
  const stages = [
    {
      num: "01",
      title: "Preschool",
      desc: "Curious beginnings and joyful discovery.",
      bgColor: "bg-[#a8cdf8]",
      textColor: "text-[#17186b]",
      numColor: "text-[#17186b]",
    },
    {
      num: "02",
      title: "Primary",
      desc: "Strong foundations for confident learners.",
      bgColor: "bg-[#f5eee2]",
      textColor: "text-[#111111]",
      numColor: "text-[#ed4545]",
    },
    {
      num: "03",
      title: "Junior High",
      desc: "Independence, purpose, and leadership.",
      bgColor: "bg-[#0d104c]",
      textColor: "text-white",
      numColor: "text-[#f2c500]",
      titleColor: "text-[#f2c500]",
      descColor: "text-white/75",
    },
  ];

  return (
    <section className="bg-[#eaf8ff] px-5 py-20 sm:px-8 sm:py-28 lg:px-16 overflow-hidden">
      <motion.div 
        className="mx-auto max-w-[1320px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <SectionLabel>Academic pathways</SectionLabel>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stages.map((stage, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className={`min-h-[320px] rounded-3xl p-8 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 ${stage.bgColor} ${stage.textColor}`}
            >
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`text-sm font-bold ${stage.numColor}`}
              >
                {stage.num}
              </motion.span>
              
              <h3 className={`mt-24 font-[Poppins] text-4xl leading-none tracking-[-0.06em] ${stage.titleColor || ''}`}>
                {stage.title}
              </h3>
              
              <p className={`mt-5 max-w-xs text-sm leading-6 ${stage.descColor || ''}`}>
                {stage.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}