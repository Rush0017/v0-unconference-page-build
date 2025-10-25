import { Header } from "@/components/header"
import { EventPhaseContent } from "@/components/event-phase-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <EventPhaseContent />
      </main>
    </div>
  )
}
