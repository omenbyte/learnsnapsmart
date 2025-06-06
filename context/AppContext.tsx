'use client';

import React, { createContext, useContext, useState } from 'react';
import { StudyMaterial, User } from '@/types';

interface AppContextType {
  user: User;
  studyMaterials: StudyMaterial[];
  addStudyMaterial: (material: StudyMaterial) => void;
  deleteMaterial: (id: string) => void;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ isPremium: false });
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);

  const addStudyMaterial = (material: StudyMaterial) => {
    setStudyMaterials((prev) => [...prev, material]);
  };

  const deleteMaterial = (id: string) => {
    setStudyMaterials((prev) => prev.filter((material) => material.id !== id));
  };

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        studyMaterials, 
        addStudyMaterial, 
        deleteMaterial, 
        setUser 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 