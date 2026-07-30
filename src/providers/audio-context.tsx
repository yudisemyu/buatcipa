"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Howl } from "howler";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  startTime?: number; // Detik mulai diputar (misal: 15 = detik ke-15)
  endTime?: number;   // Detik selesai / transisi (misal: 180 = detik ke-180 / menit 3:00)
}

export const PLAYLIST: Track[] = [
  {
    id: 1,
    title: "First Love Song",
    artist: "KickFlip",
    src: "/music/lagu1.mp3",
    startTime: 30,   // Detik mulai (contoh: 0)
    endTime: 100,   // Detik selesai (contoh: 180 = 3 menit)
  },
  {
    id: 2,
    title: "Eight",
    artist: "IU",
    src: "/music/lagu2.mp3",
    startTime: 30,
    endTime: 180,
  },
  {
    id: 3,
    title: "Terbuang Dalam Waktu",
    artist: "Barasuara",
    src: "/music/lagu3.mp3",
    startTime: 150,
    endTime: 300,
  },
  {
    id: 4,
    title: "Birthday",
    artist: "SOMI",
    src: "/music/lagu4.mp3",
    startTime: 30,
    endTime: 180,
  },
];

interface AudioContextType {
  isPlayingBg: boolean;
  isVoicePlaying: boolean;
  currentTrackIndex: number;
  currentTrack: Track;
  playBg: () => void;
  pauseBg: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  playSceneTrack: (scene: number) => void;
  playVoice: () => void;
  pauseVoice: () => void;
  setBgVolume: (vol: number) => void;
  bgVolume: number;
  fadeOutBg: (duration?: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlayingBg, setIsPlayingBg] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [bgVolume, setBgVolumeState] = useState(0.4);

