import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, sector } = await req.json()
    if (!name || !email || !message) return NextResponse.json({ error: 'Name, email and message required' }, { status: 400 })

    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      })
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'heraldsglobal@gmail.com',
        subject: `[TheHeraldsGlobal] New ${sector || 'General'} Enquiry from ${name}`,
        html: `<div style="font-family:monospace;padding:20px;background:#0A0A0A;color:#F5F5F0;border-radius:8px">
          <h2 style="color:#C9A96E">New Enquiry — TheHeraldsGlobal</h2>
          <p><strong>Sector:</strong> ${sector}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#1A1A1A;padding:12px;border-radius:4px">${message}</p>
        </div>`,
      })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
