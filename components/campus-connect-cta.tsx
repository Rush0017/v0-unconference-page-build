"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Rocket, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function CampusConnectCTA() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const [isLive, setIsLive] = useState(false)
  const launchDate = new Date("2024-11-14T00:00:00")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        })
        setIsLive(false)
      } else {
        setIsLive(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          {isLive ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Rocket className="w-6 h-6 text-blue-500" />}
          <CardTitle>Campus Connect</CardTitle>
        </div>
        <CardDescription>
          {isLive
            ? "Now Live - Your Gateway to Bitcoin Opportunities"
            : "Launching November 14 - Your Gateway to Bitcoin Opportunities"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Campus Connect is the premier platform connecting students with Bitcoin opportunities. Get
          {isLive ? " access to" : " early access to"} internships, mentorship programs, and exclusive events.
        </p>

        {!isLive ? (
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Launching in</div>
              <div className="text-2xl font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-sm font-medium text-green-500">Now Live!</div>
              <div className="text-sm text-muted-foreground">Join thousands of students already connected</div>
            </div>
          </div>
        )}

        <Button className="w-full" size="lg">
          {isLive ? "Join Campus Connect" : "Join Campus Connect Waitlist"}
        </Button>
      </CardContent>
    </Card>
  )
}
