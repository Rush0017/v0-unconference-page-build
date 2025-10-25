"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Check } from "lucide-react"

export function NetworkWaitlistForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("network_waitlist").insert({
        email,
        name: name || null,
        school: school || null,
      })

      if (insertError) {
        if (insertError.code === "23505") {
          // Unique constraint violation
          setError("This email is already on the waitlist!")
        } else {
          throw insertError
        }
      } else {
        setSuccess(true)
        setEmail("")
        setName("")
        setSchool("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-4 animate-fade-in-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">You're on the list!</h3>
        <p className="text-gray-600">
          We'll notify you when The Network launches on November 14, 2025. Get ready to connect with the Bitcoin student
          community!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-900">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-900">
          Name (Optional)
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school" className="text-gray-900">
          School (Optional)
        </Label>
        <Input
          id="school"
          type="text"
          placeholder="Your university"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="border-gray-300"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#A64CA6] hover:bg-[#8B3D8B] text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg"
      >
        {submitting ? "Joining..." : "Join Waitlist"} <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </form>
  )
}
