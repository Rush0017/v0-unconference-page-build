"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface VotingStats {
  totalProposals: number
  totalVotes: number
  topProposal: {
    title: string
    votes: number
  } | null
  averageVotes: number
}

export function VotingStats() {
  const [stats, setStats] = useState<VotingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      // Get proposal stats
      const { data: proposals, error: proposalsError } = await supabase
        .from("proposals")
        .select("id, title, vote_count")
        .order("vote_count", { ascending: false })

      // Get total votes
      const { count: totalVotes, error: votesError } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true })

      if (!proposalsError && !votesError && proposals) {
        const totalProposals = proposals.length
        const topProposal = proposals[0]
          ? {
              title: proposals[0].title,
              votes: proposals[0].vote_count,
            }
          : null

        const averageVotes = totalProposals > 0 ? (totalVotes || 0) / totalProposals : 0

        setStats({
          totalProposals,
          totalVotes: totalVotes || 0,
          topProposal,
          averageVotes: Math.round(averageVotes * 10) / 10,
        })
      }
      setLoading(false)
    }

    fetchStats()

    // Subscribe to real-time updates
    const proposalSubscription = supabase
      .channel("proposal_stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "proposals" }, () => {
        fetchStats()
      })
      .subscribe()

    const voteSubscription = supabase
      .channel("vote_stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "votes" }, () => {
        fetchStats()
      })
      .subscribe()

    return () => {
      proposalSubscription.unsubscribe()
      voteSubscription.unsubscribe()
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
        <CardTitle>Voting Statistics</CardTitle>
        <CardDescription>Community engagement overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalProposals}</div>
            <div className="text-sm text-muted-foreground">Proposals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalVotes}</div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.averageVotes}</div>
            <div className="text-sm text-muted-foreground">Avg per Proposal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.topProposal?.votes || 0}</div>
            <div className="text-sm text-muted-foreground">Top Proposal</div>
          </div>
        </div>
        {stats.topProposal && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <div className="text-sm font-medium">Most Popular:</div>
            <div className="text-sm text-muted-foreground truncate">{stats.topProposal.title}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
