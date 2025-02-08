// import UnsubscribeClient from "./client"

// export default function UnsubscribePage({
//   searchParams,
// }: {
//   searchParams: { email?: string | string[] }
// }) {
//   const email = Array.isArray(searchParams.email) 
//     ? searchParams.email[0] 
//     : searchParams.email

//   return <UnsubscribeClient email={email} />
// }

import React from 'react'

function UnsubscribePage() {
  return (
    <div>
      <h1>Unsubscribe Page</h1>
    </div>
  )
}

export default UnsubscribePage
