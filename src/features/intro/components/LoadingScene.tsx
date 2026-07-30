"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "@/components/scrapbook";

interface LoadingSceneProps {
  onComplete: () => void;
}

export const LoadingScene: React.FC<LoadingSceneProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Small pause at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center bg-paper-texture select-none z-50">
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkle className="absolute top-[20%] left-[15%] text-primary/40" size={20} />
        <Sparkle className="absolute top-[30%] right-[20%] text-accent-yellow/50" size={32} />
        <Sparkle className="absolute bottom-[25%] left-[25%] text-accent-peach/40" size={24} />
        <Sparkle className="absolute bottom-[35%] right-[15%] text-accent-lavender/50" size={28} />
      </div>

      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Floating Scrapbook Icon */}
        <motion.div
          className="relative w-20 h-20 bg-white border border-border-default rounded-3xl flex items-center justify-center shadow-soft mb-8"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-4xl">✨</span>
        </motion.div>

        {/* Title */}
        <h2 className="font-heading text-2xl text-text-primary mb-2 text-center">
          Opening our scrapbook...
        </h2>
        <p className="font-sans text-sm text-text-secondary mb-6 text-center">
          Preparing your little universe
        </p>

        {/* Custom Progress Bar */}
        <div className="relative w-full h-2.5 bg-white border border-border-default rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Progress Text */}
        <span className="font-heading text-sm text-text-secondary mt-3">
          {Math.min(progress, 100)}%
        </span>
      </div>
    </div>
  );
};
