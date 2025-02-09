import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Invalid email address' }, 
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security, return same response whether email exists or not
      return NextResponse.json(
        { message: 'If an account exists, a password reset link will be sent' }, 
        { status: 200 }
      );
    }

    // Generate a secure reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Create or update reset token
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Send password reset email
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    
    const { error } = await resend.emails.send({
      from: 'MyProposal <noreply@myproposal.love>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f3;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #d8315b; text-align: center;">Reset Your Password</h2>
            <p style="color: #333;">You have requested to reset your password for MyProposal. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="
                display: inline-block;
                background-color: #d8315b;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
              ">Reset Password</a>
            </div>
            <p style="color: #666; font-size: 12px; text-align: center;">
              This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json(
        { message: 'Failed to send reset email' }, 
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Password reset link sent' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
