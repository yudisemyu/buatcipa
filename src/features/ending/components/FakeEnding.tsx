"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/providers/audio-context";

interface FakeEndingProps {
  onComplete: () => void;
}

export const FakeEnding: React.FC<FakeEndingProps> = ({ onComplete }) => {
  const audio = useAudio();
  const [phase, setPhase] = useState<"empty" | "theEnd" | "maybeNot">("empty");

  useEffect(() => {
    // Pause background music immediately for silent dramatic effect
    audio.pauseBg();

    // Stage 1: Silence for 1s
    const t1 = setTimeout(() => {
      setPhase("theEnd");
    }, 1000);

    // Stage 2: Wait 4s (5s total) then show "...or maybe not"
    const t2 = setTimeout(() => {
      setPhase("maybeNot");
    }, 5000);

    // Stage 3: Wait 2s (7s total) then transition
    const t3 = setTimeout(() => {
      // Resume background music for the next scenes
      audio.playBg();
      onComplete();
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [audio, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 select-none">
      <AnimatePresence mode="wait">
        {phase === "theEnd" && (
          <motion.h2
            key="theEnd"
            className="font-heading text-4xl sm:text-5xl font-light tracking-widest text-zinc-100"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1.5 }}
          >
            Tamat
          </motion.h2>
        )}

        {phase === "maybeNot" && (
          <motion.h3
            key="maybeNot"
            className="font-quote text-3xl sm:text-4xl text-zinc-300 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            ...tapi boong.
          </motion.h3>
        )}
      </AnimatePresence>
    </div>
  );
};
