import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { NotificationSettings } from "./notification-settings"
// import { BillingSettings } from "./billing-settings"
// import { SecuritySettings } from "./security-settings"
// import { ApiSettings } from "./api-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        {/* <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger> */}
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <ProfileSettings />
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
      </TabsContent>
      {/* <TabsContent value="billing" className="space-y-4">
        <BillingSettings />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="api" className="space-y-4">
        <ApiSettings />
      </TabsContent> */}
    </Tabs>
  )
}
