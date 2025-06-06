'use client';

import React, { useState } from 'react';
import { useGenerateContent } from '@/hooks/useGenerateContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Mic, Upload, Lock } from 'lucide-react';
import Flashcards from '@/components/content/Flashcards';
import QuizQuestions from '@/components/content/QuizQuestions';
import StickyNotes from '@/components/content/StickyNotes';
import AnkiCards from '@/components/content/AnkiCards';

export default function DashboardPage() {
  const { isLoading, generatedContent, error, generateContent } = useGenerateContent();
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    if (e.target.value.length > 0 && e.target.value.length < 50) {
      setInputError('Input must be at least 50 characters');
    } else if (e.target.value.length > 5000) {
      setInputError('Input must be no more than 5000 characters');
    } else {
      setInputError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.length < 50) {
      setInputError('Input must be at least 50 characters');
      return;
    }
    
    if (input.length > 5000) {
      setInputError('Input must be no more than 5000 characters');
      return;
    }
    
    generateContent(input);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MediStudy AI Assistant</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your medical course content into effective study materials. Enter your lecture notes, textbook excerpts, or custom prompts below.
        </p>
      </div>
      
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Input Medical Content</CardTitle>
            <div className="text-sm text-gray-500">
              {input.length} / 5000 characters
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your lecture notes, textbook excerpts, or custom prompts here..."
              rows={8}
              className="mb-4"
            />
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={true}
                  className="flex items-center"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  <Mic className="h-4 w-4 mr-1" />
                  Voice Input (Premium)
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={true}
                  className="flex items-center"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  <Upload className="h-4 w-4 mr-1" />
                  Image Upload (Premium)
                </Button>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || input.length < 50 || input.length > 5000}
                className="min-w-24"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            
            {inputError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {inputError}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      
      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-medium text-gray-900">Generating your study materials...</h2>
            <p className="text-gray-500 mt-2">
              This may take a few seconds as we analyze your medical content.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <CardContent>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Content */}
      {!isLoading && !error && generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="flashcards" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="anki">Anki Cards</TabsTrigger>
                <TabsTrigger value="stickynotes">Sticky Notes</TabsTrigger>
                <TabsTrigger value="quiz">Quiz Questions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flashcards" className="mt-6">
                <Flashcards flashcards={generatedContent.flashcards} />
              </TabsContent>
              
              <TabsContent value="anki" className="mt-6">
                <AnkiCards ankiCards={generatedContent.ankiCards} />
              </TabsContent>
              
              <TabsContent value="stickynotes" className="mt-6">
                <StickyNotes stickyNotes={generatedContent.stickyNotes} />
              </TabsContent>
              
              <TabsContent value="quiz" className="mt-6">
                <QuizQuestions quizQuestions={generatedContent.quizQuestions} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && !generatedContent && (
        <Card>
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your study materials will appear here
            </h2>
            <p className="text-gray-500">
              Enter your medical content in the input field above and click "Generate" to create study materials.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 