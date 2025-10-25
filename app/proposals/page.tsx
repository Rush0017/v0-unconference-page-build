import { Header } from "@/components/header"
import { ProposalForm } from "@/components/proposal-form"
import { ProposalList } from "@/components/proposal-list"
import { VotingStats } from "@/components/voting-stats"

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light">Session Proposals</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Propose sessions, share ideas, and vote to help shape the BCH Unconference agenda.
            </p>
          </div>

          <VotingStats />

          <ProposalForm />

          <div className="space-y-6">
            <h2 className="text-2xl font-light">All Proposals</h2>
            <p className="text-muted-foreground">
              Vote for the sessions you&apos;d like to see. Proposals are sorted by popularity.
            </p>
            <ProposalList />
          </div>
        </div>
      </main>
    </div>
  )
}
