"use client"

import type React from "react"

import { useAuth } from "@/components/AuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Zap } from "lucide-react"
import Link from "next/link"

interface PremiumGateProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PremiumGate({ children, title, description }: PremiumGateProps) {
  const { user, isPremium, generationsUsed } = useAuth()

  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Crown className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>Please sign in to access AI-powered study tools</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!isPremium && generationsUsed >= 1) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Crown className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <CardTitle>{title || "Premium Required"}</CardTitle>
          <CardDescription>
            {description ||
              "You've used your free generation. Upgrade to Premium for unlimited AI-powered study tools."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">£2</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              Unlimited AI generations
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              All study formats
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              Advanced AI models
            </li>
          </ul>
          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600">Upgrade to Premium</Button>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
