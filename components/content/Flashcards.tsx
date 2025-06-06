'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Save } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flashcard } from '@/types';
import { useApp } from '@/context/AppContext';

interface FlashcardsProps {
  flashcards: Flashcard[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { addStudyMaterial } = useApp();
  
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setFlipped(false);
      
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      }, 50);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setFlipped(false);
      
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsTransitioning(false);
      }, 50);
    }
  };
  
  const handleFlip = () => {
    if (!isTransitioning) {
      setFlipped(!flipped);
    }
  };
  
  const handleSave = () => {
    addStudyMaterial({
      id: Date.now().toString(),
      type: 'flashcards',
      title: `Flashcards - ${new Date().toLocaleDateString()}`,
      content: flashcards,
      createdAt: new Date(),
    });
  };
  
  const handleExport = () => {
    const content = flashcards.map(card => 
      `Q: ${card.question}\nA: ${card.answer}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flashcards-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (flashcards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No flashcards generated yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Flashcards</h3>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} of {flashcards.length}
        </div>
      </div>
      
      <div 
        key={currentIndex}
        className="relative h-64 cursor-pointer"
        onClick={handleFlip}
      >
        <div 
          className={`absolute inset-0 ${isTransitioning ? '' : 'transition-all duration-500'} ${
            flipped ? 'opacity-0 transform rotateY-180' : 'opacity-100 transform rotate-0'
          }`}
        >
          <Card className="h-full flex items-center justify-center p-6">
            <CardContent className="text-center">
              <p className="text-xl font-medium">{flashcards[currentIndex].question}</p>
              <p className="mt-4 text-sm text-gray-500">Click to reveal answer</p>
            </CardContent>
          </Card>
        </div>
        
        <div 
          className={`absolute inset-0 ${isTransitioning ? '' : 'transition-all duration-500'} ${
            flipped ? 'opacity-100 transform rotate-0' : 'opacity-0 transform rotateY-180'
          }`}
        >
          <Card className="h-full flex items-center justify-center p-6 bg-blue-50">
            <CardContent className="text-center">
              <p className="text-lg">{flashcards[currentIndex].answer}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isTransitioning}
          className="flex items-center"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1 || isTransitioning}
          className="flex items-center"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcards; 