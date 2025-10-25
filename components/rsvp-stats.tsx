"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface RSVPStats {
  attending: number
  maybe: number
  not_attending: number
  total: number
}

export function RSVPStats() {
  const [stats, setStats] = useState<RSVPStats | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("rsvps").select("status")

      if (!error && data) {
        const stats = data.reduce(
          (acc, rsvp) => {
            acc[rsvp.status as keyof RSVPStats]++
            acc.total++
            return acc
          },
          { attending: 0, maybe: 0, not_attending: 0, total: 0 },
        )
        setStats(stats)
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
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-8 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Status</CardTitle>
        <CardDescription>Current RSVP numbers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{stats.attending}</div>
            <div className="text-sm text-muted-foreground">Attending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.maybe}</div>
            <div className="text-sm text-muted-foreground">Maybe</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{stats.not_attending}</div>
            <div className="text-sm text-muted-foreground">Not Attending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total RSVPs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
