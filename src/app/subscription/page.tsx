'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Check, Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Basic access with limited data',
    features: [
      'Delayed sports data (15-minute delay)',
      'Access to three sports of your choice',
      'Basic betting insights',
      'Limited historical data'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99/month',
    description: 'Full access to all features',
    features: [
      'Real-time sports data updates',
      'Access to all sports',
      'Advanced betting insights and trends',
      'Complete historical data',
      'Odds comparison across platforms',
      'Email alerts for betting opportunities'
    ]
  }
]

export default function Subscription() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (selectedPlan === 'premium') {
        // In a real application, you would redirect to Stripe checkout
        // For MVP, we'll simulate a successful subscription
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push('/subscription/success')
      } else {
        // Free plan doesn't require payment
        router.push('/subscription/success?plan=free')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Choose Your Subscription Plan</h1>
        <p className="text-muted-foreground">
          Select the plan that best fits your needs for sports betting insights
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <RadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <RadioGroupItem
                value={plan.id}
                id={plan.id}
                className="sr-only"
              />
              <Label
                htmlFor={plan.id}
                className="cursor-pointer"
              >
                <Card className={`h-full transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-primary ring-2 ring-primary' 
                    : 'hover:border-primary/50'
                }`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <div className="text-2xl font-bold text-foreground">{plan.price}</div>
                      <div className="text-sm mt-1">{plan.description}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex flex-col items-center gap-4">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? 'Processing...' : selectedPlan === 'free' ? 'Continue with Free Plan' : 'Subscribe to Premium'}
          </Button>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-1" />
            <span>You can upgrade or downgrade your plan at any time</span>
          </div>
        </div>
      </form>
    </div>
  )
}
