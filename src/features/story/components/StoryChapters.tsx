"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { STORY_CHAPTERS } from "@/constants/content";
import { Tape } from "@/components/scrapbook";

export const StoryChapters: React.FC = () => {
  const [openSecretId, setOpenSecretId] = useState<string | null>(null);

  const toggleSecret = (id: string) => {
    setOpenSecretId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-20 px-4 bg-paper-texture overflow-hidden">
      {/* Decorative Floating Elements */}
      <div className="absolute top-[10%] left-[5%] text-2xl opacity-20 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-[10%] right-[5%] text-2xl opacity-20 select-none pointer-events-none">🌿</div>
      <div className="absolute top-[40%] right-[10%] text-2xl opacity-15 select-none pointer-events-none">☁️</div>

      <div className="max-w-[760px] mx-auto flex flex-col gap-32 relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-quote text-3xl text-accent-peach mb-2 block">Our Journey</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-text-primary">
            How It All Started
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {STORY_CHAPTERS.map((chapter, index) => {
          const isEven = index % 2 === 0;
          const isSecretOpen = openSecretId === chapter.id;

          return (
            <motion.div
              key={chapter.id}
              className="flex flex-col md:flex-row items-center gap-10 min-h-[60vh] relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Image Side */}
              <div
                className={`w-full md:w-1/2 flex justify-center relative ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                {/* Tape Deco */}
                <Tape
                  rotation={isEven ? -3 : 4}
                  color={index % 3 === 0 ? "pink" : index % 3 === 1 ? "blue" : "peach"}
                  className="-top-4 z-10"
                />

                {/* Photo Frame */}
                <div className="bg-[#FFFDF9] p-4 pb-8 border border-primary/30 shadow-md hover:shadow-lg rounded-[28px] max-w-[340px] w-full transition-shadow duration-200 relative">
                  {/* Paperclip Accent */}
                  <div className="absolute -top-3 -left-2 text-2xl select-none z-20 transform -rotate-12">
                    📎
                  </div>

                  <div className="relative w-full aspect-[4/3] bg-background rounded-2xl overflow-hidden border border-primary/20">
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="font-quote text-2xl text-text-secondary text-center mt-4">
                    {chapter.quote}
                  </div>

                  {/* Secret Sticky Note Button */}
                  {chapter.secretNote && (
                    <button
                      onClick={() => toggleSecret(chapter.id)}
                      className="absolute -bottom-3 right-4 z-20 bg-accent-yellow hover:bg-amber-300 border border-amber-300 text-text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {isSecretOpen ? "🙈 Tutup Catatan Rahasia" : "📌 Catatan Rahasia P.S."}
                    </button>
                  )}
                </div>
              </div>

              {/* Text Side */}
              <div
                className={`w-full md:w-1/2 flex flex-col justify-center gap-4 ${
                  isEven ? "md:order-2 text-left" : "md:order-1 text-left md:text-right"
                }`}
              >
                <span className="font-heading text-lg text-accent-peach uppercase tracking-widest">
                  Chapter {index + 1}
                </span>
                <h3 className="font-heading text-3xl text-text-primary">{chapter.title}</h3>
                <h4 className="font-sans font-medium text-text-secondary italic">
                  {chapter.subtitle}
                </h4>
                <p className="font-sans text-text-primary leading-relaxed text-lg">
                  {chapter.paragraph}
                </p>

                {/* Secret Sticky Note Reveal Card */}
                <AnimatePresence>
                  {isSecretOpen && chapter.secretNote && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 bg-[#FFFDF0] border-2 border-dashed border-amber-300 rounded-2xl p-4 shadow-sm relative text-left"
                    >
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                        💌 PSST... SECRET NOTE FOR CIPA
                      </span>
                      <p className="font-quote text-2xl text-text-primary leading-relaxed">
                        "{chapter.secretNote}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
