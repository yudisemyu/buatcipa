"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tape, Sparkle } from "@/components/scrapbook";
import { useAudio } from "@/providers/audio-context";
import { STORY_THEME } from "@/constants/content";

interface InvitationSceneProps {
  onOpen: () => void;
}

export const InvitationScene: React.FC<InvitationSceneProps> = ({ onOpen }) => {
  const audio = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    audio.playBg();
    setTimeout(onOpen, 1200); // Wait for transition animation
  };

  return (
    <div className="fixed inset-0 bg-background bg-paper-texture flex items-center justify-center z-40 px-4 select-none">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkle className="absolute top-[15%] left-[25%] text-accent-lavender" size={24} />
        <Sparkle className="absolute bottom-[20%] right-[25%] text-accent-peach" size={28} />
      </div>

      <div className="relative max-w-md w-full flex flex-col items-center">
        {/* Envelope Container */}
        <motion.div
          className="relative bg-[#FFFDF9] border border-primary/30 shadow-md rounded-[32px] p-8 pb-12 w-full flex flex-col items-center overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Paperclip Accent */}
          <div className="absolute -top-3 left-4 text-2xl select-none z-20 transform -rotate-12">
            📎
          </div>
          {/* Masking tape on top */}
          <Tape rotation={-2} className="-top-3 left-1/3" />

          {/* Sparkles */}
          <div className="text-4xl mb-4">✉️</div>

          <h1 className="font-heading text-4xl text-text-primary text-center mb-2">
            {STORY_THEME.title}
          </h1>
          <p className="font-sans text-base text-text-secondary text-center max-w-xs mb-8">
            {STORY_THEME.subtitle}
          </p>

          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                className="w-full flex justify-center"
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button onClick={handleOpen} variant="primary">
                  Buka Hadiah kamu
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="opened"
                className="w-full flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-quote text-2xl text-accent-peach animate-pulse">
                  Membuka hadiahmu...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
