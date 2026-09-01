"use client";

import { motion } from "framer-motion";

export function Philosophy() {
  return (
    <section className="relative bg-[#001f54] py-32 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
        <h2 className="text-[300px] font-black text-white leading-none -ml-20">ESTD</h2>
        <h2 className="text-[300px] font-black text-white leading-none ml-40">2024</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#facc15] font-black tracking-[0.3em] uppercase text-sm"
            >
              Our Core Philosophy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white mt-6 leading-tight"
            >
              WE DON’T JUST <br />
              <span className="text-[#facc15] italic">TEACH.</span> <br />
              WE IGNITE.
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="bg-[#facc15] p-12 text-[#001f54] relative z-10">
              <p className="text-2xl font-bold leading-relaxed">
                “Education is not the filling of a pail, but the lighting of a fire. At JOCOMFY, we focus on the friction between curiosity and knowledge.”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-1 w-12 bg-[#001f54]"></div>
                <span className="uppercase font-black tracking-widest text-sm">The Jocomfy Manifesto</span>
              </div>
            </div>
            {/* The "Offset" square for that agency look */}
            <div className="absolute top-4 left-4 w-full h-full border-2 border-[#facc15] z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}