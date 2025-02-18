/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Resend } from 'resend';
import twilio from "twilio";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

console.log("Twilio Client:", twilioClient);

// Interfaces for consistent method signatures
interface EmailOptions {
  to: string;
  subject?: string;
  content: string;
  recipientName: string;
}

interface SMSOptions {
  to: string;
  content: string;
  recipientName?: string;
}

interface WhatsAppOptions {
  to: string;
  content: string;
  recipientName?: string;
}

// Email sending function
export async function sendEmail({
  to, 
  subject = "Your Proposal Access", 
  content,
  recipientName
}: EmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "Resend API key is missing. Please check your environment variables."
    );
  }

  // Prepare the email content with recipient name if provided
  const personalizedContent = recipientName 
    ? `Dear ${recipientName},<br><br>${content}` 
    : content;

  try {
    const result = await resend.emails.send({
      from: "myproposal.love <contact@myproposal.love>",
      to,
      subject,
      html: personalizedContent,
      tags: [{ name: 'type', value: 'transactional' }],
      headers: {
        'X-Entity-Ref-ID': new Date().getTime().toString(),
      }
    });

    console.log("Email sent via Resend:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// SMS sending function
export async function sendSMS({
  to, 
  content, 
  recipientName
}: SMSOptions) {
  if (!process.env.TWILIO_PHONE_NUMBER) {
    throw new Error("Twilio phone number is not configured");
  }

  try {
    const message = recipientName 
      ? `Dear ${recipientName},\n\n${content}` 
      : content;

    const result = await twilioClient.messages.create({
      body: message,
      to: formatPhoneNumber(to),
      from: process.env.TWILIO_PHONE_NUMBER
    });

    console.log("SMS sent:", result.sid);
    return result;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

// WhatsApp sending function with optimized message templates
export async function sendWhatsApp({
  to, 
  content, 
  recipientName
}: WhatsAppOptions) {
  if (!process.env.TWILIO_WHATSAPP_NUMBER) {
    throw new Error("Twilio WhatsApp number is not configured");
  }

  try {
    // Format the phone number to ensure it's in E.164 format
    const formattedNumber = formatPhoneNumber(to);
    
    // Prepare the message content with emojis and proper formatting
    const messageBody = `${recipientName ? `Dear ${recipientName},\n\n` : ""}${content}\n\n` +
      `💝 Sent with love via Proposal.love\n` +
      `🔒 This is a private message. Please respect privacy.\n` +
      `❌ Reply STOP to unsubscribe.`;

    // Send the message using Twilio's messaging API
    const result = await twilioClient.messages.create({
      body: messageBody,
      to: `whatsapp:${formattedNumber}`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    });

    console.log("WhatsApp message sent:", result.sid);
    return result;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
}

// Helper function to format phone numbers to E.164 format
function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Ensure number starts with '+' and has country code
  if (digits.startsWith('1')) {
    return `+${digits}`;
  } else if (!digits.startsWith('+')) {
    // Default to US/Canada if no country code (you may want to make this configurable)
    return `+1${digits}`;
  }
  return `+${digits}`;
}

interface SendMessageProps {
  to: string;
  message: string;
  recipientName: string;
  method: "EMAIL" | "SMS" | "WHATSAPP";
}

export async function sendMessage({
  to,
  message,
  recipientName,
  method,
}: SendMessageProps) {
  try {
    switch (method) {
      case "EMAIL":
        await sendEmail({ to, content: message, recipientName });
        break;
      case "SMS":
        await sendSMS({ to, content: message, recipientName });
        break;
      case "WHATSAPP":
        await sendWhatsApp({ to, content: message, recipientName });
        break;
      default:
        throw new Error("Invalid delivery method");
    }
    return { success: true };
  } catch (error) {
    console.error("Message sending error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}

export async function testMessageService() {
  if (process.env.NODE_ENV !== "development") {
    console.warn("Test message service is only available in development mode");
    return {
      email: { success: false, error: "Not in development mode" },
      sms: { success: false, error: "Not in development mode" },
      whatsapp: { success: false, error: "Not in development mode" },
    };
  }

  console.log("Testing email delivery...");
  const emailResult = await sendMessage({
    to: "test@example.com",
    message: "This is a test proposal message",
    recipientName: "Test User",
    method: "EMAIL",
  });
  console.log("Email result:", emailResult);

  console.log("\nTesting SMS delivery...");
  const smsResult = await sendMessage({
    to: "+1234567890",
    message: "This is a test proposal message",
    recipientName: "Test User",
    method: "SMS",
  });
  console.log("SMS result:", smsResult);

  console.log("\nTesting WhatsApp delivery...");
  const whatsappResult = await sendMessage({
    to: "+1234567890",
    message: "This is a test proposal message",
    recipientName: "Test User",
    method: "WHATSAPP",
  });
  console.log("WhatsApp result:", whatsappResult);

  return {
    email: emailResult,
    sms: smsResult,
    whatsapp: whatsappResult,
  };
}
