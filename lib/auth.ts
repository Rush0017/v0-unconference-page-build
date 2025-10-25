import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()
  return profile
}

export async function isOrganizer(userId: string) {
  const profile = await getUserProfile(userId)
  return profile?.role === "organizer" || profile?.role === "admin"
}

export async function isAdmin(userId: string) {
  const profile = await getUserProfile(userId)
  return profile?.role === "admin"
}
