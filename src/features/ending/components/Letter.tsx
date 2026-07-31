"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button, Tape } from "@/components/scrapbook";
import { LETTER_CONTENT } from "@/constants/content";

interface LetterProps {
  onComplete: () => void;
}

export const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const textRef = useRef(LETTER_CONTENT.content);
  const indexRef = useRef(0);

  useEffect(() => {
    if (isDone) return;

    const timer = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        setDisplayText((prev) => prev + textRef.current[indexRef.current]);
        indexRef.current += 1;
      } else {
        setIsDone(true);
        clearInterval(timer);
      }
    }, LETTER_CONTENT.animationSpeed);

    return () => clearInterval(timer);
  }, [isDone]);

  const handleSkip = () => {
    setDisplayText(textRef.current);
    setIsDone(true);
  };

  return (
    <section className="relative w-full py-20 px-4 bg-background min-h-screen flex flex-col items-center justify-center bg-paper-texture overflow-y-auto">
      <div className="max-w-[680px] w-full bg-[#FFFDF9] border border-primary/30 shadow-md rounded-[32px] p-6 sm:p-10 relative flex flex-col">
        {/* Vintage Post Stamp Accent */}
        <div className="absolute top-6 right-6 border-2 border-dashed border-accent-peach/60 p-1 rounded-sm bg-accent-peach/10 select-none hidden sm:block">
          <div className="text-center px-2 py-1">
            <span className="text-[10px] font-bold text-accent-peach uppercase block">FOR CIPA</span>
            <span className="text-xs">💌 🎂</span>
          </div>
        </div>

        {/* Stationery aesthetic tapes */}
        <Tape rotation={-3} className="-top-3 left-10" color="pink" />
        <Tape rotation={2} className="-top-3 right-10" color="lavender" />

        {/* Title */}
        <h2 className="font-heading text-3xl text-text-primary mb-6 text-center border-b border-divider-default pb-4">
          {LETTER_CONTENT.title}
        </h2>

        {/* Typed Body content */}
        <div className="font-sans text-lg text-text-primary whitespace-pre-wrap leading-[200%] tracking-wide min-h-[300px]">
          {displayText}
          {!isDone && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1.5 h-5 bg-accent-peach ml-0.5"
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-8 border-t border-[#F7ECE8] pt-6">
          {!isDone && LETTER_CONTENT.allowSkip ? (
            <Button onClick={handleSkip} variant="ghost" className="text-sm">
              Lewati ⏩
            </Button>
          ) : (
            <div />
          )}

          {isDone && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Button onClick={onComplete} variant="primary">
                Buka Kado 🎁
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
