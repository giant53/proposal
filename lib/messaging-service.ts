import nodemailer from "nodemailer";
import twilio from "twilio";

// Initialize email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
  subject = "A Special Message for You 💝", 
  content, 
  recipientName
}: EmailOptions) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error(
      "Email configuration is missing. Please check your environment variables."
    );
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e11d48;">A Special Message for ${recipientName}</h2>
      <div style="white-space: pre-wrap; padding: 20px; background-color: #fff1f2; border-radius: 8px; margin: 20px 0;">
        ${content}
      </div>
      <p style="color: #64748b; font-size: 14px;">
        This is a special proposal sent via myproposal.love. Please respond with care.
      </p>
    </div>
  `;

  try {
    await emailTransporter.verify(); // Verify connection configuration

    const mailOptions = {
      from: {
        name: "Proposal.me",
        address: process.env.SMTP_FROM || process.env.SMTP_USER,
      },
      to,
      subject,
      text: content,
      html,
    };

    const info = await emailTransporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
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
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
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
    
    // Prepare the message content with a professional template
    const messageBody = recipientName 
      ? `Dear ${recipientName},\n\n${content}\n\nSent with love via proposal.me ❤️` 
      : `${content}\n\nSent with love via proposal.me ❤️`;

    // Send the message using Twilio's messaging API
    const result = await twilioClient.messages.create({
      body: messageBody,
      to: `whatsapp:${formattedNumber}`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    });

    console.log("WhatsApp message sent:", result.sid);
    return {
      success: true,
      messageId: result.sid,
      status: result.status
    };
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

// Helper function to check if this is the first message to a recipient
// async function isFirstTimeRecipient(phoneNumber: string): Promise<boolean> {
//   try {
//     // Check message history with this recipient
//     const messages = await twilioClient.messages.list({
//       to: `whatsapp:${phoneNumber}`,
//       limit: 1
//     });
//     return messages.length === 0;
//   } catch (error) {
//     console.error("Error checking message history:", error);
//     // Default to treating as first-time recipient if we can't check
//     return true;
//   }
// }

// Helper function to store message details for tracking
// interface MessageDetails {
//   messageId: string;
//   recipient: string;
//   type: 'whatsapp' | 'sms' | 'email';
//   status: string;
//   isFirstMessage: boolean;
// }

// async function storeMessageDetails(details: MessageDetails) {
//   // Implement your storage logic here (e.g., database storage)
//   // This is important for tracking message status and managing costs
//   console.log("Storing message details:", details);
//   // TODO: Implement actual storage logic
// }

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
