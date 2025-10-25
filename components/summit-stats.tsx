"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Users, GraduationCap, Building2 } from "lucide-react"

interface SummitStats {
  total_attendees: number
  total_schools: number
  total_speakers: number
}

export function SummitStats() {
  const [stats, setStats] = useState<SummitStats>({ total_attendees: 0, total_schools: 0, total_speakers: 5 })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("rsvps").select("school, status").eq("status", "attending")

      if (!error && data) {
        const uniqueSchools = new Set(data.filter((r) => r.school).map((r) => r.school))
        setStats({
          total_attendees: data.length,
          total_schools: uniqueSchools.size,
          total_speakers: 5, // Placeholder - can be updated dynamically
        })
      }
      setLoading(false)
    }

    fetchStats()

    // Subscribe to real-time updates
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-20 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statItems = [
    { icon: Users, label: "Registered Students", value: stats.total_attendees, color: "text-primary" },
    { icon: Building2, label: "Schools Participating", value: stats.total_schools, color: "text-secondary" },
    { icon: GraduationCap, label: "Industry Speakers", value: stats.total_speakers, color: "text-accent" },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-5xl md:text-6xl font-light text-primary mb-4">Join the Movement</h2>
        <p className="text-lg text-[#C4D5CC] max-w-2xl mx-auto">
          Students and schools from around the world are already registered
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statItems.map((stat, index) => (
          <Card
            key={stat.label}
            className="bg-white rounded-2xl shadow-lg card-elevated border-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-5xl font-bold text-card-foreground animate-counter-up">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
