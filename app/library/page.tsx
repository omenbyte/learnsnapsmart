'use client';

import React from 'react';
import { Trash, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

export default function LibraryPage() {
  const { studyMaterials, deleteMaterial } = useApp();
  
  if (studyMaterials.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Library</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Save your generated study materials to access them later.
          </p>
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">
                You don't have any saved study materials yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Group materials by date
  const groupedMaterials = studyMaterials.reduce((groups, material) => {
    const date = material.createdAt.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(material);
    return groups;
  }, {} as Record<string, typeof studyMaterials>);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Library</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access and manage your saved study materials.
        </p>
      </div>
      
      <div className="space-y-8">
        {Object.entries(groupedMaterials).map(([date, materials]) => (
          <div key={date}>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">{date}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{material.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMaterial(material.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 capitalize">
                      Type: {material.type}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {material.createdAt.toLocaleTimeString()}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 