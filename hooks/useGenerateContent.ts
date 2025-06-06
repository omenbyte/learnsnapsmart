'use client';

import { useState } from 'react';
import { Flashcard, AnkiCard, StickyNote, QuizQuestion } from '@/types';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeneratedContent {
  flashcards: Flashcard[];
  ankiCards: AnkiCard[];
  stickyNotes: StickyNote;
  quizQuestions: QuizQuestion[];
}

// Initialize the Google Generative AI client with your API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || '');

export const useGenerateContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateContent = async (input: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!API_KEY) {
        throw new Error('API key not configured');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Generate educational content based on the following input. Provide the output in JSON format with the following structure: { flashcards: [{ question: string, answer: string }], ankiCards: [{ front: string, back: string, tags: string[] }], stickyNotes: { points: string[] }, quizQuestions: [{ question: string, options: string[], correctAnswer: number, explanation: string }] }. Input: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      // Remove backticks and "json" prefix if present
      const cleanedText = text.replace(/^```json\n|\n```$/g, '');
      
      const parsedContent: GeneratedContent = JSON.parse(cleanedText);
      setGeneratedContent(parsedContent);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    generatedContent,
    error,
    generateContent,
  };
}; 