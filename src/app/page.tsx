"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScroll } from "@/providers/scroll-provider";
import { LoadingScene, InvitationScene, PasswordScene } from "@/features/intro";
import { StoryChapters } from "@/features/story";
import { Timeline } from "@/features/timeline";
import { MemoryGallery } from "@/features/gallery";
import { MemoryGame } from "@/features/game";
import { FakeEnding, Letter, VoiceAndGift, BirthdayEnding } from "@/features/ending";
import { SceneType } from "@/types";
import { FloatingDecorations, MiniMusicPlayer } from "@/components/scrapbook";

import { useAudio } from "@/providers/audio-context";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneType>(1);
  const { lockScroll, unlockScroll, lenis } = useScroll();
  const { playSceneTrack } = useAudio();

  // Dynamic Scene-matched Background Music & Scroll coordination
  useEffect(() => {
    // Start scene music from Scene 1 onwards (Loading)
    if (currentScene >= 1) {
      playSceneTrack(currentScene);
    }

    if (currentScene >= 4 && currentScene <= 7) {
      unlockScroll();
    } else {
      lockScroll();
      // Reset scroll positions to top when locking
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [currentScene, lockScroll, unlockScroll, lenis, playSceneTrack]);

  const handleReplay = () => {
    // Replay restarts at Scene 2 (Invitation)
    setCurrentScene(2);
  };

  return (
    <main className="flex-1 w-full flex flex-col relative bg-paper-texture">
      {/* Intro Overlay Stages (Loading, Invitation, Password) */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <motion.div key="loading" exit={{ opacity: 0 }}>
            <LoadingScene onComplete={() => setCurrentScene(2)} />
          </motion.div>
        )}

        {currentScene === 2 && (
          <motion.div key="invitation" exit={{ opacity: 0 }}>
            <InvitationScene onOpen={() => setCurrentScene(3)} />
          </motion.div>
        )}

        {currentScene === 3 && (
          <motion.div key="password" exit={{ opacity: 0 }}>
            <PasswordScene onSuccess={() => setCurrentScene(4)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Unlocked Scrollable Journey (Scenes 4 - 7) */}
      {currentScene >= 4 && currentScene <= 7 && (
        <motion.div
          key="journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex flex-col relative"
        >
          <FloatingDecorations />
          <StoryChapters />
          <Timeline />
          <MemoryGallery />
          <MemoryGame onComplete={() => setCurrentScene(8)} />
        </motion.div>
      )}

      {/* Ending Overlay Stages (Fake Ending, Letter, Voice & Gift, Final Ending) */}
      <AnimatePresence mode="wait">
        {currentScene === 8 && (
          <motion.div key="fake-ending" exit={{ opacity: 0 }}>
            <FakeEnding onComplete={() => setCurrentScene(9)} />
          </motion.div>
        )}

        {currentScene === 9 && (
          <motion.div key="letter" exit={{ opacity: 0 }}>
            <Letter onComplete={() => setCurrentScene(10)} />
          </motion.div>
        )}

        {currentScene === 10 && (
          <motion.div key="voice-gift" exit={{ opacity: 0 }}>
            <VoiceAndGift onComplete={() => setCurrentScene(11)} />
          </motion.div>
        )}

        {currentScene === 11 && (
          <motion.div key="birthday-ending" exit={{ opacity: 0 }}>
            <BirthdayEnding onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Now Playing Vinyl Indicator - visible from Scene 1 to Scene 11 */}
      <MiniMusicPlayer />
    </main>
  );
}
