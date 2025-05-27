import React from 'react';
import Tabs from '../ui/Tabs';
import Flashcards from './Flashcards';
import AnkiCards from './AnkiCards';
import StickyNotes from './StickyNotes';
import QuizQuestions from './QuizQuestions';
import { Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';

interface GeneratedContent {
  flashcards: Array<{
    question: string;
    answer: string;
  }>;
  ankiCards: Array<{
    front: string;
    back: string;
    tags: string[];
  }>;
  stickyNotes: {
    points: string[];
  };
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

interface OutputPanelProps {
  generatedContent: GeneratedContent | null;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ generatedContent }) => {
  const { user } = useApp();
  
  if (!generatedContent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-4">
          Your study materials will appear here
        </h2>
        <p className="text-gray-500">
          Enter your medical content in the input field above and click "Generate" to create study materials.
        </p>
      </div>
    );
  }
  
  const tabs = [
    {
      id: 'flashcards',
      label: 'Flashcards',
      content: <Flashcards flashcards={generatedContent.flashcards} />,
    },
    {
      id: 'anki',
      label: (
        <div className="flex items-center">
          Anki Cards
          {!user.isPremium && <Lock className="h-3 w-3 ml-1" />}
          <Badge variant="premium" className="ml-2">
            Premium
          </Badge>
        </div>
      ),
      content: <AnkiCards ankiCards={generatedContent.ankiCards} />,
      premium: true,
    },
    {
      id: 'stickynotes',
      label: 'Sticky Notes',
      content: <StickyNotes stickyNotes={generatedContent.stickyNotes} />,
    },
    {
      id: 'quiz',
      label: 'Quiz Questions',
      content: <QuizQuestions quizQuestions={generatedContent.quizQuestions} />,
    },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Generated Study Materials</h2>
      <Tabs tabs={tabs} defaultTab="flashcards" />
    </div>
  );
};

export default OutputPanel;