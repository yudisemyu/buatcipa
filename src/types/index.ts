export type SceneType =
  | 1  // Loading
  | 2  // Invitation
  | 3  // Memory Password
  | 4  // Story Chapters
  | 5  // Timeline
  | 6  // Memory Gallery
  | 7  // Mini Game
  | 8  // Fake Ending
  | 9  // Letter
  | 10 // Voice Message + Gift
  | 11 // Birthday Ending

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  paragraph: string;
  quote: string;
  secretNote?: string;
}

export interface Memory {
  id: string;
  date: string;
  title: string;
  image: string;
  story: string;
  location?: string;
  audio?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
