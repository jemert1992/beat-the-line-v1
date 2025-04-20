// This file contains the API client for SportsDataIO
// For the MVP, we'll use mock data but structure it as if we're calling the real API

// API key would normally be stored in environment variables
const API_KEY = 'mock_api_key';
const BASE_URL = 'https://api.sportsdata.io/v3';

// Sport-specific endpoints
const ENDPOINTS = {
  basketball: {
    games: '/nba/scores/json/Games/{season}',
    standings: '/nba/scores/json/Standings/{season}',
    teams: '/nba/scores/json/AllTeams',
    players: '/nba/scores/json/Players',
    playerStats: '/nba/stats/json/PlayerSeasonStats/{season}',
    teamStats: '/nba/stats/json/TeamSeasonStats/{season}',
    odds: '/nba/odds/json/GameOddsByDate/{date}'
  },
  baseball: {
    games: '/mlb/scores/json/Games/{season}',
    standings: '/mlb/scores/json/Standings/{season}',
    teams: '/mlb/scores/json/AllTeams',
    players: '/mlb/scores/json/Players',
    playerStats: '/mlb/stats/json/PlayerSeasonStats/{season}',
    teamStats: '/mlb/stats/json/TeamSeasonStats/{season}',
    odds: '/mlb/odds/json/GameOddsByDate/{date}'
  },
  hockey: {
    games: '/nhl/scores/json/Games/{season}',
    standings: '/nhl/scores/json/Standings/{season}',
    teams: '/nhl/scores/json/AllTeams',
    players: '/nhl/scores/json/Players',
    playerStats: '/nhl/stats/json/PlayerSeasonStats/{season}',
    teamStats: '/nhl/stats/json/TeamSeasonStats/{season}',
    odds: '/nhl/odds/json/GameOddsByDate/{date}'
  },
  golf: {
    tournaments: '/golf/scores/json/Tournaments/{season}',
    leaderboard: '/golf/scores/json/Leaderboard/{tournamentId}',
    players: '/golf/scores/json/Players',
    playerStats: '/golf/stats/json/PlayerSeasonStats/{season}',
    odds: '/golf/odds/json/TournamentOdds/{tournamentId}'
  },
  tennis: {
    tournaments: '/tennis/scores/json/Tournaments/{season}',
    matches: '/tennis/scores/json/Matches/{tournamentId}',
    players: '/tennis/scores/json/Players',
    playerStats: '/tennis/stats/json/PlayerSeasonStats/{season}',
    odds: '/tennis/odds/json/MatchOdds/{matchId}'
  }
};

// Helper function to build API URL
const buildUrl = (sport: string, endpoint: string, params: Record<string, string>) => {
  let url = `${BASE_URL}${ENDPOINTS[sport][endpoint]}`;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  });
  
  // Add API key
  url += `?key=${API_KEY}`;
  
  return url;
};

