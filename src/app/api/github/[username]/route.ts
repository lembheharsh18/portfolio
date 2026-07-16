import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params

  try {
    // Fetch user profile, repos, and events in parallel
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 300 }, // cache 5 min
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 300 },
      }),
      fetch(`https://api.github.com/users/${username}/events?per_page=100`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 300 },
      }),
    ])

    if (!userRes.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const [user, repos, events] = await Promise.all([
      userRes.json(),
      reposRes.json(),
      eventsRes.json(),
    ])

    // Get latest pushed repo
    const latestRepo = repos.length > 0 ? repos[0].name : null

    // Calculate yearly commits from push events
    const now = new Date()
    const yearStart = new Date(now.getFullYear(), 0, 1)

    // Count push events this year
    const pushEvents = Array.isArray(events)
      ? events.filter(
          (e: any) => e.type === 'PushEvent' && new Date(e.created_at) >= yearStart
        )
      : []

    // Sum up commits from push events (this is a sample, not the full year)
    let totalCommitsFromEvents = 0
    pushEvents.forEach((e: any) => {
      totalCommitsFromEvents += e.payload?.commits?.length || 0
    })

    // Build a contribution heatmap from events (last ~90 days from API)
    const heatmapMap: Record<string, number> = {}
    if (Array.isArray(events)) {
      events.forEach((e: any) => {
        if (e.type === 'PushEvent') {
          const date = new Date(e.created_at).toISOString().split('T')[0]
          heatmapMap[date] = (heatmapMap[date] || 0) + (e.payload?.commits?.length || 0)
        }
      })
    }

    // Build 15-week heatmap grid (latest 15 weeks)
    const weeks = 15
    const days = 7
    const heatmap: number[][] = []
    const today = new Date()
    const dayOfWeek = today.getDay()

    for (let w = weeks - 1; w >= 0; w--) {
      const week: number[] = []
      for (let d = 0; d < days; d++) {
        const daysAgo = w * 7 + (dayOfWeek - d)
        const date = new Date(today)
        date.setDate(today.getDate() - daysAgo)
        const key = date.toISOString().split('T')[0]
        const count = heatmapMap[key] || 0
        // Convert to intensity (0-4)
        const intensity = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4
        week.push(intensity)
      }
      heatmap.push(week)
    }

    // Estimate yearly total (GitHub events API only returns recent ~90 days, 300 events max)
    // Use public_repos count and average as a rough proxy, or use the events count
    const yearlyEstimate = Math.max(totalCommitsFromEvents, user.public_repos * 5)

    return NextResponse.json({
      username: user.login,
      name: user.name,
      avatar: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      bio: user.bio,
      latestRepo,
      yearlyCommits: yearlyEstimate,
      heatmap,
      totalCommitsFromEvents,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
