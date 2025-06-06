'use client';

import React, { useState } from 'react';
import { Check, Download, Save, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types';
import { useApp } from '@/context/AppContext';

interface QuizQuestionsProps {
  quizQuestions: QuizQuestion[];
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quizQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
  const { addStudyMaterial } = useApp();
  
  const currentQuestion = quizQuestions[currentIndex];
  const isAnswered = answeredQuestions.includes(currentIndex);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentIndex]);
  };
  
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };
  
  const handleSave = () => {
    addStudyMaterial({
      id: Date.now().toString(),
      type: 'quiz',
      title: `Quiz Questions - ${new Date().toLocaleDateString()}`,
      content: quizQuestions,
      createdAt: new Date(),
    });
  };
  
  const handleExport = () => {
    const content = quizQuestions.map((q, i) => {
      let questionText = `Question ${i+1}: ${q.question}\n\n`;
      q.options.forEach((opt, j) => {
        questionText += `${String.fromCharCode(65 + j)}. ${opt}\n`;
      });
      questionText += `\nCorrect Answer: ${String.fromCharCode(65 + q.correctAnswer)}\n`;
      questionText += `Explanation: ${q.explanation}\n\n`;
      return questionText;
    }).join('---\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-questions-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (quizQuestions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No quiz questions generated yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
        
        <div className="flex items-center">
          <div className="mr-4 text-sm font-medium">
            Score: {score}/{answeredQuestions.length}
          </div>
          
          <div className="text-sm text-gray-500">
            {currentIndex + 1} of {quizQuestions.length}
          </div>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`w-full text-left p-3 rounded-md border ${
                  selectedOption === optionIndex 
                    ? optionIndex === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                    : isAnswered && optionIndex === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-300'
                      : 'border-gray-200 hover:bg-gray-50'
                } transition-colors`}
                onClick={() => handleOptionSelect(optionIndex)}
                disabled={isAnswered}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-5 w-5 mr-2 rounded-full border ${
                    selectedOption === optionIndex
                      ? optionIndex === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : isAnswered && optionIndex === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {(selectedOption === optionIndex && optionIndex === currentQuestion.correctAnswer) || 
                     (isAnswered && optionIndex === currentQuestion.correctAnswer) ? (
                      <Check className="h-3 w-3" />
                    ) : null}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-700 mb-1">Explanation</h5>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
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
            disabled={currentIndex === quizQuestions.length - 1}
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizQuestions; 