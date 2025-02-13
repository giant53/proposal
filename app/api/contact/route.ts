import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const body = await request.json();

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'MyProposal Contact Form <contact@myproposal.love>',
      to: ['abhinandanverma551@gmail.com'],
      subject: `New Contact Form Submission: ${body.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Subject:</strong> ${body.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        </div>
      `
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
