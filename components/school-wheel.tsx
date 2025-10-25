"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function SchoolWheel() {
  const [schools, setSchools] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchSchools = async () => {
      const { data, error } = await supabase
        .from("rsvps")
        .select("school")
        .eq("status", "attending")
        .not("school", "is", null)

      if (!error && data) {
        const uniqueSchools = Array.from(new Set(data.map((r) => r.school).filter(Boolean)))
        setSchools(uniqueSchools)
      }
      setLoading(false)
    }

    fetchSchools()

    const subscription = supabase
      .channel("school_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "rsvps" }, () => {
        fetchSchools()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="h-64 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participating Schools</CardTitle>
        <CardDescription>Universities and colleges joining the summit</CardDescription>
      </CardHeader>
      <CardContent>
        {schools.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Be the first school to register!</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {schools.map((school, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
              >
                {school}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
