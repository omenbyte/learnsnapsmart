import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "LearnSnapSmart - Study Smarter, Not Harder",
  description:
    "Transform your learning experience with AI-powered flashcards, quizzes, and study tools. Make every study session count with LearnSnapSmart.",
  keywords: "study tools, flashcards, quizzes, learning, education, AI, anki cards, study notes",
  authors: [{ name: "LearnSnapSmart Team" }],
  openGraph: {
    title: "LearnSnapSmart - Study Smarter, Not Harder",
    description: "Transform your learning experience with AI-powered study tools",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
