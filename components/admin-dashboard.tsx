"use client"

import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    email: string
  }
}

interface RSVP {
  id: string
  status: string
  dietary_restrictions: string | null
  accessibility_needs: string | null
  created_at: string
  profiles: {
    name: string
    email: string
  }
}

interface EventConfig {
  key: string
  value: string
}

export function AdminDashboard() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [rsvps, setRSVPs] = useState<RSVP[]>([])
  const [config, setConfig] = useState<EventConfig[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Fetch proposals
      const { data: proposalsData } = await supabase
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
            name,
            email
          )
        `,
        )
        .order("created_at", { ascending: false })

      // Fetch RSVPs
      const { data: rsvpsData } = await supabase
        .from("rsvps")
        .select(
          `
          id,
          status,
          dietary_restrictions,
          accessibility_needs,
          created_at,
          profiles (
            name,
            email
          )
        `,
        )
        .order("created_at", { ascending: false })

      // Fetch event config
      const { data: configData } = await supabase.from("event_config").select("key, value").order("key")

      if (proposalsData) setProposals(proposalsData)
      if (rsvpsData) setRSVPs(rsvpsData)
      if (configData) setConfig(configData)
      setLoading(false)
    }

    fetchData()
  }, [supabase])

  const updateProposalStatus = async (proposalId: string, newStatus: string) => {
    const { error } = await supabase.from("proposals").update({ status: newStatus }).eq("id", proposalId)

    if (!error) {
      setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status: newStatus } : p)))
    }
  }

  const updateEventConfig = async (key: string, value: string) => {
    const { error } = await supabase.from("event_config").update({ value }).eq("key", key)

    if (!error) {
      setConfig((prev) => prev.map((c) => (c.key === key ? { ...c, value } : c)))
    }
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

  const getRSVPStatusColor = (status: string) => {
    switch (status) {
      case "attending":
        return "bg-green-500/10 text-green-600"
      case "not_attending":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-yellow-500/10 text-yellow-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  const rsvpStats = rsvps.reduce(
    (acc, rsvp) => {
      acc[rsvp.status as keyof typeof acc]++
      acc.total++
      return acc
    },
    { attending: 0, maybe: 0, not_attending: 0, total: 0 },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage proposals, RSVPs, and event configuration</p>
      </div>

      <Tabs defaultValue="proposals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proposals">Proposals ({proposals.length})</TabsTrigger>
          <TabsTrigger value="rsvps">RSVPs ({rsvps.length})</TabsTrigger>
          <TabsTrigger value="config">Event Config</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Management</CardTitle>
              <CardDescription>Review and manage session proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {proposal.profiles?.name} ({proposal.profiles?.email}) • {proposal.vote_count} votes
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Select
                          value={proposal.status}
                          onValueChange={(value) => updateProposalStatus(proposal.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {proposal.category && <span>Category: {proposal.category}</span>}
                      <span>Duration: {proposal.duration} min</span>
                      <span>Submitted: {new Date(proposal.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rsvps" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{rsvpStats.attending}</div>
                <div className="text-sm text-muted-foreground">Attending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{rsvpStats.maybe}</div>
                <div className="text-sm text-muted-foreground">Maybe</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{rsvpStats.not_attending}</div>
                <div className="text-sm text-muted-foreground">Not Attending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{rsvpStats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>RSVP Details</CardTitle>
              <CardDescription>Attendee information and special requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rsvps.map((rsvp) => (
                  <div key={rsvp.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{rsvp.profiles?.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({rsvp.profiles?.email})</span>
                      </div>
                      <Badge className={getRSVPStatusColor(rsvp.status)}>{rsvp.status}</Badge>
                    </div>
                    {rsvp.dietary_restrictions && (
                      <div className="text-sm">
                        <span className="font-medium">Dietary:</span> {rsvp.dietary_restrictions}
                      </div>
                    )}
                    {rsvp.accessibility_needs && (
                      <div className="text-sm">
                        <span className="font-medium">Accessibility:</span> {rsvp.accessibility_needs}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      RSVP: {new Date(rsvp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Configuration</CardTitle>
              <CardDescription>Manage event settings and phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {config.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.key.replace(/_/g, " ").toUpperCase()}</div>
                      <div className="text-sm text-muted-foreground">Current: {item.value}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.key === "event_phase" && (
                        <Select value={item.value} onValueChange={(value) => updateEventConfig(item.key, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre_event">Pre Event</SelectItem>
                            <SelectItem value="during_event">During Event</SelectItem>
                            <SelectItem value="post_event">Post Event</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      {(item.key.includes("enabled") || item.key === "rsvp_enabled") && (
                        <Select value={item.value} onValueChange={(value) => updateEventConfig(item.key, value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Enabled</SelectItem>
                            <SelectItem value="false">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
