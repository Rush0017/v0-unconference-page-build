"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface RSVPFormData {
  email: string
  name: string
  school: string
  school_year: string
  topics_of_interest: string
}

export function RSVPForm() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<RSVPFormData>({
    email: "",
    name: "",
    school: "",
    school_year: "",
    topics_of_interest: "",
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      const rsvpData = {
        email: formData.email,
        name: formData.name,
        status: "attending",
        school: formData.school || null,
        school_year: formData.school_year,
        topics_of_interest: formData.topics_of_interest || null,
      }

      const { error } = await supabase.from("rsvps").insert(rsvpData)
      if (error) throw error

      setSuccess(true)
      // Reset form after successful submission
      setFormData({
        email: "",
        name: "",
        school: "",
        school_year: "",
        topics_of_interest: "",
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur shadow-2xl rounded-3xl">
      <CardHeader className="space-y-3 pb-8">
        <CardTitle className="text-3xl font-bold">Register for the Summit</CardTitle>
        <CardDescription className="text-lg font-normal">
          Join us on November 21, 2025 • 12 PM - 3 PM ET
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-semibold">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="text-base py-6"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="text-base py-6"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="school" className="text-base font-semibold">
              School
            </Label>
            <Input
              id="school"
              placeholder="Enter your school name (optional)"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="text-base py-6"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="school_year" className="text-base font-semibold">
              Status *
            </Label>
            <Select
              value={formData.school_year}
              onValueChange={(value) => setFormData({ ...formData, school_year: value })}
              required
            >
              <SelectTrigger className="text-base py-6">
                <SelectValue placeholder="Select your status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high_school">High School Student</SelectItem>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="graduate">Graduate Student</SelectItem>
                <SelectItem value="recent_grad">Recent Graduate</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="topics_of_interest" className="text-base font-semibold">
              Topics of Interest
            </Label>
            <Textarea
              id="topics_of_interest"
              placeholder="What topics would you like to learn about? (e.g., Bitcoin development, career opportunities, entrepreneurship)"
              value={formData.topics_of_interest}
              onChange={(e) => setFormData({ ...formData, topics_of_interest: e.target.value })}
              rows={4}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground font-normal">Help us tailor the content to your interests</p>
          </div>

          {error && (
            <div className="p-5 bg-destructive/10 border border-destructive/20 rounded-xl">
              <p className="text-base text-destructive font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-base text-green-600 font-medium">
                Registration submitted successfully! Check your email for confirmation.
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-secondary text-lg font-bold py-7 rounded-xl"
          >
            {submitting ? "Submitting..." : "Complete Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
