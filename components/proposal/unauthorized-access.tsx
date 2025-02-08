// app/components/unauthorized-access.tsx
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { headers } from 'next/headers'

interface UnauthorizedAccessProps {
  title?: string
  message?: string
}

async function getRequestInfo() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || 'Unknown'
  const forwardedFor = headersList.get('x-forwarded-for')
  const clientIP = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown'
  
  return {
    userAgent,
    clientIP,
    timestamp: new Date().toISOString(),
  }
}

export async function UnauthorizedAccess({
  title = "Access Denied - Protected Content",
  message = "This proposal is protected by advanced security measures and can only be accessed by the intended recipient.",
}: UnauthorizedAccessProps) {
  const requestInfo = await getRequestInfo()
  
  // Log unauthorized access attempt (you can implement your logging logic here)
  console.log('Unauthorized access attempt:', requestInfo)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8">
        {/* Main Content Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-200 space-y-6">
          {/* Security Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-red-50 rounded-full border-2 border-red-200 animate-pulse">
              <Lock className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900">
            {title}
          </h1>

          {/* Security Alert */}
          <Alert variant="destructive" className="border-red-300">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Security Alert #{requestInfo.timestamp.slice(0,10)}</AlertTitle>
            <AlertDescription>
              Unauthorized access attempt detected and logged. Your IP address and device information have been recorded for security purposes.
            </AlertDescription>
          </Alert>

          {/* Security Measures */}
          {/* <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Active Security Protocols:</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Advanced encryption and access control systems</li>
              <li>• Real-time monitoring and threat detection</li>
              <li>• Automated security incident reporting</li>
              <li>• Compliance with GDPR and data protection regulations</li>
              <li>• Legal action protocols for unauthorized access</li>
            </ul>
          </div> */}

          {/* Warning Message */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-700 text-center font-medium">
              {message}
            </p>
            <p className="text-red-600 text-sm text-center mt-2">
              Access attempt from: {requestInfo.clientIP.replace(/[^.:, ]/g, '*')}
            </p>
          </div>

          {/* System Status */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>System Status</AlertTitle>
            <AlertDescription>
              This access attempt has been logged and will be reviewed by our security team.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild variant="outline" className="w-32">
              <Link href="/">Exit Securely</Link>
            </Button>
            <Button asChild variant="destructive" className="w-32">
              <Link href="/report-issue">Report Issue</Link>
            </Button>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="text-center text-xs space-y-2 text-gray-500">
          <p className="font-medium">Protected by myproposal.love Security™</p>
          <p>All unauthorized access attempts are logged and may be reported to relevant authorities.</p>
          <p>myproposal.love maintains strict compliance with GDPR, CCPA, and other applicable privacy laws.</p>
          <p>© {new Date().getFullYear()} myproposal.love - All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}