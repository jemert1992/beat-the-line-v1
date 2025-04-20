'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Game {
  GameID: number
  Season: number
  Status: string
  DateTime: string
  AwayTeam: string
  HomeTeam: string
  AwayTeamScore: number
  HomeTeamScore: number
  Channel?: string
  Stadium?: string
  Period?: number
  TimeRemaining?: string
}

interface Standing {
  Season: number
  TeamID: number
  Key: string
  City: string
  Name: string
  Conference: string
  Division: string
  Wins: number
  Losses: number
  OvertimeLosses: number
  Points: number
  ConferenceRank: number
  DivisionRank: number
}

interface Odds {
  GameID: number
  AwayTeam: string
  HomeTeam: string
  PointSpread: number
  OverUnder: number
  AwayTeamMoneyLine: number
  HomeTeamMoneyLine: number
}

export default function HockeyPage() {
  const [activeTab, setActiveTab] = useState('games')
  const [games, setGames] = useState<Game[]>([])
  const [standings, setStandings] = useState<Standing[]>([])
  const [odds, setOdds] = useState<Odds[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      
      try {
        const response = await fetch(`/api/sports/hockey?endpoint=${activeTab}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const data = await response.json()
        
        switch (activeTab) {
          case 'games':
            setGames(data)
            break
          case 'standings':
            setStandings(data)
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
  }, [activeTab])

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
      case 'Final':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">Final</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderGameTime = (game: Game) => {
    if (game.Status === 'InProgress') {
      return `Period ${game.Period} - ${game.TimeRemaining}`
    }
    return formatDateTime(game.DateTime)
  }

  const renderGames = () => {
    if (loading) {
      return Array(3).fill(0).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Skeleton className="h-4 w-20 mx-auto mb-2" />
                <Skeleton className="h-6 w-12 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="h-4 w-8 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="h-4 w-20 mx-auto mb-2" />
                <Skeleton className="h-6 w-12 mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))
    }

    if (error) {
      return <div className="text-center text-red-500 my-8">{error}</div>
    }

    if (games.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No games available</div>
    }

    return games.map(game => (
      <Card key={game.GameID} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              {renderGameTime(game)}
            </div>
            <div>
              {getStatusBadge(game.Status)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-semibold">{game.AwayTeam}</div>
              <div className="text-2xl font-bold">{game.AwayTeamScore}</div>
            </div>
            <div className="text-center flex flex-col justify-center">
              <div className="text-xs uppercase text-muted-foreground mb-1">VS</div>
              <div className="text-xs text-muted-foreground">{game.Stadium}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{game.HomeTeam}</div>
              <div className="text-2xl font-bold">{game.HomeTeamScore}</div>
            </div>
          </div>
          {game.Channel && (
            <div className="mt-4 text-xs text-center text-muted-foreground">
              Watch on: {game.Channel}
            </div>
          )}
        </CardContent>
      </Card>
    ))
  }

  const renderStandings = () => {
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

    if (standings.length === 0) {
      return <div className="text-center text-muted-foreground my-8">No standings available</div>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">W</TableHead>
            <TableHead className="text-right">L</TableHead>
            <TableHead className="text-right">OTL</TableHead>
            <TableHead className="text-right">PTS</TableHead>
            <TableHead className="text-right">Conf</TableHead>
            <TableHead className="text-right">Div</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map(team => (
            <TableRow key={team.TeamID}>
              <TableCell className="font-medium">{team.City} {team.Name}</TableCell>
              <TableCell className="text-right">{team.Wins}</TableCell>
              <TableCell className="text-right">{team.Losses}</TableCell>
              <TableCell className="text-right">{team.OvertimeLosses}</TableCell>
              <TableCell className="text-right">{team.Points}</TableCell>
              <TableCell className="text-right">{team.ConferenceRank}</TableCell>
              <TableCell className="text-right">{team.DivisionRank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderOdds = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {Array(2).fill(0).map((_, i) => (
            <Card key={i} className="mb-4">
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
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

    return odds.map(game => (
      <Card key={game.GameID} className="mb-4">
        <CardContent className="pt-6">
          <div className="text-lg font-semibold mb-4">
            {game.AwayTeam} @ {game.HomeTeam}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-md p-3">
              <div className="text-sm text-muted-foreground mb-1">Puck Line</div>
              <div className="font-medium">
                {game.PointSpread > 0 ? '+' : ''}{game.PointSpread}
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-sm text-muted-foreground mb-1">Total</div>
              <div className="font-medium">O/U {game.OverUnder}</div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-sm text-muted-foreground mb-1">Moneyline</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Away:</span>{' '}
                  {game.AwayTeamMoneyLine > 0 ? '+' : ''}{game.AwayTeamMoneyLine}
                </div>
                <div>
                  <span className="text-muted-foreground">Home:</span>{' '}
                  {game.HomeTeamMoneyLine > 0 ? '+' : ''}{game.HomeTeamMoneyLine}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hockey</h1>
        <p className="text-muted-foreground">
          Live scores, standings, and betting odds for hockey games
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="odds">Betting Odds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="games" className="space-y-4">
          {renderGames()}
        </TabsContent>
        
        <TabsContent value="standings">
          {renderStandings()}
        </TabsContent>
        
        <TabsContent value="odds" className="space-y-4">
          {renderOdds()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