  const bgMusicRef = useRef<Howl | null>(null);
  const voiceMsgRef = useRef<Howl | null>(null);
  const wasPlayingBgBeforeVoice = useRef(false);
  const currentTrackIndexRef = useRef(0);
  const endTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and play track with smooth fade-in / fade-out crossfade
  const loadAndPlayTrack = (trackIndex: number, shouldPlay = true) => {
    const oldHowl = bgMusicRef.current;
    const track = PLAYLIST[trackIndex] || PLAYLIST[0];

    // Cancel any pending auto-advance timers from previous track
    if (endTimeIntervalRef.current) {
      clearInterval(endTimeIntervalRef.current);
      endTimeIntervalRef.current = null;
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

    // Fade out old track smoothly over 1200ms
    if (oldHowl && oldHowl.playing()) {
      oldHowl.fade(oldHowl.volume(), 0, 1200);
      setTimeout(() => {
        oldHowl.unload();
      }, 1300);
    } else if (oldHowl) {
      oldHowl.unload();
    }

    // Create new Howl instance starting at 0 volume for smooth Fade-In
    let hasSeeked = false;
    const newHowl = new Howl({
      src: [track.src],
      html5: true,
      volume: 0,
      loop: !track.endTime, // Loop if no specific endTime set
      onplay: () => {
        let isFirstPlay = false;

        if (!hasSeeked) {
          hasSeeked = true;
          isFirstPlay = true;
          // Seek to startTime if specified
          if (track.startTime && track.startTime > 0) {
            try {
              newHowl.seek(track.startTime);
            } catch (e) {
              console.warn("Seek not ready yet:", e);
            }
          }
        }

        // Smooth Fade In from 0 to bgVolume
        // Long fade in (8000ms) for first play of track 0 and track 2
        const fadeInDuration = isFirstPlay && (trackIndex === 0 || trackIndex === 2) ? 8000 : 1500;
        newHowl.fade(0, bgVolume, fadeInDuration);
        setIsPlayingBg(true);
      },
      onloaderror: () => {
        console.warn(`Audio file not found: ${track.src}. Please place MP3 inside public${track.src}`);
        setIsPlayingBg(false);
      },
      onplayerror: () => {
        console.warn(`Failed to play ${track.src}.`);
        setIsPlayingBg(false);
      },
    });

    bgMusicRef.current = newHowl;

    if (shouldPlay) {
      newHowl.play();
    }

    // Monitor endTime: determine what happens when the song reaches its end
    if (track.endTime && track.endTime > 0) {
      endTimeIntervalRef.current = setInterval(() => {
        if (bgMusicRef.current && bgMusicRef.current.playing()) {
          const currentSeek = bgMusicRef.current.seek() as number;
          if (typeof currentSeek === "number" && currentSeek >= track.endTime!) {
            // Clear interval IMMEDIATELY to prevent double-firing
            if (endTimeIntervalRef.current) {
              clearInterval(endTimeIntervalRef.current);
              endTimeIntervalRef.current = null;
            }

            // Determine next action based on current track position
            let nextIdx: number | null = null;

            if (trackIndex === 0) {
              // Lagu 1 selesai → pindah ke Lagu 2
              nextIdx = 1;
            } else if (trackIndex === 1) {
              // Lagu 2 selesai → kembali ke Lagu 1 (loop Lagu 1 & 2)
              nextIdx = 0;
            }
            // Lagu 3 & 4: loop dirinya sendiri (nextIdx tetap null)

            if (nextIdx !== null) {
              // Smooth crossfade to next track in the loop pair
              bgMusicRef.current.fade(bgVolume, 0, 1500);
              autoAdvanceTimeoutRef.current = setTimeout(() => {
                currentTrackIndexRef.current = nextIdx!;
                setCurrentTrackIndex(nextIdx!);
                loadAndPlayTrack(nextIdx!, true);
              }, 1500);
            } else {
              // Self-loop: fade out, seek back to startTime, fade in
              bgMusicRef.current.fade(bgVolume, 0, 1500);
              autoAdvanceTimeoutRef.current = setTimeout(() => {
                if (bgMusicRef.current) {
                  bgMusicRef.current.seek(track.startTime ?? 0);
                  bgMusicRef.current.fade(0, bgVolume, 1200);
                  // Re-enable endTime monitoring for next loop cycle
                  endTimeIntervalRef.current = setInterval(() => {
                    if (bgMusicRef.current && bgMusicRef.current.playing()) {
                      const s = bgMusicRef.current.seek() as number;
                      if (typeof s === "number" && s >= track.endTime!) {
                        if (endTimeIntervalRef.current) {
                          clearInterval(endTimeIntervalRef.current);
                          endTimeIntervalRef.current = null;
                        }
                        bgMusicRef.current.fade(bgVolume, 0, 1500);
                        autoAdvanceTimeoutRef.current = setTimeout(() => {
                          if (bgMusicRef.current) {
                            bgMusicRef.current.seek(track.startTime ?? 0);
                            bgMusicRef.current.fade(0, bgVolume, 1200);
                          }
                        }, 1500);
                      }
                    }
                  }, 1000);
                }
              }, 1500);
            }
          }
        }
      }, 1000);
    }
  };

  useEffect(() => {
    // Attempt to start playing immediately on mount (might be blocked by browser until interaction)
    loadAndPlayTrack(currentTrackIndex, true);

    // Initialize voice message Howl
    voiceMsgRef.current = new Howl({
      src: ["/audio/voice.mp3"],
      html5: true,
      volume: 1.0,
      onplay: () => {
        setIsVoicePlaying(true);
        if (bgMusicRef.current?.playing()) {
          wasPlayingBgBeforeVoice.current = true;
          bgMusicRef.current.pause();
          setIsPlayingBg(false);
        } else {
          wasPlayingBgBeforeVoice.current = false;
        }
      },
      onpause: () => {
        setIsVoicePlaying(false);
        if (wasPlayingBgBeforeVoice.current && bgMusicRef.current && !bgMusicRef.current.playing()) {
          bgMusicRef.current.play();
          setIsPlayingBg(true);
        }
      },
      onend: () => {
        setIsVoicePlaying(false);
        if (wasPlayingBgBeforeVoice.current && bgMusicRef.current && !bgMusicRef.current.playing()) {
          bgMusicRef.current.play();
          setIsPlayingBg(true);
        }
      },
      onloaderror: () => {
        console.warn("Failed to load voice audio. Make sure public/audio/voice.mp3 exists.");
        setIsVoicePlaying(false);
      },
      onplayerror: () => {
        console.warn("Failed to play voice audio.");
        setIsVoicePlaying(false);
      },
    });

    return () => {
      bgMusicRef.current?.unload();
      voiceMsgRef.current?.unload();
    };
  }, []);

  const playBg = () => {
    if (!bgMusicRef.current) return;
    if (!bgMusicRef.current.playing()) {
      bgMusicRef.current.play();
      setIsPlayingBg(true);
    }
  };

  const pauseBg = () => {
    if (!bgMusicRef.current) return;
    if (bgMusicRef.current.playing()) {
      bgMusicRef.current.pause();
      setIsPlayingBg(false);
    }
  };

  const playSceneTrack = (scene: number) => {
    // Scene 1 s/d 7 (Loading, Invitation, Password, Story, Timeline, Gallery, Game):
    // Musik berjalan terus kontinyu tanpa terpotong! Hanya berganti jika lagu habis secara alami.

    // Masuk ke Scene 8/9 (Surat & Ucapan):
    // LANGSUNG dipotong & beralih secara mulus (fade out -> fade in) ke Lagu Ucapan (Track 2)

    // Masuk ke Scene 11 (Grand Birthday Ending):
    // LANGSUNG dipotong & beralih secara mulus ke Lagu Ending (Track 3)

    let targetIndex: number | null = null;

    if ((scene === 8 || scene === 9) && currentTrackIndexRef.current < 2) {
      targetIndex = 2; // Directly cut & smoothly transition to Lagu Ucapan (Lagu 3)
    } else if (scene === 11 && currentTrackIndexRef.current < 3) {
      targetIndex = 3; // Directly cut & smoothly transition to Lagu Birthday Ending (Lagu 4)
    }

    if (targetIndex !== null && targetIndex !== currentTrackIndexRef.current) {
      currentTrackIndexRef.current = targetIndex;
      setCurrentTrackIndex(targetIndex);
      loadAndPlayTrack(targetIndex, true);
    } else if (!bgMusicRef.current?.playing()) {
      playBg();
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    currentTrackIndexRef.current = nextIdx;
    setCurrentTrackIndex(nextIdx);
    loadAndPlayTrack(nextIdx, true);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    currentTrackIndexRef.current = prevIdx;
    setCurrentTrackIndex(prevIdx);
    loadAndPlayTrack(prevIdx, true);
  };

  const fadeOutBg = (duration = 2500) => {
    if (bgMusicRef.current && bgMusicRef.current.playing()) {
      bgMusicRef.current.fade(bgVolume, 0, duration);
      setTimeout(() => {
        bgMusicRef.current?.pause();
        bgMusicRef.current?.volume(bgVolume);
        setIsPlayingBg(false);
      }, duration);
    }
  };

  const playVoice = () => {
    if (!voiceMsgRef.current) return;
    if (!voiceMsgRef.current.playing()) {
      voiceMsgRef.current.play();
    }
  };

  const pauseVoice = () => {
    if (!voiceMsgRef.current) return;
    if (voiceMsgRef.current.playing()) {
      voiceMsgRef.current.pause();
    }
  };

  const setBgVolume = (vol: number) => {
    setBgVolumeState(vol);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume(vol);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlayingBg,
        isVoicePlaying,
        currentTrackIndex,
        currentTrack: PLAYLIST[currentTrackIndex] || PLAYLIST[0],
        playBg,
        pauseBg,
        nextTrack,
        prevTrack,
        playSceneTrack,
        playVoice,
        pauseVoice,
        setBgVolume,
        bgVolume,
        fadeOutBg,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
