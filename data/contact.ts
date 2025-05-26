import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"

export const contactHeroData = {
  title: "Get in Touch",
  subtitle:
    "Have questions, feedback, or need support? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.",
}

export const contactMethodsData = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "support@learnsnapsmart.com",
    color: "blue",
    action: null,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    contact: null,
    color: "green",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    subContact: "Mon-Fri, 9AM-6PM EST",
    color: "purple",
    action: null,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    contact: "123 Learning Street",
    subContact: "Education City, EC 12345\nUnited States",
    color: "orange",
    action: null,
  },
]

export const contactFormData = {
  title: "Send us a Message",
  subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com", required: true },
    { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?", required: true },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us more about your question or feedback...",
      required: true,
    },
  ],
  submitText: "Send Message",
}

export const faqData = {
  title: "Frequently Asked Questions",
  questions: [
    {
      question: "How do I get started?",
      answer:
        'Simply click "Try the App" on our homepage to explore our features, or sign up for a free account to get started with your personalized learning journey.',
    },
    {
      question: "Is LearnSnapSmart free?",
      answer:
        "We offer a free tier with basic features. Premium plans with advanced AI features and unlimited content are available for students who want the full experience.",
    },
    {
      question: "Can I use it on mobile?",
      answer:
        "Yes! LearnSnapSmart is fully responsive and works great on all devices. We also have dedicated mobile apps coming soon.",
    },
    {
      question: "How does the AI work?",
      answer:
        "Our AI analyzes your learning patterns, performance, and preferences to create personalized study materials and optimize your learning schedule for maximum retention.",
    },
  ],
}
