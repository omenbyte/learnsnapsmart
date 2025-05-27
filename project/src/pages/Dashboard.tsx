import React from 'react';
import { useState } from 'react';
import InputPanel from '../components/content/InputPanel';
import OutputPanel from '../components/content/OutputPanel';
import { useGenerateContent } from '../hooks/useGenerateContent';

const Dashboard: React.FC = () => {
  const { isLoading, generatedContent, error, generateContent } = useGenerateContent();
  
  const handleGenerateContent = (input: string) => {
    generateContent(input);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MediStudy AI Assistant</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your medical course content into effective study materials. Enter your lecture notes, textbook excerpts, or custom prompts below.
        </p>
      </div>
      
      <InputPanel onGenerateContent={handleGenerateContent} isLoading={isLoading} />
      
      {isLoading && (
        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-4 w-full">
            <div
              className="bg-blue-600 h-4 rounded-full animate-pulse"
              style={{ width: `100%` }} // Indeterminate progress bar
            ></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center mt-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <h2 className="text-xl font-medium text-gray-900">Generating your study materials...</h2>
              <p className="text-gray-500 mt-2">
                This may take a few seconds as we analyze your medical content.
              </p>
            </div>
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!isLoading && !error && generatedContent && (
        <div className="mt-8">
            <OutputPanel generatedContent={generatedContent} />
        </div>
          )}

      {!isLoading && !error && !generatedContent && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
           <h2 className="text-xl font-medium text-gray-900 mb-4">
             Your study materials will appear here
           </h2>
           <p className="text-gray-500">
             Enter your medical content in the input field above and click "Generate" to create study materials.
           </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;