"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tape } from "@/components/scrapbook";
import { PASSWORD_QUESTION } from "@/constants/content";

interface PasswordSceneProps {
  onSuccess: () => void;
}

export const PasswordScene: React.FC<PasswordSceneProps> = ({ onSuccess }) => {
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess) return;

    // Normalizing user input
    const cleanInput = answer.trim().toLowerCase().replace(/\s+/g, "");

    // Normalizing expected answer(s) - supports string or array of strings
    const rawAnswers = Array.isArray(PASSWORD_QUESTION.answer)
      ? PASSWORD_QUESTION.answer
      : [PASSWORD_QUESTION.answer];

    const cleanAnswers = rawAnswers.map((ans) =>
      String(ans).trim().toLowerCase().replace(/\s+/g, "")
    );

    if (cleanAnswers.includes(cleanInput)) {
      setIsSuccess(true);
      setFeedback(PASSWORD_QUESTION.correctAnswer);
      setTimeout(onSuccess, 1500); // Transition out
    } else {
      setAttempts((prev) => prev + 1);
      const msgIndex = Math.min(attempts, PASSWORD_QUESTION.wrongAnswers.length - 1);
      setFeedback(PASSWORD_QUESTION.wrongAnswers[msgIndex]);
    }
  };

  return (
    <div className="fixed inset-0 bg-background bg-paper-texture flex items-center justify-center z-30 px-4 select-none">
      <div className="relative max-w-md w-full">
        <motion.div
          className="bg-[#FFFDF9] border border-primary/30 shadow-md rounded-[32px] p-8 pb-10 w-full flex flex-col items-center relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Paperclip Accent */}
          <div className="absolute -top-3 left-4 text-2xl select-none z-20 transform -rotate-12">
            📎
          </div>
          {/* Tapes on corner */}
          <Tape rotation={-5} className="-top-3 left-10" color="blue" />
          <Tape rotation={4} className="-top-3 right-10" color="pink" />

          <div className="text-4xl mb-4">🔑</div>

          <h2 className="font-heading text-2xl text-text-primary text-center mb-6 px-2">
            {PASSWORD_QUESTION.question}
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="yuk masukin jawaban kamu"
              disabled={isSuccess}
              className="w-full text-center bg-background border border-border-default rounded-[20px] px-4 py-3 font-sans text-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            />

            <Button type="submit" variant="primary" disabled={isSuccess || !answer.trim()}>
              Buka Hadiah
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {feedback && (
              <motion.p
                key={feedback}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-center font-sans text-sm mt-6 ${isSuccess ? "text-accent-peach font-semibold" : "text-text-secondary"
                  }`}
              >
                {feedback}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
