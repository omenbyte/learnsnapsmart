"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, FileText, StickyNote, Download, RotateCcw } from "lucide-react"

interface AIResultsProps {
  results: {
    flashcards: Array<{ question: string; answer: string }>
    ankiCards: Array<{ front: string; back: string; difficulty: string }>
    quiz: Array<{ question: string; options: string[]; correct: number }>
    stickyNotes: string[]
  }
  onReset: () => void
}

export function AIResults({ results, onReset }: AIResultsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI-Generated Study Materials</h2>
          <p className="text-muted-foreground">Your personalized study content is ready!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Generate New
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="anki" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Anki Cards</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <StickyNote className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards" className="mt-6">
          <div className="grid gap-4">
            {results.flashcards.map((card, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Question:</h4>
                    <p>{card.question}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Answer:</h4>
                    <p>{card.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anki" className="mt-6">
          <div className="grid gap-4">
            {results.ankiCards.map((card, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Anki Card {index + 1}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        card.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : card.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {card.difficulty}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Front:</h4>
                    <p>{card.front}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pink-600 dark:text-pink-400 mb-2">Back:</h4>
                    <p>{card.back}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <div className="grid gap-4">
            {results.quiz.map((question, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">{question.question}</h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correct
                            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                            : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                        {optionIndex === question.correct && (
                          <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.stickyNotes.map((note, index) => (
              <Card
                key={index}
                className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <p className="text-sm">{note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