// Generic fetch function with error handling
const fetchFromApi = async (url: string) => {
  try {
    // For MVP, we'll return mock data instead of making actual API calls
    // In a real implementation, this would be:
    // const response = await fetch(url);
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // return await response.json();
    
    // Instead, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockData(url);
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Mock data function based on the URL
const getMockData = (url: string) => {
  // Extract sport and endpoint from URL
  const sportMatch = url.match(/\/v3\/([^\/]+)/);
  const endpointMatch = url.match(/\/json\/([^\/]+)/);
  
  if (!sportMatch || !endpointMatch) {
    return { error: 'Invalid URL' };
  }
  
  const sport = sportMatch[1];
  const endpoint = endpointMatch[1];
  
  // Return appropriate mock data based on sport and endpoint
  return MOCK_DATA[sport]?.[endpoint] || { message: 'No mock data available' };
};

// Main API client object
const SportsDataAPI = {
  basketball: {
    getGames: (season: string) => 
      fetchFromApi(buildUrl('basketball', 'games', { season })),
    getStandings: (season: string) => 
      fetchFromApi(buildUrl('basketball', 'standings', { season })),
    getTeams: () => 
      fetchFromApi(buildUrl('basketball', 'teams', {})),
    getPlayers: () => 
      fetchFromApi(buildUrl('basketball', 'players', {})),
    getPlayerStats: (season: string) => 
      fetchFromApi(buildUrl('basketball', 'playerStats', { season })),
    getTeamStats: (season: string) => 
      fetchFromApi(buildUrl('basketball', 'teamStats', { season })),
    getOdds: (date: string) => 
      fetchFromApi(buildUrl('basketball', 'odds', { date }))
  },
  baseball: {
    getGames: (season: string) => 
      fetchFromApi(buildUrl('baseball', 'games', { season })),
    getStandings: (season: string) => 
      fetchFromApi(buildUrl('baseball', 'standings', { season })),
    getTeams: () => 
      fetchFromApi(buildUrl('baseball', 'teams', {})),
    getPlayers: () => 
      fetchFromApi(buildUrl('baseball', 'players', {})),
    getPlayerStats: (season: string) => 
      fetchFromApi(buildUrl('baseball', 'playerStats', { season })),
    getTeamStats: (season: string) => 
      fetchFromApi(buildUrl('baseball', 'teamStats', { season })),
    getOdds: (date: string) => 
      fetchFromApi(buildUrl('baseball', 'odds', { date }))
  },
  hockey: {
    getGames: (season: string) => 
      fetchFromApi(buildUrl('hockey', 'games', { season })),
    getStandings: (season: string) => 
      fetchFromApi(buildUrl('hockey', 'standings', { season })),
    getTeams: () => 
      fetchFromApi(buildUrl('hockey', 'teams', {})),
    getPlayers: () => 
      fetchFromApi(buildUrl('hockey', 'players', {})),
    getPlayerStats: (season: string) => 
      fetchFromApi(buildUrl('hockey', 'playerStats', { season })),
    getTeamStats: (season: string) => 
      fetchFromApi(buildUrl('hockey', 'teamStats', { season })),
    getOdds: (date: string) => 
      fetchFromApi(buildUrl('hockey', 'odds', { date }))
  },
  golf: {
    getTournaments: (season: string) => 
      fetchFromApi(buildUrl('golf', 'tournaments', { season })),
    getLeaderboard: (tournamentId: string) => 
      fetchFromApi(buildUrl('golf', 'leaderboard', { tournamentId })),
    getPlayers: () => 
      fetchFromApi(buildUrl('golf', 'players', {})),
    getPlayerStats: (season: string) => 
      fetchFromApi(buildUrl('golf', 'playerStats', { season })),
    getOdds: (tournamentId: string) => 
      fetchFromApi(buildUrl('golf', 'odds', { tournamentId }))
  },
  tennis: {
    getTournaments: (season: string) => 
      fetchFromApi(buildUrl('tennis', 'tournaments', { season })),
    getMatches: (tournamentId: string) => 
      fetchFromApi(buildUrl('tennis', 'matches', { tournamentId })),
    getPlayers: () => 
      fetchFromApi(buildUrl('tennis', 'players', {})),
    getPlayerStats: (season: string) => 
      fetchFromApi(buildUrl('tennis', 'playerStats', { season })),
    getOdds: (matchId: string) => 
      fetchFromApi(buildUrl('tennis', 'odds', { matchId }))
  }
};

// Mock data for the MVP
const MOCK_DATA = {
  nba: {
    Games: [
      {
        GameID: 12345,
        Season: 2025,
        Status: 'Scheduled',
        DateTime: '2025-04-25T19:30:00',
        AwayTeam: 'LAL',
        HomeTeam: 'BOS',
        AwayTeamScore: 0,
        HomeTeamScore: 0,
        Channel: 'ESPN',
        Stadium: 'TD Garden'
      },
      {
        GameID: 12346,
        Season: 2025,
        Status: 'InProgress',
        DateTime: '2025-04-20T15:00:00',
        AwayTeam: 'GSW',
        HomeTeam: 'MIA',
        AwayTeamScore: 87,
        HomeTeamScore: 92,
        Quarter: '4',
        TimeRemainingMinutes: 8,
        TimeRemainingSeconds: 24,
        Channel: 'ABC',
        Stadium: 'FTX Arena'
      },
      {
        GameID: 12347,
        Season: 2025,
        Status: 'Final',
        DateTime: '2025-04-19T20:00:00',
        AwayTeam: 'BKN',
        HomeTeam: 'PHI',
        AwayTeamScore: 105,
        HomeTeamScore: 112,
        Channel: 'TNT',
        Stadium: 'Wells Fargo Center'
      }
    ],
    Standings: [
      {
        Season: 2025,
        TeamID: 1,
        Key: 'BOS',
        City: 'Boston',
        Name: 'Celtics',
        Conference: 'Eastern',
        Division: 'Atlantic',
        Wins: 58,
        Losses: 24,
        Percentage: 0.707,
        ConferenceRank: 1,
        DivisionRank: 1
      },
      {
        Season: 2025,
        TeamID: 2,
        Key: 'MIA',
        City: 'Miami',
        Name: 'Heat',
        Conference: 'Eastern',
        Division: 'Southeast',
        Wins: 52,
        Losses: 30,
        Percentage: 0.634,
        ConferenceRank: 2,
        DivisionRank: 1
      },
      {
        Season: 2025,
        TeamID: 3,
        Key: 'LAL',
        City: 'Los Angeles',
        Name: 'Lakers',
        Conference: 'Western',
        Division: 'Pacific',
        Wins: 54,
        Losses: 28,
        Percentage: 0.659,
        ConferenceRank: 1,
        DivisionRank: 1
      }
    ],
    AllTeams: [
      {
        TeamID: 1,
        Key: 'BOS',
        City: 'Boston',
        Name: 'Celtics',
        Conference: 'Eastern',
        Division: 'Atlantic',
        PrimaryColor: '008348',
        SecondaryColor: 'FFFFFF',
        WikipediaLogoUrl: 'https://example.com/celtics.png'
      },
      {
        TeamID: 2,
        Key: 'MIA',
        City: 'Miami',
        Name: 'Heat',
        Conference: 'Eastern',
        Division: 'Southeast',
        PrimaryColor: '98002E',
        SecondaryColor: 'F9A01B',
        WikipediaLogoUrl: 'https://example.com/heat.png'
      },
      {
        TeamID: 3,
        Key: 'LAL',
        City: 'Los Angeles',
        Name: 'Lakers',
        Conference: 'Western',
        Division: 'Pacific',
        PrimaryColor: '552583',
        SecondaryColor: 'FDB927',
        WikipediaLogoUrl: 'https://example.com/lakers.png'
      }
    ],
    GameOddsByDate: [
      {
        GameID: 12345,
        AwayTeam: 'LAL',
        HomeTeam: 'BOS',
        PointSpread: -3.5,
        OverUnder: 218.5,
        AwayTeamMoneyLine: 165,
        HomeTeamMoneyLine: -185
      },
      {
        GameID: 12346,
        AwayTeam: 'GSW',
        HomeTeam: 'MIA',
        PointSpread: 1.5,
        OverUnder: 224.0,
        AwayTeamMoneyLine: -120,
        HomeTeamMoneyLine: 100
      }
    ]
  },
  mlb: {
    Games: [
      {
        GameID: 23456,
        Season: 2025,
        Status: 'Scheduled',
        DateTime: '2025-04-25T19:05:00',
        AwayTeam: 'NYY',
        HomeTeam: 'BOS',
        AwayTeamScore: 0,
        HomeTeamScore: 0,
        Channel: 'ESPN',
        Stadium: 'Fenway Park'
      },
      {
        GameID: 23457,
        Season: 2025,
        Status: 'InProgress',
        DateTime: '2025-04-20T13:10:00',
        AwayTeam: 'LAD',
        HomeTeam: 'SFG',
        AwayTeamScore: 3,
        HomeTeamScore: 2,
        Inning: 7,
        InningHalf: 'T',
        Channel: 'FOX',
        Stadium: 'Oracle Park'
      },
      {
        GameID: 23458,
        Season: 2025,
        Status: 'Final',
        DateTime: '2025-04-19T19:10:00',
        AwayTeam: 'HOU',
        HomeTeam: 'TEX',
        AwayTeamScore: 5,
        HomeTeamScore: 3,
        Channel: 'MLB Network',
        Stadium: 'Globe Life Field'
      }
    ],
    Standings: [
      {
        Season: 2025,
        TeamID: 10,
        Key: 'NYY',
        City: 'New York',
        Name: 'Yankees',
        League: 'AL',
        Division: 'East',
        Wins: 92,
        Losses: 70,
        Percentage: 0.568,
        DivisionRank: 1
      },
      {
        Season: 2025,
        TeamID: 11,
        Key: 'HOU',
        City: 'Houston',
        Name: 'Astros',
        League: 'AL',
        Division: 'West',
        Wins: 95,
        Losses: 67,
        Percentage: 0.586,
        DivisionRank: 1
      },
      {
        Season: 2025,
        TeamID: 12,
        Key: 'LAD',
        City: 'Los Angeles',
        Name: 'Dodgers',
        League: 'NL',
        Division: 'West',
        Wins: 98,
        Losses: 64,
        Percentage: 0.605,
        DivisionRank: 1
      }
    ]
  },
  nhl: {
    Games: [
      {
        GameID: 34567,
        Season: 2025,
        Status: 'Scheduled',
        DateTime: '2025-04-25T19:00:00',
        AwayTeam: 'BOS',
        HomeTeam: 'TOR',
        AwayTeamScore: 0,
        HomeTeamScore: 0,
        Channel: 'ESPN',
        Stadium: 'Scotiabank Arena'
      },
      {
        GameID: 34568,
        Season: 2025,
        Status: 'InProgress',
        DateTime: '2025-04-20T15:30:00',
        AwayTeam: 'PIT',
        HomeTeam: 'WSH',
        AwayTeamScore: 2,
        HomeTeamScore: 3,
        Period: 3,
        TimeRemaining: '08:45',
        Channel: 'NBC',
        Stadium: 'Capital One Arena'
      },
      {
        GameID: 34569,
        Season: 2025,
        Status: 'Final',
        DateTime: '2025-04-19T20:00:00',
        AwayTeam: 'VGK',
        HomeTeam: 'LAK',
        AwayTeamScore: 4,
        HomeTeamScore: 2,
        Channel: 'NHL Network',
        Stadium: 'Crypto.com Arena'
      }
    ],
    Standings: [
      {
        Season: 2025,
        TeamID: 20,
        Key: 'BOS',
        City: 'Boston',
        Name: 'Bruins',
        Conference: 'Eastern',
        Division: 'Atlantic',
        Wins: 52,
        Losses: 24,
        OvertimeLosses: 6,
        Points: 110,
        ConferenceRank: 1,
        DivisionRank: 1
      },
      {
        Season: 2025,
        TeamID: 21,
        Key: 'VGK',
        City: 'Vegas',
        Name: 'Golden Knights',
        Conference: 'Western',
        Division: 'Pacific',
        Wins: 49,
        Losses: 27,
        OvertimeLosses: 6,
        Points: 104,
        ConferenceRank: 1,
        DivisionRank: 1
      }
    ]
  },
  golf: {
    Tournaments: [
      {
        TournamentID: 45678,
        Name: 'The Masters',
        StartDate: '2025-04-10',
        EndDate: '2025-04-13',
        Location: 'Augusta National Golf Club',
        Purse: 15000000,
        Status: 'Scheduled'
      },
      {
        TournamentID: 45679,
        Name: 'PGA Championship',
        StartDate: '2025-05-15',
        EndDate: '2025-05-18',
        Location: 'Valhalla Golf Club',
        Purse: 15000000,
        Status: 'Scheduled'
      }
    ],
    Leaderboard: [
      {
        TournamentID: 45678,
        PlayerID: 30,
        Name: 'Tiger Woods',
        Position: 1,
        Score: -12,
        Round1: 68,
        Round2: 66,
        Round3: 67,
        Round4: 70,
        Total: 271
      },
      {
        TournamentID: 45678,
        PlayerID: 31,
        Name: 'Rory McIlroy',
        Position: 2,
        Score: -10,
        Round1: 69,
        Round2: 68,
        Round3: 66,
        Round4: 71,
        Total: 273
      }
    ]
  },
  tennis: {
    Tournaments: [
      {
        TournamentID: 56789,
        Name: 'Wimbledon',
        StartDate: '2025-06-28',
        EndDate: '2025-07-11',
        Location: 'All England Lawn Tennis and Croquet Club',
        Surface: 'Grass',
        Status: 'Scheduled'
      },
      {
        TournamentID: 56790,
        Name: 'US Open',
        StartDate: '2025-08-25',
        EndDate: '2025-09-07',
        Location: 'USTA Billie Jean King National Tennis Center',
        Surface: 'Hard',
        Status: 'Scheduled'
      }
    ],
    Matches: [
      {
        MatchID: 67890,
        TournamentID: 56789,
        Round: 'Final',
        Status: 'Scheduled',
        DateTime: '2025-07-11T14:00:00',
        Player1ID: 40,
        Player1: 'Novak Djokovic',
        Player2ID: 41,
        Player2: 'Rafael Nadal'
      },
      {
        MatchID: 67891,
        TournamentID: 56789,
        Round: 'Semi-Final',
        Status: 'Completed',
        DateTime: '2025-07-09T14:00:00',
        Player1ID: 40,
        Player1: 'Novak Djokovic',
        Player2ID: 42,
        Player2: 'Roger Federer',
        Player1Sets: 3,
        Player2Sets: 1,
        Player1Set1: 6,
        Player2Set1: 4,
        Player1Set2: 7,
        Player2Set2: 6,
        Player1Set3: 6,
        Player2Set3: 3,
        Player1Set4: 6,
        Player2Set4: 4
      }
    ]
  }
};

export default SportsDataAPI;
