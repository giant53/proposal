// import { auth } from "@/auth"
// import { PricingCards } from "@/components/pricing/pricing-cards"
// import { PricingHeader } from "@/components/pricing/pricing-header"
// import { UpgradePrompt } from "@/components/pricing/upgrade-prompt"
// import { prisma } from "@/prisma"

// export default async function PricingPage() {
//   const session = await auth()
//   const user = session?.user ? await prisma.user.findUnique({
//     where: { id: session.user.id },
//     select: {
//       subscriptionTier: true,
//       subscriptionStatus: true,
//       remainingCredits: true,
//       currentPeriodEnd: true
//     }
//   }) : null
  
//   const newUser = {
//     ...user,
//     subscriptionTier: "FREE",
//     subscriptionStatus: "ACTIVE",
//     remainingCredits: 1
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="container max-w-7xl mx-auto px-4 py-16">
//         <PricingHeader />
//         <PricingCards 
//           user={newUser} 
//           plans={[
//             {
//               tier: "FREE",
//               name: "Free",
//               description: "Perfect for trying out our proposal creation",
//               price: 0,
//               interval: "yearly",
//               features: [
//                 "1 Proposal Credit per Year",
//                 "Basic AI Model",
//                 "Email Support",
//                 "Basic Templates",
//                 "7-day Proposal Expiry"
//               ],
//               credits: 1,
//               highlight: false
//             },
//             {
//               tier: "PREMIUM",
//               name: "Premium",
//               description: "For those serious about their proposal",
//               price: 7.77,
//               interval: "monthly",
//               features: [
//                 "7 Proposal Credits Monthly",
//                 "All AI Models",
//                 "Priority Support",
//                 "Premium Templates",
//                 "Custom Expiry Dates",
//                 "Analytics Dashboard",
//                 "Customizable Branding"
//               ],
//               credits: 7,
//               highlight: true
//             },
//             {
//               tier: "YEARLY",
//               name: "Lifetime",
//               description: "One-time purchase for lifetime access",
//               price: 100,
//               interval: "lifetime",
//               features: [
//                 "7 Proposal Credits Monthly",
//                 "All Premium Features",
//                 "VIP Support",
//                 "Early Access to New Features",
//                 "Personal Success Manager",
//                 "Custom AI Model Training",
//                 "API Access"
//               ],
//               credits: 7,
//               highlight: false
//             }
//           ]}
//         />
//       </div>
//       {user?.remainingCredits === 0 && user?.subscriptionTier === "FREE" && (
//         <UpgradePrompt />
//       )}
//     </div>
//   )
// }


import React from 'react'

function PricingPage() {
  return (
   <section>
     We are building this page, and so it will be available to you. Thanks for reading.
   </section>
  )
}

export default PricingPage

