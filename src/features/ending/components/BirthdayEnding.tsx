"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button, Tape, Sparkle } from "@/components/scrapbook";
import { ENDING_CONTENT, WA_CLAIM } from "@/constants/content";
import { useAudio } from "@/providers/audio-context";
import confetti from "canvas-confetti";

interface BirthdayEndingProps {
  onReplay: () => void;
}

const WISHING_STARS = [
  {
    id: 1,
    char: "🌟",
    color: "text-amber-400",
    title: "Harapan #1 🌟",
    wish: "Semoga di umur baru ini kamu selalu dikelilingi kebahagiaan dan senyuman indah tiap hari!",
  },
  {
    id: 2,
    char: "✨",
    color: "text-pink-400",
    title: "Harapan #2 ✨",
    wish: "Semoga semua impian, cita-cita, dan rencana kamu pelan-pelan terwujud!",
  },
  {
    id: 3,
    char: "💖",
    color: "text-rose-400",
    title: "Harapan #3 💖",
    wish: "Semoga kita bisa terus bikin banyak memori sama petualangan seru bareng-bareng!",
  },
  {
    id: 4,
    char: "💫",
    color: "text-purple-400",
    title: "Harapan #4 💫",
    wish: "Semoga kamu selalu sehat, hatinya selalu damai, dan gapernah merasa sendirian!(kan ada aku)",
  },
  {
    id: 5,
    char: "🤍",
    color: "text-amber-300",
    title: "Harapan #5 🤍",
    wish: "Tetap jadi Cipa yang baik hati, lucu, dan selalu make my day",
  },
];

