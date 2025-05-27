import React, { useState } from 'react';
import { Lock, Download, Save, Tag, Plus, X } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { AnkiCard } from '../../types';
import { useApp } from '../../context/AppContext';

interface AnkiCardsProps {
  ankiCards: AnkiCard[];
}

const AnkiCards: React.FC<AnkiCardsProps> = ({ ankiCards }) => {
  const { user, addStudyMaterial } = useApp();
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  
  const handleSave = () => {
    addStudyMaterial({
      id: Date.now().toString(),
      type: 'anki',
      title: `Anki Cards - ${new Date().toLocaleDateString()}`,
      content: ankiCards,
      createdAt: new Date(),
    });
  };
  
  const handleExport = () => {
    // In a real app, this would generate and download a file in Anki format
    const content = ankiCards.map(card => 
      `${card.front}\t${card.back}\t${card.tags.join(',')}`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anki-cards-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (!user.isPremium) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Feature</h3>
        <p className="text-gray-500 mb-4">
          Anki card generation is available for premium subscribers only.
        </p>
        <Button variant="premium">Upgrade to Premium</Button>
      </div>
    );
  }
  
  if (ankiCards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No Anki cards generated yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Anki Cards
          <Badge variant="premium" className="ml-2">Premium</Badge>
        </h3>
        
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
            Export for Anki
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {ankiCards.map((card, index) => (
          <Card 
            key={index}
            className={`transition-shadow ${
              expandedCardIndex === index ? 'shadow-lg' : ''
            }`}
          >
            <CardHeader className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}>
              <h4 className="font-medium">{card.front}</h4>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                {expandedCardIndex === index ? (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Show
                  </>
                )}
              </Button>
            </CardHeader>
            
            {expandedCardIndex === index && (
              <CardContent className="border-t border-gray-100 pt-4">
                <p className="mb-4">{card.back}</p>
                <div className="flex flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  {card.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnkiCards;