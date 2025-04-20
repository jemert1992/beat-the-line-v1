import { NextRequest, NextResponse } from 'next/server';
import SportsDataAPI from '@/lib/api/sportsdata';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint') || 'games';
  const season = searchParams.get('season') || '2025';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  try {
    let data;
    switch (endpoint) {
      case 'games':
        data = await SportsDataAPI.basketball.getGames(season);
        break;
      case 'standings':
        data = await SportsDataAPI.basketball.getStandings(season);
        break;
      case 'teams':
        data = await SportsDataAPI.basketball.getTeams();
        break;
      case 'players':
        data = await SportsDataAPI.basketball.getPlayers();
        break;
      case 'playerStats':
        data = await SportsDataAPI.basketball.getPlayerStats(season);
        break;
      case 'teamStats':
        data = await SportsDataAPI.basketball.getTeamStats(season);
        break;
      case 'odds':
        data = await SportsDataAPI.basketball.getOdds(date);
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Basketball API error:', error);
    return NextResponse.json({ error: 'Failed to fetch basketball data' }, { status: 500 });
  }
}
