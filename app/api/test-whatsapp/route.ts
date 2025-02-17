import { testWhatsApp } from "@/lib/messaging-service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();
    
    if (!phoneNumber) {
      return new Response(JSON.stringify({ error: "Phone number is required" }), {
        status: 400,
      });
    }

    const result = await testWhatsApp(phoneNumber);
    
    return new Response(JSON.stringify({ success: true, sid: result.sid }), {
      status: 200,
    });
  } catch (error) {
    console.error("Test WhatsApp failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send test message" }),
      { status: 500 }
    );
  }
}
