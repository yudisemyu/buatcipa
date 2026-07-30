"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  left: number; // percentage 0 - 100
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  char: string;
  rotation: number;
  driftX: number;
}

const PETAL_CHARS = ["🌸", "🌸", "🌷", "🤍", "✨", "💖", "🌸", "🌸"];

export const PetalRain: React.FC = () => {
  // Generate a fixed set of petals so it doesn't re-render/re-generate randomly
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95, // 0% - 95%
      size: Math.floor(Math.random() * 12) + 14, // 14px - 26px
      duration: Math.random() * 8 + 10, // 10s - 18s (slow falling)
      delay: Math.random() * 10, // 0s - 10s initial stagger
      char: PETAL_CHARS[Math.floor(Math.random() * PETAL_CHARS.length)],
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 80, // gentle sway left/right
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute opacity-35"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.driftX, 0],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};
