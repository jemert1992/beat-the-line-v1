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
        data = await SportsDataAPI.hockey.getGames(season);
        break;
      case 'standings':
        data = await SportsDataAPI.hockey.getStandings(season);
        break;
      case 'teams':
        data = await SportsDataAPI.hockey.getTeams();
        break;
      case 'players':
        data = await SportsDataAPI.hockey.getPlayers();
        break;
      case 'playerStats':
        data = await SportsDataAPI.hockey.getPlayerStats(season);
        break;
      case 'teamStats':
        data = await SportsDataAPI.hockey.getTeamStats(season);
        break;
      case 'odds':
        data = await SportsDataAPI.hockey.getOdds(date);
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Hockey API error:', error);
    return NextResponse.json({ error: 'Failed to fetch hockey data' }, { status: 500 });
  }
}
