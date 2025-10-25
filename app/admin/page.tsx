import { redirect } from "next/navigation"
import { getCurrentUser, getUserProfile } from "@/lib/auth"
import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getUserProfile(user.id)

  if (!profile || (profile.role !== "organizer" && profile.role !== "admin")) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <AdminDashboard />
      </main>
    </div>
  )
}
