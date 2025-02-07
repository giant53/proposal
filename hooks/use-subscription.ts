import { create } from "zustand"

interface SubscriptionStore {
  isUpgradeModalOpen: boolean
  setUpgradeModalOpen: (open: boolean) => void
  showUpgradeModal: () => void
}

export const useSubscription = create<SubscriptionStore>((set) => ({
  isUpgradeModalOpen: false,
  setUpgradeModalOpen: (open) => set({ isUpgradeModalOpen: open }),
  showUpgradeModal: () => set({ isUpgradeModalOpen: true })
}))
