"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactHeroData, contactMethodsData, contactFormData, faqData } from "@/data/contact"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              {contactHeroData.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {contactHeroData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethodsData.map((method) => {
                const Icon = method.icon
                return (
                  <Card key={method.title} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 w-fit group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`h-6 w-6 text-${method.color}-600 dark:text-${method.color}-400`} />
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {method.contact && <p className="font-medium mb-1">{method.contact}</p>}
                      {method.subContact && (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{method.subContact}</p>
                      )}
                      {method.action && (
                        <Button variant="outline" className="w-full mt-3">
                          {method.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-2xl">{contactFormData.title}</CardTitle>
                  <CardDescription className="text-base">{contactFormData.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contactFormData.fields.slice(0, 2).map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                      ))}
                    </div>

                    {contactFormData.fields.slice(2).map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>{field.label}</Label>
                        {field.type === "textarea" ? (
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="min-h-[120px]"
                            required={field.required}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-base py-6 h-auto"
                    >
                      {contactFormData.submitText}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{faqData.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqData.questions.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
