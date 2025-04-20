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
  Surface: string
  Status: string
}

interface Match {
  MatchID: number
  TournamentID: number
  Round: string
  Status: string
  DateTime: string
  Player1ID: number
  Player1: string
  Player2ID: number
  Player2: string
  Player1Sets?: number
  Player2Sets?: number
  Player1Set1?: number
  Player2Set1?: number
  Player1Set2?: number
  Player2Set2?: number
  Player1Set3?: number
  Player2Set3?: number
  Player1Set4?: number
  Player2Set4?: number
}

interface Odds {
  MatchID: number
  Player1: string
  Player2: string
  Player1Odds: number
  Player2Odds: number
}

export default function TennisPage() {
  const [activeTab, setActiveTab] = useState('tournaments')
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [odds, setOdds] = useState<Odds[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTournament, setSelectedTournament] = useState<string>('56789')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      
      try {
        let endpoint = activeTab
        let params = ''
        
        if (activeTab === 'matches') {
          endpoint = 'matches'
          params = `&tournamentId=${selectedTournament}`
        }
        
        const response = await fetch(`/api/sports/tennis?endpoint=${endpoint}${params}`)
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
          case 'matches':
            setMatches(data)
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

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
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
        onClick={() => {
          setSelectedTournament(tournament.TournamentID.toString())
          if (activeTab === 'tournaments') {
            setActiveTab('matches')
          }
        }}
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
            <div>Surface: {tournament.Surface}</div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  const renderMatches = () => {
    if (loading) {
      return Array(3).fill(0).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    if (matches.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No matches available</div>
    }

    return matches.map(match => (
      <Card key={match.MatchID} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              {match.Round} • {formatDateTime(match.DateTime)}
            </div>
            <div>
              {getStatusBadge(match.Status)}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{match.Player1}</div>
              <div className="flex space-x-2">
                {match.Player1Set1 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player1Set1 > match.Player2Set1! ? 'font-bold' : ''}`}>
                    {match.Player1Set1}
                  </span>
                )}
                {match.Player1Set2 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player1Set2 > match.Player2Set2! ? 'font-bold' : ''}`}>
                    {match.Player1Set2}
                  </span>
                )}
                {match.Player1Set3 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player1Set3 > match.Player2Set3! ? 'font-bold' : ''}`}>
                    {match.Player1Set3}
                  </span>
                )}
                {match.Player1Set4 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player1Set4 > match.Player2Set4! ? 'font-bold' : ''}`}>
                    {match.Player1Set4}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="font-semibold">{match.Player2}</div>
              <div className="flex space-x-2">
                {match.Player2Set1 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player2Set1 > match.Player1Set1! ? 'font-bold' : ''}`}>
                    {match.Player2Set1}
                  </span>
                )}
                {match.Player2Set2 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player2Set2 > match.Player1Set2! ? 'font-bold' : ''}`}>
                    {match.Player2Set2}
                  </span>
                )}
                {match.Player2Set3 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player2Set3 > match.Player1Set3! ? 'font-bold' : ''}`}>
                    {match.Player2Set3}
                  </span>
                )}
                {match.Player2Set4 !== undefined && (
                  <span className={`inline-block w-6 text-center ${match.Player2Set4 > match.Player1Set4! ? 'font-bold' : ''}`}>
                    {match.Player2Set4}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {match.Status === 'Completed' && match.Player1Sets !== undefined && (
            <div className="mt-4 text-sm text-center">
              Final: {match.Player1} {match.Player1Sets}-{match.Player2Sets} {match.Player2}
            </div>
          )}
        </CardContent>
      </Card>
    ))
  }

  const renderOdds = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    // Mock data for odds since our API client doesn't have this
    const mockOdds = [
      { MatchID: 67890, Player1: 'Novak Djokovic', Player2: 'Rafael Nadal', Player1Odds: -150, Player2Odds: 130 },
      { MatchID: 67891, Player1: 'Roger Federer', Player2: 'Andy Murray', Player1Odds: -200, Player2Odds: 170 },
      { MatchID: 67892, Player1: 'Serena Williams', Player2: 'Naomi Osaka', Player1Odds: -120, Player2Odds: 100 }
    ]

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Match</TableHead>
            <TableHead className="text-right">Player 1 Odds</TableHead>
            <TableHead className="text-right">Player 2 Odds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOdds.map(match => (
            <TableRow key={match.MatchID}>
              <TableCell>
                <div className="font-medium">{match.Player1}</div>
                <div className="text-muted-foreground">vs {match.Player2}</div>
              </TableCell>
              <TableCell className="text-right">
                {match.Player1Odds > 0 ? `+${match.Player1Odds}` : match.Player1Odds}
              </TableCell>
              <TableCell className="text-right">
                {match.Player2Odds > 0 ? `+${match.Player2Odds}` : match.Player2Odds}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tennis</h1>
        <p className="text-muted-foreground">
          Tournament information, match results, and betting odds for tennis
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
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="odds">Betting Odds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches">
              {renderMatches()}
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
