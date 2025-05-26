"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Wand2, FileText, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"

interface NotesInputProps {
  onGenerate: (notes: string) => void
  loading?: boolean
}

export function NotesInput({ onGenerate, loading = false }: NotesInputProps) {
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const { user, isPremium, generationsUsed } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (notes.length < 10) {
      setError("Notes must be at least 10 characters long")
      return
    }

    if (notes.length > 5000) {
      setError("Notes must be less than 5000 characters")
      return
    }

    onGenerate(notes)
  }

  const canGenerate = user && (isPremium || generationsUsed < 1)
  const remainingGenerations = isPremium ? "∞" : Math.max(0, 1 - generationsUsed)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Study Material Generator
        </CardTitle>
        <CardDescription>
          Paste your notes below and our AI will generate personalized flashcards, Anki cards, quizzes, and sticky
          notes.
        </CardDescription>
        {user && (
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" />
            <span>
              Remaining generations: <strong>{remainingGenerations}</strong>
              {!isPremium && generationsUsed === 0 && <span className="text-muted-foreground ml-1">(Free trial)</span>}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Your Notes</Label>
            <Textarea
              id="notes"
              placeholder="Paste your study notes here... (minimum 10 characters, maximum 5000 characters)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] resize-none"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{notes.length}/5000 characters</span>
              <span>Minimum: 10 characters</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            disabled={loading || !canGenerate || notes.length < 10 || notes.length > 5000}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating AI Study Materials...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Study Materials
              </>
            )}
          </Button>

          {!canGenerate && user && (
            <p className="text-sm text-center text-muted-foreground">
              {!isPremium && generationsUsed >= 1
                ? "Upgrade to Premium for unlimited generations"
                : "Sign in to use AI generation"}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
