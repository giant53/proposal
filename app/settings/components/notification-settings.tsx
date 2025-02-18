"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"


interface NotificationPreferences {
  email: boolean
  sms: boolean
  whatsapp: boolean
  proposalUpdates: boolean
  securityAlerts: boolean
  marketingEmails: boolean
}

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: true,
    whatsapp: true,
    proposalUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  async function handleSave() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/settings/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) throw new Error("Failed to update notification settings")

      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Notification Preferences</h2>
          <p className="text-sm text-gray-500">
            Manage how you receive notifications and updates.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Communication Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={preferences.email}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, email: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch
                  id="sms-notifications"
                  checked={preferences.sms}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, sms: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp-notifications">
                  WhatsApp Notifications
                </Label>
                <Switch
                  id="whatsapp-notifications"
                  checked={preferences.whatsapp}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, whatsapp: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="proposal-updates">Proposal Updates</Label>
                <Switch
                  id="proposal-updates"
                  checked={preferences.proposalUpdates}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      proposalUpdates: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <Switch
                  id="security-alerts"
                  checked={preferences.securityAlerts}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      securityAlerts: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <Switch
                  id="marketing-emails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      marketingEmails: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
