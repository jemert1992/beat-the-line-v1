'use client'

import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SubscriptionSuccessContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'premium'
  
  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Subscription Successful!</CardTitle>
          <CardDescription>
            {plan === 'free' 
              ? 'You are now subscribed to the Free plan' 
              : 'You are now subscribed to the Premium plan'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            {plan === 'free'
              ? 'You now have access to basic sports data and betting insights.'
              : 'You now have access to real-time sports data and advanced betting insights.'}
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SubscriptionSuccess() {
  return (
    <Suspense fallback={
      <div className="container max-w-md py-10">
        <Card>
          <CardHeader className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-48 mx-auto mb-2 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-64 mx-auto bg-gray-200 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="text-center">
            <div className="h-4 w-3/4 mx-auto mb-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 w-32 mx-auto bg-gray-200 animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    }>
      <SubscriptionSuccessContent />
    </Suspense>
  )
}
