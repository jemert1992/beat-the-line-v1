'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <h1 className="text-4xl font-bold mb-6 text-center">Sports Betting Evaluation</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Real-time sports data and betting insights to help you make informed decisions
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl mb-12">
        {['Basketball', 'Baseball', 'Hockey', 'Tennis', 'Golf'].map((sport) => (
          <Card key={sport} className="p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">{sport}</h2>
            <p className="text-sm text-center text-muted-foreground mb-4">
              Live data, stats, and betting insights
            </p>
            <Button asChild className="w-full">
              <Link href={`/sports/${sport.toLowerCase()}`}>View {sport}</Link>
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Real-Time Data</h3>
            <p className="text-sm text-muted-foreground">
              Access up-to-the-minute stats, scores, and odds from major betting platforms
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Betting Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get valuable trends, head-to-head stats, and performance analytics
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Premium Features</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for advanced analytics and exclusive betting recommendations
            </p>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 flex gap-4">
        <Button asChild variant="default">
          <Link href="/register">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </main>
  )
}
