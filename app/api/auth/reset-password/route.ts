import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, password, confirmPassword } = await req.json();

    // Validate input
    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'All fields are required' }, 
        { status: 400 }
      );
    }

    // Check password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' }, 
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' }, 
        { status: 400 }
      );
    }

    // Find valid reset token
    const resetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: { 
        token,
        expiresAt: { gt: new Date() } 
      },
    });

    if (!resetTokenRecord) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' }, 
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password
    await prisma.user.update({
      where: { email: resetTokenRecord.email },
      data: { hashedPassword },
    });

    // Delete the used reset token
    await prisma.passwordResetToken.delete({
      where: { id: resetTokenRecord.id },
    });

    return NextResponse.json(
      { message: 'Password reset successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
