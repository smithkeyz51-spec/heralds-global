import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cars = await prisma.car.findMany({
      where: {
        available: true,
        ...(searchParams.get('featured') === 'true' ? { featured: true } : {}),
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json({ cars })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
