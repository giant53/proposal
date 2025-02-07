import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const isApiRoute = req.nextUrl.pathname.startsWith("/api")
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")

  // Allow auth routes
  if (isAuthRoute) {
    return NextResponse.next()
  }

  // Protect API routes
  if (isApiRoute && !req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}