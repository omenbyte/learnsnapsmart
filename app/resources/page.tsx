'use client';

import React from 'react';
import { BookOpen, Video, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Medical Textbooks',
      description: 'Access to popular medical textbooks and reference materials.',
      icon: BookOpen,
      links: [
        { title: 'Gray\'s Anatomy', url: '#' },
        { title: 'Harrison\'s Internal Medicine', url: '#' },
        { title: 'Robbins Basic Pathology', url: '#' },
      ],
    },
    {
      title: 'Video Lectures',
      description: 'Curated collection of medical video lectures and demonstrations.',
      icon: Video,
      links: [
        { title: 'Clinical Examination Series', url: '#' },
        { title: 'Pathology Lectures', url: '#' },
        { title: 'Pharmacology Basics', url: '#' },
      ],
    },
    {
      title: 'Study Guides',
      description: 'Downloadable study guides and summary sheets.',
      icon: Download,
      links: [
        { title: 'USMLE Step 1 Guide', url: '#' },
        { title: 'Clinical Skills Checklist', url: '#' },
        { title: 'Medical Terminology Guide', url: '#' },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access our curated collection of medical study resources to enhance your learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <resource.icon className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="space-y-2">
                {resource.links.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    variant="outline"
                    className="w-full text-left justify-start"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    {link.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 