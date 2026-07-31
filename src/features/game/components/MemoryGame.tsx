"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button, Tape } from "@/components/scrapbook";
import { MINI_GAME } from "@/constants/content";
import { Card } from "@/types";

interface MemoryGameProps {
  onComplete: () => void;
}

const GAME_IMAGES = [
  "/images/foto1.jpeg",
  "/images/foto2.jpeg",
  "/images/foto3.jpeg",
  "/images/foto4.jpeg",
  "/images/foto5.jpeg",
  "/images/foto6.jpeg",
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize and shuffle cards
  const initGame = () => {
    const cardPairs = [...GAME_IMAGES, ...GAME_IMAGES]
      .map((image, idx) => ({
        id: idx,
        pairId: idx % 6,
        image,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(cardPairs);
    setSelectedCards([]);
    setIsChecking(false);
    setIsFinished(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isChecking || isFinished) return;
    const clickedCardIndex = cards.findIndex((c) => c.id === cardId);

    // Ignore already flipped/matched cards
    if (cards[clickedCardIndex].isFlipped || cards[clickedCardIndex].isMatched) return;

    // Flip card
    const updatedCards = [...cards];
    updatedCards[clickedCardIndex].isFlipped = true;
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedCardIndex];
    setSelectedCards(newSelected);

    // Check for pair if 2 cards are selected
    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstIdx, secondIdx] = newSelected;

      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        // Match!
        setTimeout(() => {
          const matchedCards = [...updatedCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedCards([]);
          setIsChecking(false);

          // Check if all are matched
          if (matchedCards.every((c) => c.isMatched)) {
            setIsFinished(true);
          }
        }, 600);
      } else {
        // No Match - Flip back
        setTimeout(() => {
          const resetCards = [...updatedCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <section className="relative w-full py-20 px-4 bg-background-secondary bg-grid-texture flex items-center justify-center min-h-screen">
      <div className="max-w-[640px] w-full bg-white border border-border-default shadow-soft rounded-[32px] p-6 sm:p-8 flex flex-col items-center relative">
        <Tape rotation={-2} className="-top-3 left-1/3" color="yellow" />

        <h2 className="font-heading text-3xl text-text-primary text-center mb-2">
          game ingatan
        </h2>
        <p className="font-sans text-sm text-text-secondary text-center mb-8 max-w-sm">
          game tipis tipis yh sebelum masuk chapter selanjutnya hehehe
        </p>

        {/* Shuffled Card Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full aspect-square max-w-[400px]">
          {cards.map((card) => {
            const isFlippedOrMatched = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="relative aspect-square cursor-pointer select-none"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlippedOrMatched ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Card Back (Faced Down State - pastel KickFlip heart cover) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-accent-peach/30 via-primary/40 to-accent-lavender/30 border-2 border-primary/40 flex flex-col items-center justify-center text-2xl shadow-soft select-none"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <span>🛹</span>
                    <span className="text-xs font-bold text-text-primary/70 mt-1">💖</span>
                  </div>

                  {/* Card Front (Faced Up State - Cozy Memory Photo) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-2 border-primary/60 shadow-soft bg-white"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={card.image}
                      alt="Memory card"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Success / Completion Overlay */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              className="absolute inset-0 bg-white/95 rounded-[32px] flex flex-col items-center justify-center p-6 text-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🎉
              </motion.div>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                yey udah ketemu semua
              </h3>
              <p className="font-sans text-text-secondary mb-6">
                {MINI_GAME.rewardText}
              </p>
              <Button onClick={onComplete} variant="primary">
                {MINI_GAME.buttonText} 🤍
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
