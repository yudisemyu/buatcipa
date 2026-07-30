"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Tape Component - resembles semi-transparent washi tape
interface TapeProps {
  rotation?: number;
  color?: "pink" | "peach" | "lavender" | "blue" | "mint" | "yellow";
  className?: string;
}

export const Tape: React.FC<TapeProps> = ({
  rotation = -3,
  color = "peach",
  className = "",
}) => {
  const colorMap = {
    pink: "bg-primary/60 border-primary/20",
    peach: "bg-accent-peach/60 border-accent-peach/20",
    lavender: "bg-accent-lavender/60 border-accent-lavender/20",
    blue: "bg-accent-blue/60 border-accent-blue/20",
    mint: "bg-accent-mint/60 border-accent-mint/20",
    yellow: "bg-accent-yellow/60 border-accent-yellow/20",
  };

  return (
    <div
      className={`absolute w-24 h-6 border-l-2 border-r-2 border-dashed select-none pointer-events-none opacity-80 ${colorMap[color]} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
        maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    />
  );
};

// Polaroid Component
interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  className?: string;
}

export const Polaroid: React.FC<PolaroidProps> = ({
  src,
  alt,
  caption,
  rotation = 0,
  className = "",
}) => {
  return (
    <motion.div
      className={`bg-white p-3 pb-6 border border-primary/30 shadow-soft rounded-2xl flex flex-col items-center select-none relative group ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      whileHover={{ scale: 1.02, rotate: rotation + (rotation > 0 ? 1 : -1) }}
      transition={{ duration: 0.3 }}
    >
      {/* Cute Photocard Top Badge */}
      <div className="absolute -top-2 -right-2 z-10 bg-accent-peach/90 text-text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white flex items-center gap-1">
        ✨ KickFlip
      </div>

      <div className="relative w-full aspect-[4/3] overflow-hidden bg-background rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>
      {caption && (
        <span className="font-quote text-2xl text-text-secondary mt-3 text-center tracking-wide">
          {caption}
        </span>
      )}
    </motion.div>
  );
};

// Cute Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "font-heading text-lg rounded-full px-6 py-2.5 transition-all duration-200 select-none flex items-center justify-center gap-2 cursor-pointer";
  
  const variantClasses = {
    primary: "bg-primary border border-primary/20 text-text-primary hover:shadow-md",
    secondary: "bg-white border border-border-default text-text-secondary hover:bg-background-secondary",
    ghost: "bg-transparent text-text-secondary hover:underline hover:text-text-primary",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

// Sparkle element for cute background decorations
export const Sparkle: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-accent-peach animate-pulse select-none pointer-events-none ${className}`}
    >
      <path
        d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
};

// Floating Decorations (flowers, clouds, hearts) for background
export const FloatingDecorations: React.FC = () => {
  // Using emoji for simple SVG-like decorative elements that fit the vibe
  const decorations = [
    { id: 1, char: "☁️", top: "15%", left: "5%", size: "text-4xl", delay: 0 },
    { id: 2, char: "🌸", top: "25%", left: "85%", size: "text-2xl", delay: 2 },
    { id: 3, char: "✨", top: "45%", left: "10%", size: "text-3xl", delay: 1 },
    { id: 4, char: "☁️", top: "60%", left: "90%", size: "text-5xl", delay: 3 },
    { id: 5, char: "🤍", top: "75%", left: "15%", size: "text-2xl", delay: 0.5 },
    { id: 6, char: "🌷", top: "85%", left: "80%", size: "text-3xl", delay: 2.5 },
    { id: 7, char: "✨", top: "5%", left: "60%", size: "text-xl", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {decorations.map((dec) => (
        <motion.div
          key={dec.id}
          className={`absolute opacity-20 ${dec.size}`}
          style={{ top: dec.top, left: dec.left }}
          animate={{
            y: [0, -15, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dec.delay,
          }}
        >
          {dec.char}
        </motion.div>
      ))}
    </div>
  );
};

// Now Playing Vinyl Indicator (Pure Indicator - No Buttons)
import { useAudio } from "@/providers/audio-context";

export const MiniMusicPlayer: React.FC = () => {
  const { isPlayingBg, currentTrack } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 px-4 rounded-2xl shadow-soft border border-primary/40 select-none max-w-[260px] pointer-events-none"
    >
      {/* Mini Spinning Vinyl Disc */}
      <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center">
        <motion.div
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-900 to-zinc-700 flex items-center justify-center border-2 border-primary/50 shadow-sm"
          animate={isPlayingBg ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* Vinyl Inner Label */}
          <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-[7px] font-bold text-text-primary">
            🛹
          </div>
        </motion.div>
      </div>

      {/* Track Info (Indicator Only) */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold tracking-wider text-accent-peach uppercase bg-accent-peach/15 px-1.5 py-0.5 rounded-md">
            Now Playing 🎵
          </span>
        </div>
        <span className="text-xs font-semibold text-text-primary truncate mt-0.5">
          {currentTrack.title}
        </span>
      </div>
    </motion.div>
  );
};
