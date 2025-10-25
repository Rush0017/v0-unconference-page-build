"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function CampusConnectTeaser() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
      {/* Light lavender background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      {/* Left: Content */}
      <div className="relative z-10 space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
          <Sparkles className="w-4 h-4" />
          Launching November 14
        </div>
        <h2 className="text-5xl md:text-6xl font-light text-[#002E1E] leading-tight">Campus Connect</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          A global hub for students to show proof-of-work, connect, and build together.
        </p>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span>Connect with Bitcoin companies and opportunities</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span>Showcase your projects and proof-of-work</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span>Access exclusive events and mentorship programs</span>
          </li>
        </ul>
        <Button
          size="lg"
          className="font-medium text-lg px-10 py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Join the Waitlist <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Right: Mockup Illustration */}
      <div className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="relative">
          {/* Gradient shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-shimmer" />
          <img
            src="/campus-connect-app-mockup-desktop-and-mobile-previ.jpg"
            alt="Campus Connect Platform Preview"
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}
