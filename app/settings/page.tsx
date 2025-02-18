import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SettingsTabs } from "./components/settings-tabs"

export default async function SettingsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
        <SettingsTabs />
      </div>
    </div>
  )
}
