import { NextRequest, NextResponse } from 'next/server';
import SportsDataAPI from '@/lib/api/sportsdata';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint') || 'tournaments';
  const season = searchParams.get('season') || '2025';
  const tournamentId = searchParams.get('tournamentId') || '45678';

  try {
    let data;
    switch (endpoint) {
      case 'tournaments':
        data = await SportsDataAPI.golf.getTournaments(season);
        break;
      case 'leaderboard':
        data = await SportsDataAPI.golf.getLeaderboard(tournamentId);
        break;
      case 'players':
        data = await SportsDataAPI.golf.getPlayers();
        break;
      case 'playerStats':
        data = await SportsDataAPI.golf.getPlayerStats(season);
        break;
      case 'odds':
        data = await SportsDataAPI.golf.getOdds(tournamentId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Golf API error:', error);
    return NextResponse.json({ error: 'Failed to fetch golf data' }, { status: 500 });
  }
}
