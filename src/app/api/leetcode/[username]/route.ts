import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params

  try {
    const [profileRes, solvedRes, contestRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`),
    ])

    if (!profileRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const [profile, solved, contest] = await Promise.all([
      profileRes.json(),
      solvedRes.json(),
      contestRes.json(),
    ])

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
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 })
  }
}
