"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/constants/content";
import { Tape, Sparkle } from "@/components/scrapbook";
import { X, Play } from "lucide-react";
import { GalleryItem } from "@/types";

export const MemoryGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section className="relative w-full py-20 px-4 bg-paper-texture overflow-hidden">
      {/* Decorative Stickers */}
      <div className="absolute top-[5%] right-[10%] text-2xl select-none pointer-events-none opacity-20">🍂</div>
      <div className="absolute bottom-[5%] left-[8%] text-2xl select-none pointer-events-none opacity-20">🌸</div>

      <div className="max-w-[1100px] mx-auto relative">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-quote text-3xl text-accent-peach mb-2 block">Our Gallery</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-text-primary">
            Captured Moments
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Grid Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => {
            const rotations = [-2, 1.5, -1, 2, -1.5, 3];
            const rotation = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                className="relative bg-[#FFFDF9] p-3.5 pb-8 border border-primary/30 shadow-md hover:shadow-lg rounded-[24px] cursor-pointer group"
                style={{ rotate: `${rotation}deg` }}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedItem(item)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Paperclip / Badge Accent */}
                {index % 3 === 1 && (
                  <div className="absolute -top-3 -right-2 text-2xl select-none z-20 transform rotate-12">
                    📎
                  </div>
                )}
                {/* Optional tape on top */}
                {index % 4 === 0 && (
                  <Tape rotation={-5} color="pink" className="-top-3 left-1/3 z-10" />
                )}
                {index % 4 === 2 && (
                  <Tape rotation={3} color="lavender" className="-top-3 left-1/4 z-10" />
                )}

                {/* Media Container */}
                <div className="relative w-full aspect-[4/3] bg-background rounded-2xl overflow-hidden border border-border-default select-none">
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.caption || "Memory"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                      <video
                        src={item.url}
                        className="w-full h-full object-cover opacity-80"
                        muted
                        playsInline
                        loop
                      />
                      <div className="absolute w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-soft">
                        <Play size={20} className="text-text-primary ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption */}
                {item.caption && (
                  <div className="font-quote text-2xl text-text-secondary text-center mt-4 px-2 truncate">
                    {item.caption}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white border border-white/10 cursor-pointer transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </button>

            {/* Media Content Wrapper */}
            <motion.div
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center gap-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "image" ? (
                <div
                  className="relative w-full h-full select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={selectedItem.url}
                    alt={selectedItem.caption || "Memory"}
                    width={1000}
                    height={800}
                    className="max-w-full max-h-[70vh] w-auto h-auto rounded-2xl object-contain shadow-2xl border border-white/10"
                  />
                </div>
              ) : (
                <video
                  src={selectedItem.url}
                  className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
                  controls
                  autoPlay
                  playsInline
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}

              {/* Caption */}
              {selectedItem.caption && (
                <p className="font-quote text-3xl text-white tracking-wide text-center mt-2 px-6">
                  {selectedItem.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
