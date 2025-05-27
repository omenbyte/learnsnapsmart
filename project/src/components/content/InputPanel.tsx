import React, { useState } from 'react';
import { AlertCircle, Mic, Upload, Lock } from 'lucide-react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';

interface InputPanelProps {
  onGenerateContent: (input: string) => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onGenerateContent, isLoading }) => {
  const { user } = useApp();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    if (e.target.value.length > 0 && e.target.value.length < 50) {
      setError('Input must be at least 50 characters');
    } else if (e.target.value.length > 5000) {
      setError('Input must be no more than 5000 characters');
    } else {
      setError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.length < 50) {
      setError('Input must be at least 50 characters');
      return;
    }
    
    if (input.length > 5000) {
      setError('Input must be no more than 5000 characters');
      return;
    }
    
    onGenerateContent(input);
  };

  const handleVoiceInput = () => {
    if (!user.isPremium) return;
    
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          // Handle recording logic here
          console.log('Recording started');
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
        });
    } else {
      // Stop recording
      console.log('Recording stopped');
    }
  };

  const handleImageUpload = () => {
    if (!user.isPremium) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle image upload logic here
        console.log('Image selected:', file.name);
      }
    };
    input.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Input Medical Content</h2>
          <div className="text-sm text-gray-500">
            {input.length} / 5000 characters
          </div>
        </div>
        
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Paste your lecture notes, textbook excerpts, or custom prompts here..."
          rows={8}
          error={error}
          className="mb-4"
          aria-label="Medical content input"
        />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!user.isPremium}
              className="flex items-center"
              onClick={handleVoiceInput}
            >
              {!user.isPremium && <Lock className="h-4 w-4 mr-1" />}
              <Mic className={`h-4 w-4 mr-1 ${isRecording ? 'text-red-500' : ''}`} />
              {isRecording ? 'Stop Recording' : 'Voice Input'}
              {!user.isPremium && (
                <Badge variant="premium" className="ml-2">
                  Premium
                </Badge>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!user.isPremium}
              className="flex items-center"
              onClick={handleImageUpload}
            >
              {!user.isPremium && <Lock className="h-4 w-4 mr-1" />}
              <Upload className="h-4 w-4 mr-1" />
              Image Upload
              {!user.isPremium && (
                <Badge variant="premium" className="ml-2">
                  Premium
                </Badge>
              )}
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
        
        {error && (
          <div className="mt-4 flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default InputPanel