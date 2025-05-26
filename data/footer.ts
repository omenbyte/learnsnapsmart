import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export const footerData = {
  brand: {
    name: "LearnSnapSmart",
    description: "Study smarter, not harder with AI-powered learning tools.",
  },
  links: {
    product: {
      title: "Product",
      items: [
        { name: "Features", href: "/features" },
        { name: "Try Demo", href: "/try-app" },
        { name: "Pricing", href: "/pricing" },
        { name: "Updates", href: "/updates" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    support: {
      title: "Support",
      items: [
        { name: "Help Center", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Status", href: "/status" },
      ],
    },
    legal: {
      title: "Legal",
      items: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  },
  social: [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:hello@learnsnapsmart.com", icon: Mail },
  ],
  bottom: {
    copyright: "© 2024 LearnSnapSmart. All rights reserved.",
    madeWith: {
      text: "Made with",
      icon: Heart,
      location: "for students worldwide",
    },
  },
}
