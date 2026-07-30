"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  rotation: number;
  driftX: number;
}

const EMOJIS = ["🌸", "🌷", "💖", "✨", "🤍", "🎀", "🛹", "💗", "🌺"];

export const ClickBurst: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Spawn 2 lightweight particles on click
      const newParticles: Particle[] = Array.from({ length: 2 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: Math.floor(Math.random() * 6) + 18, // 18px - 24px
        rotation: (Math.random() - 0.5) * 20,
        driftX: (Math.random() - 0.5) * 40,
      }));

      setParticles((prev) => [...prev.slice(-8), ...newParticles]); // max 8 active particles
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{
              opacity: 1,
              scale: 0.6,
              x: p.x - 12,
              y: p.y - 12,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.6, 1.2, 0.8],
              x: p.x - 12 + p.driftX,
              y: p.y - 80,
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
            onAnimationComplete={() => handleAnimationComplete(p.id)}
            className="absolute select-none"
            style={{
              fontSize: `${p.size}px`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {p.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
