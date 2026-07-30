"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/scrapbook";

interface ScratchCardProps {
  giftMessage: string;
  onFullyScratched?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  giftMessage,
  onFullyScratched,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on client size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with cute pastel silver gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#F7ECE8");
    grad.addColorStop(0.5, "#FFD8E6");
    grad.addColorStop(1, "#F9D7C4");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern text / instructions on canvas
    ctx.fillStyle = "#8B7676";
    ctx.font = "bold 16px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🪙 Gosok Di Sini Dengan Jarimu!", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedEnough) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check pixel data sample to measure scratched area
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / 16;
    if (transparentCount / totalSampled > 0.35) {
      setIsScratchedEnough(true);
      if (onFullyScratched) onFullyScratched();
    }
  };

  // Event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current || !e.touches[0]) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const revealAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsScratchedEnough(true);
    if (onFullyScratched) onFullyScratched();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <div className="relative w-full aspect-[16/10] bg-[#FFFDF5] border-2 border-dashed border-accent-peach rounded-[24px] p-6 shadow-inner flex items-center justify-center text-center overflow-hidden select-none">
        {/* Revealed Content Behind Canvas */}
        <div className="z-0 px-2">
          <span className="text-xs font-bold text-accent-peach uppercase tracking-widest block mb-1">
            🎫 VIP GIFT VOUCHER
          </span>
          <p className="font-quote text-2xl text-text-primary whitespace-pre-line leading-relaxed">
            {giftMessage}
          </p>
        </div>

        {/* Interactive Scratch Off Layer */}
        {!isScratchedEnough && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none rounded-[22px]"
          />
        )}
      </div>

      {!isScratchedEnough ? (
        <button
          onClick={revealAll}
          className="text-xs text-text-secondary hover:text-text-primary underline mt-3 transition-colors"
        >
          Buka langsung tanpa menggosok 🪄
        </button>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-accent-peach font-bold mt-3"
        >
          🎉 Kupon Berhasil Terbuka! Bisa diklaim kapan saja.
        </motion.p>
      )}
    </div>
  );
};
