'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Tournament {
  TournamentID: number
  Name: string
  StartDate: string
  EndDate: string
  Location: string
  Purse: number
  Status: string
}

interface LeaderboardEntry {
  TournamentID: number
  PlayerID: number
  Name: string
  Position: number
  Score: number
  Round1: number
  Round2: number
  Round3: number
  Round4: number
  Total: number
}

interface Odds {
  PlayerID: number
  Name: string
  Odds: number
  TournamentID: number
}

export default function GolfPage() {
  const [activeTab, setActiveTab] = useState('tournaments')
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [odds, setOdds] = useState<Odds[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTournament, setSelectedTournament] = useState<string>('45678')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      
      try {
        let endpoint = activeTab
        let params = ''
        
        if (activeTab === 'leaderboard') {
          params = `&tournamentId=${selectedTournament}`
        } else if (activeTab === 'odds') {
          params = `&tournamentId=${selectedTournament}`
        }
        
        const response = await fetch(`/api/sports/golf?endpoint=${endpoint}${params}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const data = await response.json()
        
        switch (activeTab) {
          case 'tournaments':
            setTournaments(data)
            if (data.length > 0 && !selectedTournament) {
              setSelectedTournament(data[0].TournamentID.toString())
            }
            break
          case 'leaderboard':
            setLeaderboard(data)
            break
          case 'odds':
            setOdds(data)
            break
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [activeTab, selectedTournament])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline">Scheduled</Badge>
      case 'InProgress':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Live</Badge>
      case 'Completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderTournaments = () => {
    if (loading) {
      return Array(2).fill(0).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    if (tournaments.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No tournaments available</div>
    }

    return tournaments.map(tournament => (
      <Card 
        key={tournament.TournamentID} 
        className={`mb-4 cursor-pointer hover:border-primary transition-colors ${
          selectedTournament === tournament.TournamentID.toString() ? 'border-primary' : ''
        }`}
        onClick={() => setSelectedTournament(tournament.TournamentID.toString())}
      >
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold">{tournament.Name}</div>
            <div>
              {getStatusBadge(tournament.Status)}
            </div>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>{tournament.Location}</div>
            <div>{formatDate(tournament.StartDate)} - {formatDate(tournament.EndDate)}</div>
            <div>Purse: {formatMoney(tournament.Purse)}</div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  const renderLeaderboard = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    if (leaderboard.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No leaderboard available</div>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pos</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">R1</TableHead>
            <TableHead className="text-right">R2</TableHead>
            <TableHead className="text-right">R3</TableHead>
            <TableHead className="text-right">R4</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">To Par</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map(entry => (
            <TableRow key={entry.PlayerID}>
              <TableCell>{entry.Position}</TableCell>
              <TableCell className="font-medium">{entry.Name}</TableCell>
              <TableCell className="text-right">{entry.Round1}</TableCell>
              <TableCell className="text-right">{entry.Round2}</TableCell>
              <TableCell className="text-right">{entry.Round3}</TableCell>
              <TableCell className="text-right">{entry.Round4}</TableCell>
              <TableCell className="text-right">{entry.Total}</TableCell>
              <TableCell className="text-right font-semibold">
                {entry.Score > 0 ? `+${entry.Score}` : entry.Score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderOdds = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    if (odds.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No odds available</div>
    }

    // Mock data for odds since our API client doesn't have this
    const mockOdds = [
      { PlayerID: 30, Name: 'Tiger Woods', Odds: 800 },
      { PlayerID: 31, Name: 'Rory McIlroy', Odds: 1200 },
      { PlayerID: 32, Name: 'Jordan Spieth', Odds: 1500 },
      { PlayerID: 33, Name: 'Dustin Johnson', Odds: 1000 },
      { PlayerID: 34, Name: 'Brooks Koepka', Odds: 1400 },
    ]

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Odds</TableHead>
            <TableHead className="text-right">Implied Probability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOdds.map(player => {
            const impliedProbability = player.Odds > 0 
              ? (100 / (player.Odds + 100) * 100).toFixed(1)
              : (Math.abs(player.Odds) / (Math.abs(player.Odds) + 100) * 100).toFixed(1)
            
            return (
              <TableRow key={player.PlayerID}>
                <TableCell className="font-medium">{player.Name}</TableCell>
                <TableCell className="text-right">
                  {player.Odds > 0 ? `+${player.Odds}` : player.Odds}
                </TableCell>
                <TableCell className="text-right">{impliedProbability}%</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Golf</h1>
        <p className="text-muted-foreground">
          Tournament information, leaderboards, and betting odds for golf
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Tournaments</h2>
          {renderTournaments()}
        </div>
        
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="odds">Betting Odds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leaderboard">
              {renderLeaderboard()}
            </TabsContent>
            
            <TabsContent value="odds">
              {renderOdds()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
