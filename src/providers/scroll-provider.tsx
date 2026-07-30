"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";

interface ScrollContextType {
  lenis: Lenis | null;
  lockScroll: () => void;
  unlockScroll: () => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  lockScroll: () => {},
  unlockScroll: () => {},
});

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Animation frame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const lockScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const unlockScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance, lockScroll, unlockScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
