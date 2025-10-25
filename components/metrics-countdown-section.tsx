"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Users, GraduationCap, Building2, Calendar, Rocket } from "lucide-react"

interface SummitStats {
  total_attendees: number
  total_schools: number
  total_speakers: number
}

export function MetricsCountdownSection() {
  const [stats, setStats] = useState<SummitStats>({ total_attendees: 0, total_schools: 0, total_speakers: 5 })
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const supabase = createClient()
  const launchDate = new Date("2024-11-14T00:00:00")

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("rsvps").select("school, status").eq("status", "attending")

      if (!error && data) {
        const uniqueSchools = new Set(data.filter((r) => r.school).map((r) => r.school))
        setStats({
          total_attendees: data.length,
          total_schools: uniqueSchools.size,
          total_speakers: 5,
        })
      }
      setLoading(false)
    }

    fetchStats()

    const subscription = supabase
      .channel("rsvp_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "rsvps" }, () => {
        fetchStats()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

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
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-64 bg-white/10 animate-pulse rounded-3xl" />
        <div className="h-64 bg-white/10 animate-pulse rounded-3xl" />
      </div>
    )
  }

  const statItems = [
    { icon: Users, label: "Registered Students", value: stats.total_attendees },
    { icon: Building2, label: "Schools Participating", value: stats.total_schools },
    { icon: GraduationCap, label: "Industry Speakers", value: stats.total_speakers },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
      {/* Subtle glowing network mesh background - using actual generated image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src="/network-mesh-globe-illustration.jpg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Left: Campus Connect Countdown */}
      <div className="relative z-10 space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-light text-white">Campus Connect</h2>
        </div>
        <p className="text-xl text-[#C4D5CC] leading-relaxed">
          A global hub for students to show proof-of-work, connect, and build together.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-primary/30">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-primary" />
            <div className="text-sm font-medium text-white uppercase tracking-wider">Launching November 14</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-5xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-sm text-[#C4D5CC] mt-1">Days</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-sm text-[#C4D5CC] mt-1">Hours</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-sm text-[#C4D5CC] mt-1">Minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live Metrics */}
      <div className="relative z-10 space-y-6">
        <h3 className="text-3xl md:text-4xl font-light text-white mb-8">Live Summit Metrics</h3>
        <div className="space-y-4">
          {statItems.map((stat, index) => (
            <Card
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/30 animate-fade-in-up hover:bg-white/15 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm text-[#C4D5CC] font-medium">{stat.label}</div>
                  </div>
                  <div className="text-4xl font-bold text-white animate-counter-up">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
