"use client"

import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VoteButton } from "@/components/vote-button"
import { useEffect, useState } from "react"

interface Proposal {
  id: string
  title: string
  description: string
  category: string | null
  duration: number
  status: string
  vote_count: number
  created_at: string
  profiles: {
    name: string
  }
}

export function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchProposals = async () => {
      const { data, error } = await supabase
        .from("proposals")
        .select(
          `
          id,
          title,
          description,
          category,
          duration,
          status,
          vote_count,
          created_at,
          profiles (
            name
          )
        `,
        )
        .order("vote_count", { ascending: false })
        .order("created_at", { ascending: false })

      if (!error && data) {
        setProposals(data)
      }
      setLoading(false)
    }

    fetchProposals()

    // Subscribe to real-time updates for proposals
    const proposalSubscription = supabase
      .channel("proposal_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "proposals" }, () => {
        fetchProposals()
      })
      .subscribe()

    // Subscribe to real-time updates for votes
    const voteSubscription = supabase
      .channel("vote_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "votes" }, () => {
        fetchProposals()
      })
      .subscribe()

    return () => {
      proposalSubscription.unsubscribe()
      voteSubscription.unsubscribe()
    }
  }, [supabase])

  const handleVoteChange = (proposalId: string, newCount: number) => {
    setProposals((prev) =>
      prev
        .map((proposal) => (proposal.id === proposalId ? { ...proposal, vote_count: newCount } : proposal))
        .sort(
          (a, b) => b.vote_count - a.vote_count || new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "scheduled":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    }
  }

  const getCategoryColor = (category: string | null) => {
    if (!category) return "bg-muted text-muted-foreground"

    switch (category.toLowerCase()) {
      case "technical":
        return "bg-blue-500/10 text-blue-600"
      case "business":
        return "bg-green-500/10 text-green-600"
      case "community":
        return "bg-purple-500/10 text-purple-600"
      case "development":
        return "bg-orange-500/10 text-orange-600"
      case "design":
        return "bg-pink-500/10 text-pink-600"
      case "marketing":
        return "bg-cyan-500/10 text-cyan-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-6 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-16 bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (proposals.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No proposals submitted yet. Be the first to propose a session!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                <CardDescription>
                  Proposed by {proposal.profiles?.name} •{" "}
                  {new Date(proposal.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <VoteButton
                proposalId={proposal.id}
                initialVoteCount={proposal.vote_count}
                onVoteChange={(newCount) => handleVoteChange(proposal.id, newCount)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 leading-relaxed">{proposal.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {proposal.category && (
                <Badge variant="secondary" className={getCategoryColor(proposal.category)}>
                  {proposal.category}
                </Badge>
              )}
              <Badge variant="outline">{proposal.duration} min</Badge>
              <Badge variant="outline" className={getStatusColor(proposal.status)}>
                {proposal.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
