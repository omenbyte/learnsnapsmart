import React from 'react';
import { Download, Save } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { StickyNote } from '../../types';
import { useApp } from '../../context/AppContext';

interface StickyNotesProps {
  stickyNotes: StickyNote;
}

const StickyNotes: React.FC<StickyNotesProps> = ({ stickyNotes }) => {
  const { addStudyMaterial } = useApp();
  
  const handleSave = () => {
    addStudyMaterial({
      id: Date.now().toString(),
      type: 'stickynotes',
      title: `Sticky Notes - ${new Date().toLocaleDateString()}`,
      content: stickyNotes,
      createdAt: new Date(),
    });
  };
  
  const handleExport = () => {
    // In a real app, this would generate and download a file
    const content = stickyNotes.points.map(point => `• ${point}`).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sticky-notes-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (!stickyNotes || stickyNotes.points.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No sticky notes generated yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Sticky Notes</h3>
        
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-yellow-50 border border-yellow-100 shadow-sm transform rotate-1">
          <CardContent className="p-6">
            <ul className="space-y-3">
              {stickyNotes.points.map((point, index) => (
                <li key={index} className="flex">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StickyNotes;