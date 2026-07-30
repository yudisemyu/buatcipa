"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tape, Sparkle } from "@/components/scrapbook";
import { GIFT_CONTENT } from "@/constants/content";
import { ScratchCard } from "./ScratchCard";

interface VoiceAndGiftProps {
  onComplete: () => void;
}

export const VoiceAndGift: React.FC<VoiceAndGiftProps> = ({ onComplete }) => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  return (
    <section className="relative w-full py-20 px-4 bg-background-secondary bg-grid-texture min-h-screen flex flex-col items-center justify-center gap-12 overflow-y-auto">
      {/* Sparkles background */}
      <div className="absolute top-[10%] left-[8%] pointer-events-none opacity-20"><Sparkle size={20} /></div>
      <div className="absolute bottom-[10%] right-[8%] pointer-events-none opacity-20"><Sparkle size={24} /></div>

      <div className="max-w-[600px] w-full flex flex-col gap-10">
        {/* GIFT BOX CONTAINER */}
        <motion.div
          className="bg-[#FFFDF9] border border-primary/30 shadow-md rounded-[32px] p-6 sm:p-8 flex flex-col items-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tape rotation={4} className="-top-3 right-10" color="pink" />
          <h3 className="font-heading text-2xl text-text-primary mb-2">A Special Gift</h3>
          <p className="font-sans text-sm text-text-secondary mb-6 text-center">
            Click to open the gift box I prepared.
          </p>

          <div className="flex flex-col items-center w-full">
            <AnimatePresence mode="wait">
              {!isGiftOpened ? (
                <motion.div
                  key="closed-gift"
                  className="flex flex-col items-center cursor-pointer select-none"
                  onClick={() => setIsGiftOpened(true)}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-32 h-32 flex items-center justify-center text-6xl"
                    animate={{
                      rotate: [-2, 2, -2],
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🎁
                  </motion.div>
                  <Button onClick={() => setIsGiftOpened(true)} variant="secondary" className="mt-4">
                    {GIFT_CONTENT.buttonText} 🤍
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="opened-gift"
                  className="flex flex-col items-center w-full text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-1 mb-4">
                    <Sparkle size={18} />
                    <Sparkle size={24} className="text-accent-yellow" />
                    <Sparkle size={18} />
                  </div>

                  {/* Interactive Scratch-off Coupon */}
                  <ScratchCard giftMessage={GIFT_CONTENT.giftMessage} />

                  <Button onClick={onComplete} variant="primary" className="mt-8">
                    See Final Ending ❤️
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
