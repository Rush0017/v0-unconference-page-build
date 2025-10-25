"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

interface VoteButtonProps {
  proposalId: string
  initialVoteCount: number
  onVoteChange?: (newCount: number) => void
}

export function VoteButton({ proposalId, initialVoteCount, onVoteChange }: VoteButtonProps) {
  const [user, setUser] = useState<User | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check if user has already voted on this proposal
        const { data } = await supabase
          .from("votes")
          .select("id")
          .eq("user_id", user.id)
          .eq("proposal_id", proposalId)
          .single()

        setHasVoted(!!data)
      }
      setLoading(false)
    }

    getUser()
  }, [supabase, proposalId])

  const handleVote = async () => {
    if (!user || submitting) return

    setSubmitting(true)

    try {
      if (hasVoted) {
        // Remove vote
        const { error } = await supabase.from("votes").delete().eq("user_id", user.id).eq("proposal_id", proposalId)

        if (error) throw error

        setHasVoted(false)
        const newCount = voteCount - 1
        setVoteCount(newCount)
        onVoteChange?.(newCount)
      } else {
        // Add vote
        const { error } = await supabase.from("votes").insert({
          user_id: user.id,
          proposal_id: proposalId,
        })

        if (error) throw error

        setHasVoted(true)
        const newCount = voteCount + 1
        setVoteCount(newCount)
        onVoteChange?.(newCount)
      }
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-muted animate-pulse rounded" />
        <div className="w-8 h-4 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-muted-foreground">{voteCount}</div>
        <div className="text-xs text-muted-foreground">votes</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant={hasVoted ? "default" : "outline"}
        size="sm"
        onClick={handleVote}
        disabled={submitting}
        className={`w-10 h-10 p-0 ${hasVoted ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}`}
      >
        <Heart className={`w-4 h-4 ${hasVoted ? "fill-current" : ""}`} />
      </Button>
      <div className="text-center">
        <div className="text-lg font-bold">{voteCount}</div>
        <div className="text-xs text-muted-foreground">votes</div>
      </div>
    </div>
  )
}
