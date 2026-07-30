"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TIMELINE_MEMORIES } from "@/constants/content";
import { Tape, Sparkle } from "@/components/scrapbook";
import { MapPin } from "lucide-react";

export const Timeline: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 bg-background-secondary bg-grid-texture overflow-hidden">
      {/* Sparkles decoration */}
      <div className="absolute top-[15%] right-[5%] pointer-events-none opacity-20">
        <Sparkle size={30} />
      </div>
      <div className="absolute bottom-[15%] left-[5%] pointer-events-none opacity-20">
        <Sparkle size={24} className="text-accent-blue" />
      </div>

      <div className="max-w-[900px] mx-auto relative">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-quote text-3xl text-accent-peach mb-2 block">Our Scrapbook</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-text-primary">
            Our Key Memories
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative">
          {/* Center line (hidden on mobile, centered on desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-border-default transform md:-translate-x-1/2 select-none pointer-events-none" />

          {/* Memory List */}
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {TIMELINE_MEMORIES.map((memory, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={memory.id}
                  className={`flex flex-col md:flex-row relative w-full ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-3.5 h-3.5 bg-accent-peach border-4 border-white rounded-full shadow-soft transform -translate-x-1.5 md:-translate-x-1/2 z-10 select-none pointer-events-none" />

                  {/* Card Container */}
                  <motion.div
                    className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                      isEven ? "md:pr-10" : "md:pl-10"
                    }`}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative bg-[#FFFDF9] border border-primary/30 shadow-md hover:shadow-lg rounded-[28px] p-5.5 flex flex-col gap-4 transition-shadow duration-200">
                      {/* Memory Stamp Badge */}
                      <div className="absolute top-4 right-4 bg-primary/20 text-text-primary text-[9px] font-bold px-2 py-0.5 rounded-md border border-primary/30 uppercase tracking-widest select-none">
                        💌 Memory #{index + 1}
                      </div>

                      {/* Tape Deco */}
                      <Tape
                        rotation={isEven ? -4 : 3}
                        color={index % 3 === 0 ? "blue" : index % 3 === 1 ? "lavender" : "pink"}
                        className="-top-3 left-1/4 z-10"
                      />

                      {/* Date Indicator */}
                      <span className="font-heading text-xs text-accent-peach font-bold uppercase tracking-widest select-none">
                        {memory.date}
                      </span>

                      {/* Image Frame */}
                      <div className="relative w-full aspect-[16/10] bg-background rounded-2xl overflow-hidden border border-primary/20">
                        <Image
                          src={memory.image}
                          alt={memory.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-heading text-2xl text-text-primary">
                          {memory.title}
                        </h3>
                        {memory.location && (
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <MapPin size={13} className="text-accent-peach" />
                            <span className="font-medium">{memory.location}</span>
                          </div>
                        )}
                        <p className="font-sans text-sm text-text-secondary leading-relaxed mt-1">
                          {memory.story}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
