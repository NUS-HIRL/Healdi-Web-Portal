import { UPSTREAM_BASE_URL } from '@/config/api'
import { NextResponse } from 'next/server'

export const GET = async (request: Request, context: unknown) => {
  const { params } = context as { params: Promise<{ userId: string }> }
  const { userId } = await params
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized: missing Authorization header' }, { status: 401 })
  }

  const upstreamUrl = `${UPSTREAM_BASE_URL}/v1/users/${encodeURIComponent(userId)}/goals`

  try {
    const res = await fetch(upstreamUrl, {
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-store',
    })

    const text = await res.text()
    const contentType = res.headers.get('content-type') || 'application/json'
    return new NextResponse(text, {
      status: res.status,
      headers: {
        'content-type': contentType,
      },
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to fetch goals from upstream', error: (err as Error).message },
      { status: 502 }
    )
  }
}


