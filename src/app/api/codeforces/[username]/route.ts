import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params

  try {
    const [infoRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${username}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
    ])

    if (!infoRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const infoData = await infoRes.json()
    const ratingData = await ratingRes.json()

    if (infoData.status !== 'OK' || !infoData.result?.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = infoData.result[0]
    const ratingHistory = ratingData.status === 'OK' ? ratingData.result : []

    return NextResponse.json({
      handle: user.handle,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      titlePhoto: user.titlePhoto,
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
      maxRank: user.maxRank,
      country: user.country,
      organization: user.organization,
      friendOfCount: user.friendOfCount,
      contribution: user.contribution,
      contestsParticipated: ratingHistory.length,
      ratingHistory: ratingHistory.map((r: any) => ({
        contestName: r.contestName,
        rank: r.rank,
        oldRating: r.oldRating,
        newRating: r.newRating,
        timestamp: r.ratingUpdateTimeSeconds,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Codeforces data' }, { status: 500 })
  }
}
