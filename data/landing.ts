import { BookOpen, Brain, FileText, StickyNote, Zap, Target, Users, Sparkles } from "lucide-react"

export const heroData = {
  title: "Study Smarter, Not Harder",
  subtitle:
    "Transform your learning experience with AI-powered flashcards, quizzes, and study tools. Make every study session count with LearnSnapSmart.",
  primaryCTA: {
    text: "Try the App",
    href: "/try-app",
    icon: Sparkles,
  },
  secondaryCTA: {
    text: "Learn More",
    href: "/about",
  },
}

export const featuresData = {
  title: "Everything You Need to Excel",
  subtitle:
    "Our comprehensive suite of study tools adapts to your learning style and helps you achieve your academic goals.",
  features: [
    {
      icon: BookOpen,
      title: "Anki Cards",
      description: "Spaced repetition flashcards that adapt to your learning pace",
      color: "pink",
    },
    {
      icon: Brain,
      title: "Smart Flashcards",
      description: "AI-generated flashcards from your study materials",
      color: "blue",
    },
    {
      icon: FileText,
      title: "Interactive Quizzes",
      description: "Test your knowledge with personalized quiz questions",
      color: "green",
    },
    {
      icon: StickyNote,
      title: "Smart Notes",
      description: "Organize your thoughts with intelligent sticky notes",
      color: "yellow",
    },
  ],
}

export const benefitsData = {
  title: "Why Choose LearnSnapSmart?",
  benefits: [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate study materials in seconds, not hours. Focus on learning, not preparation.",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: Target,
      title: "Personalized",
      description: "Adaptive learning algorithms that adjust to your strengths and weaknesses.",
      gradient: "from-blue-400 to-purple-400",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Share study sets with classmates and learn together more effectively.",
      gradient: "from-green-400 to-blue-400",
    },
  ],
}

export const ctaData = {
  title: "Ready to Transform Your Learning?",
  subtitle: "Join thousands of students who have already improved their study efficiency with LearnSnapSmart.",
  cta: {
    text: "Start Learning Smarter Today",
    href: "/try-app",
    icon: Sparkles,
  },
}