export const BirthdayEnding: React.FC<BirthdayEndingProps> = ({ onReplay }) => {
  const audio = useAudio();
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [selectedStar, setSelectedStar] = useState<typeof WISHING_STARS[0] | null>(null);

  useEffect(() => {
    // Audio is handled by playSceneTrack in page.tsx
    // audio.fadeOutBg(4000);

    // Initial gentle confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD8E6", "#F9D7C4", "#E8DFFF", "#DCEEFF", "#DDF2E4", "#FFF2B8"],
    });
  }, [audio]);

  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    setIsCandleBlown(true);

    // Grand explosion of confetti
    confetti({
      particleCount: 220,
      spread: 110,
      origin: { y: 0.5 },
      colors: ["#FFD8E6", "#F9D7C4", "#E8DFFF", "#FFF2B8", "#DDF2E4"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
      });
    }, 400);
  };

  return (
    <section className="relative w-full py-20 px-4 min-h-screen bg-gradient-to-tr from-accent-peach/20 via-primary/20 to-accent-lavender/20 bg-paper-texture flex flex-col items-center justify-center overflow-y-auto">
      {/* Sparkles decorations */}
      <div className="absolute top-[10%] left-[8%] pointer-events-none opacity-45"><Sparkle size={32} /></div>
      <div className="absolute bottom-[10%] right-[8%] pointer-events-none opacity-45"><Sparkle size={24} /></div>

      <div className="max-w-[720px] w-full flex flex-col items-center gap-10 text-center relative z-10">

        {/* INTERACTIVE BIRTHDAY CAKE CONTAINER */}
        <motion.div
          className="bg-white border border-primary/30 shadow-soft rounded-[36px] p-8 sm:p-10 w-full flex flex-col items-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Tape rotation={-2} className="-top-3 left-1/3" color="pink" />

          <h2 className="font-heading text-4xl sm:text-5xl text-accent-peach mb-2">
            {ENDING_CONTENT.title}
          </h2>

          <p className="font-heading text-lg text-text-secondary mb-6 italic">
            {ENDING_CONTENT.subtitle}
          </p>

          {/* Birthday Cake Illustration with Blowable Candle */}
          <div className="relative my-4 flex flex-col items-center cursor-pointer select-none" onClick={handleBlowCandle}>
            {/* Animated Candle Flame */}
            <div className="relative flex flex-col items-center mb-1">
              <AnimatePresence mode="wait">
                {!isCandleBlown ? (
                  <motion.div
                    key="flame"
                    className="w-5 h-7 bg-amber-400 rounded-full blur-[1px] flex items-center justify-center shadow-[0_0_15px_#f59e0b]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.9],
                      y: [0, -2, 0],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <div className="w-2 h-4 bg-amber-200 rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1.2 }}
                    className="text-xs text-zinc-400 font-bold"
                  >
                    💨 ✨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-2 h-7 bg-pink-200 border border-pink-300 rounded-t-sm" />
            </div>

            {/* Cake Layers */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-8 bg-pink-100 border-2 border-primary rounded-t-2xl flex items-center justify-around px-2">
                <span className="text-xs">🍓</span>
                <span className="text-xs">🍓</span>
                <span className="text-xs">🍓</span>
              </div>
              <div className="w-36 h-10 bg-accent-peach/60 border-2 border-accent-peach rounded-b-2xl flex items-center justify-center shadow-sm">
                <span className="font-heading text-xs font-bold text-text-primary">
                  HAPPY BIRTHDAY CIPA 🎂
                </span>
              </div>
            </div>

            {/* Interactive Candle Blow Button / Hint */}
            <div className="mt-6">
              {!isCandleBlown ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBlowCandle}
                  className="bg-amber-100 border border-amber-300 text-amber-800 font-heading text-sm px-5 py-2 rounded-full shadow-sm flex items-center gap-2"
                >
                  🕯️ bikin harapan terus tap buat tiup lilin
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-pink-50 border border-primary/40 text-accent-peach font-heading text-sm px-5 py-2.5 rounded-full shadow-sm"
                >
                  ✨ harapan diterima, semoga semuanya bisa kecapai ya 💖
                </motion.div>
              )}
            </div>
          </div>

          <p className="font-sans text-lg text-text-primary leading-relaxed max-w-md my-6">
            {ENDING_CONTENT.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                const text = encodeURIComponent(WA_CLAIM.message);
                window.open(`https://wa.me/${WA_CLAIM.phoneNumber}?text=${text}`, "_blank");
              }}
              variant="primary"
            >
              {WA_CLAIM.buttonText}
            </Button>
            <Button onClick={onReplay} variant="secondary">
              {ENDING_CONTENT.buttonText} 🔄
            </Button>
          </div>
        </motion.div>

        {/* WISH JAR (BOTOL KACA BINTANG HARAPAN) */}
        <div className="w-full flex flex-col items-center">
          <span className="font-quote text-2xl text-accent-peach mb-2 block">
            The Wish Jar 🫙✨
          </span>
          <p className="font-sans text-xs text-text-secondary mb-6">
            Klik salah satu bintang di dalam botol untuk membuka harapan manis!
          </p>

          {/* Glass Jar Container */}
          <div className="relative w-full max-w-[280px] bg-white/60 backdrop-blur-md border-4 border-white/80 shadow-soft rounded-b-[48px] rounded-t-2xl p-6 pt-10 flex flex-wrap items-center justify-around gap-4 min-h-[180px] select-none border-t-8 border-t-amber-200/80">
            {/* Cork / Lid detail */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-amber-200/90 rounded-t-md border border-amber-300 shadow-xs" />

            {/* Glowing Wishing Stars inside the Jar */}
            {WISHING_STARS.map((star) => (
              <motion.button
                key={star.id}
                onClick={() => setSelectedStar(star)}
                whileHover={{ scale: 1.25, rotate: 12 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3 + star.id * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`text-3xl cursor-pointer p-2 drop-shadow-md hover:drop-shadow-lg transition-transform`}
                title={star.title}
              >
                {star.char}
              </motion.button>
            ))}
          </div>

          {/* Modal / Card Reveal for Selected Star */}
          <AnimatePresence>
            {selectedStar && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="mt-6 bg-[#FFFDF0] border-2 border-dashed border-amber-300 rounded-3xl p-6 max-w-md w-full shadow-soft relative text-center"
              >
                <button
                  onClick={() => setSelectedStar(null)}
                  className="absolute top-3 right-3 text-xs text-text-secondary hover:text-text-primary bg-amber-100 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
                  {selectedStar.title}
                </span>
                <p className="font-quote text-2xl text-text-primary leading-relaxed">
                  "{selectedStar.wish}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
