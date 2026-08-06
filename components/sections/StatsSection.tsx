"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Teacher-Student Ratio", value: "1:12", color: "text-[#facc15]" },
  { label: "Extracurricular Clubs", value: "24+", color: "text-white" },
  { label: "Success Rate", value: "100%", color: "text-[#facc15]" },
  { label: "Modern Labs", value: "06", color: "text-white" },
];

export function StatsSection() {
  return (
    <section className="bg-[#001f54] border-t border-white/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <h3 className={`text-6xl md:text-8xl font-black ${stat.color} mb-2 tracking-tighter`}>
                {stat.value}
              </h3>
              <p className="text-blue-200/60 uppercase font-bold tracking-widest text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}