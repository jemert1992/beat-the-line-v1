import { NextRequest, NextResponse } from 'next/server';
import SportsDataAPI from '@/lib/api/sportsdata';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint') || 'tournaments';
  const season = searchParams.get('season') || '2025';
  const tournamentId = searchParams.get('tournamentId') || '56789';
  const matchId = searchParams.get('matchId') || '67890';

  try {
    let data;
    switch (endpoint) {
      case 'tournaments':
        data = await SportsDataAPI.tennis.getTournaments(season);
        break;
      case 'matches':
        data = await SportsDataAPI.tennis.getMatches(tournamentId);
        break;
      case 'players':
        data = await SportsDataAPI.tennis.getPlayers();
        break;
      case 'playerStats':
        data = await SportsDataAPI.tennis.getPlayerStats(season);
        break;
      case 'odds':
        data = await SportsDataAPI.tennis.getOdds(matchId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Tennis API error:', error);
    return NextResponse.json({ error: 'Failed to fetch tennis data' }, { status: 500 });
  }
}
