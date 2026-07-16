import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params

  try {
    const [profileRes, solvedRes, contestRes, recentRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/submission?limit=5`),
    ])

    if (!profileRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const [profile, solved, contest, recent] = await Promise.all([
      profileRes.json(),
      solvedRes.json(),
      contestRes.json(),
      recentRes.ok ? recentRes.json() : { submission: [] },
    ])

    // Parse recent submissions
    const recentSubmissions = (recent.submission || [])
      .filter((s: any) => s.statusDisplay === 'Accepted')
      .slice(0, 5)
      .map((s: any) => ({
        title: s.title,
        timestamp: s.timestamp ? parseInt(s.timestamp) : null,
        lang: s.lang,
      }))

    return NextResponse.json({
      username: profile.username,
      name: profile.name,
      avatar: profile.avatar,
      ranking: profile.ranking,
      reputation: profile.reputation,
      totalSolved: solved.solvedProblem,
      easySolved: solved.easySolved,
      mediumSolved: solved.mediumSolved,
      hardSolved: solved.hardSolved,
      totalSubmissions: solved.totalSubmissionNum,
      acceptanceSubmissions: solved.acSubmissionNum,
      contestRating: Math.round(contest.contestRating || 0),
      contestAttend: contest.contestAttend,
      contestGlobalRanking: contest.contestGlobalRanking,
      contestTopPercentage: contest.contestTopPercentage,
      contestBadge: contest.contestBadges?.name || null,
      contestHistory: (contest.contestParticipation || []).map((c: any) => ({
        rating: Math.round(c.rating),
        ranking: c.ranking,
        title: c.contest.title,
        timestamp: c.contest.startTime,
        problemsSolved: c.problemsSolved,
        totalProblems: c.totalProblems,
      })),
      recentSubmissions,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 })
  }
}
