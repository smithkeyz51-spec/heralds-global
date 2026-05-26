import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Login required' }, { status: 401 })
    const { propertyId, checkIn, checkOut, guests, notes } = await req.json()
    if (!propertyId || !checkIn || !checkOut) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const property = await prisma.property.findUnique({ where: { id: propertyId } })
    if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    const booking = await prisma.booking.create({
      data: {
        userId: (session.user as any).id,
        propertyId, guests: guests ?? 1,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice: property.price * nights,
        notes,
      },
    })
    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Login required' }, { status: 401 })
    const bookings = await prisma.booking.findMany({
      where: { userId: (session.user as any).id },
      include: { property: { select: { title: true, location: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ bookings })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
