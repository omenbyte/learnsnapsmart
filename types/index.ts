export type StudyMaterialType = 'flashcards' | 'anki' | 'stickynotes' | 'quiz';

export interface StudyMaterial {
  id: string;
  type: StudyMaterialType;
  title: string;
  content: any;
  createdAt: Date;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface AnkiCard {
  front: string;
  back: string;
  tags: string[];
}

export interface StickyNote {
  points: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface User {
  isPremium: boolean;
} 