"use client";

import { motion } from "framer-motion";

const stories = [
  {
    role: "Parent of Grade 2",
    title: "A transformational shift.",
    quote: "We chose JOCOMFY because we wanted more than just a curriculum. We wanted a community that understands the balance between discipline and creative freedom.",
    author: "Elena Rodriguez",
    color: "bg-blue-600"
  },
  {
    role: "Founding Teacher",
    title: "Curiosity over compliance.",
    quote: "In my twenty years of teaching, I’ve never seen a space that celebrates the 'Why?' as much as this one. Here, every question is a doorway.",
    author: "Dr. Julian Vance",
    color: "bg-[#facc15]"
  },
  {
    role: "Grade 6 Student",
    title: "I found my voice.",
    quote: "I used to be afraid of making mistakes. Now I know that a mistake is just the first draft of a great idea.",
    author: "Leo M.",
    color: "bg-red-500"
  }
];

export function Voices() {
  return (
    <section className="bg-[#fffdf7] py-32 px-6 relative overflow-hidden">
      {/* Decorative Dot Grid background snippet */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header - Clean & Light */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#001f54]/20" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#001f54]/40">The Record</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-[#001f54] leading-none uppercase italic">
            Stories from <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001f54] to-[#0d104c]/40">the hallway.</span>
          </h2>
        </div>

        {/* The Journal Grid */}
        <div className="space-y-40">
          {stories.map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-start`}
            >
              {/* Vertical Role Label */}
              <div className="hidden md:block pt-2">
                <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.5em] text-[#001f54]/30">
                  {story.role}
                </span>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-8">
                    {/* A small "accent" dot to tie into your color palette */}
                    <div className={`w-3 h-3 mt-2 rounded-full ${story.color}`} />
                    <h3 className="text-3xl md:text-4xl font-black text-[#001f54] uppercase tracking-tighter">
                        {story.title}
                    </h3>
                </div>

                <div className="relative">
                  <p className="text-xl md:text-2xl leading-relaxed text-[#001f54]/80 font-medium max-w-2xl">
                    "{story.quote}"
                  </p>
                  
                  {/* Subtle divider line that grows */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-[1px] bg-[#001f54]/10 mt-12"
                  />
                  
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-widest text-[#001f54]">
                      — {story.author}
                    </span>
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-[#001f54]/40">
                      {story.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Empty space/Visual balance column */}
              <div className="hidden lg:block w-1/4" />
            </motion.div>
          ))}
        </div>

        {/* Final Interactive CTA to keep them scrolling */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-60 text-center border-t border-[#001f54]/5 pt-20"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#001f54]/40 mb-8">Ready to start your story?</p>
          <button className="text-2xl md:text-4xl font-black uppercase italic text-[#001f54] hover:text-[#facc15] transition-colors group">
            Book a campus tour 
            <span className="inline-block ml-4 group-hover:translate-x-4 transition-transform text-[#facc15]">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}