"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Network, ArrowRight } from "lucide-react"
import { NetworkWaitlistForm } from "@/components/network-waitlist-form"

export function CampusConnectCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isLaunched, setIsLaunched] = useState(false)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const launchDate = new Date("2025-11-14T00:00:00")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance < 0) {
        setIsLaunched(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#F5F0F8] via-[#EDE5F2] to-[#E8DDF0]">
      {/* ... existing decorative elements ... */}

      <div className="container mx-auto px-6 py-20 md:py-24 max-w-4xl relative z-10">
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#D9B3E6]/30 shadow-sm">
              <Network className="w-8 h-8 text-[#A64CA6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-[#002E1E] leading-tight">The Network</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              A community platform built by Bitcoin Culture Hub where students can showcase their proof-of-work, connect
              with peers globally, and collaborate on Bitcoin projects.
            </p>
          </div>

          {!isLaunched ? (
            <div className="space-y-6">
              <div className="inline-block px-5 py-2 bg-white/70 backdrop-blur-sm border border-[#D9B3E6]/40 rounded-full text-sm font-medium text-[#A64CA6]">
                Launching November 14, 2025
              </div>

              <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Min" },
                  { value: timeLeft.seconds, label: "Sec" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-[#D9B3E6]/30 shadow-sm animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl md:text-4xl font-semibold text-[#002E1E] mb-1">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">{item.label}</div>
                  </div>
                ))}
              </div>

              {!showWaitlistForm ? (
                <Button
                  size="lg"
                  onClick={() => setShowWaitlistForm(true)}
                  className="font-medium text-base px-8 py-6 rounded-xl bg-[#A64CA6] text-white hover:bg-[#8B3A8B] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Join Waitlist <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="max-w-md mx-auto">
                  <NetworkWaitlistForm />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="inline-block px-5 py-2 bg-white/70 backdrop-blur-sm border border-[#F7931A]/40 rounded-full text-sm font-medium text-[#F7931A] animate-pulse">
                Now Live
              </div>

              <Button
                size="lg"
                className="font-medium text-base px-8 py-6 rounded-xl bg-[#A64CA6] text-white hover:bg-[#8B3A8B] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Join The Network <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
