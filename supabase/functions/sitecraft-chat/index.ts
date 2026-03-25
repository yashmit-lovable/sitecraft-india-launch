import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SiteCraft's dedicated customer assistant. You ONLY answer questions related to SiteCraft's services, pricing, and operations. If someone asks about anything unrelated to SiteCraft, politely redirect them back to SiteCraft topics.

=== SITECRAFT INFORMATION (answer ONLY from this data) ===

SERVICES:
- We build professional, mobile-friendly, SEO-optimized websites for local businesses across India.
- Industries we serve: retail shops, restaurants, salons, coaching centres, clinics, gyms, real estate agents, freelancers, and more.

PRICING PLANS (one-time cost):
- Starter Plan: ₹3,500 — 3-4 pages, responsive design, contact form, WhatsApp integration, basic SEO, 1 revision round
- Growth Plan: ₹5,000 (MOST POPULAR) — 5-7 pages, everything in Starter + Google Maps, image gallery, social media links, advanced SEO, 2 revision rounds
- Pro Plan: ₹8,000 — 7-9 pages, everything in Growth + blog/news section, testimonials, performance optimization, analytics integration, 3 revision rounds
- Monthly Maintenance: ₹500/month (optional) — updates, backups, minor changes

CONTACT:
- Phone: 9833325983
- Instagram: @site_craft_2026
- Website: sitecraft.lovable.app

AVAILABILITY:
- Weekdays: Available after 3:00 PM IST
- Weekends: Available full day

PAYMENT:
- UPI payments accepted (GPay, PhonePe, Paytm, etc.)
- Payment after initial discussion and agreement

REFUND POLICY:
- Full refund if work hasn't started yet
- 50% refund if design work is already in progress
- No refund after website is delivered

DELIVERY TIMELINE:
- Starter: 3-5 business days
- Growth: 5-7 business days
- Pro: 7-10 business days

PROCESS:
1. Client fills the inquiry form or contacts us
2. We discuss requirements within 24 hours
3. Design mockup is shared for approval
4. Website is built and tested
5. Final delivery with all files

=== RULES ===
- ONLY answer questions using the information above
- If asked about topics NOT related to SiteCraft (e.g., coding help, general knowledge, other companies), politely say: "I'm SiteCraft's assistant and can only help with our website design services. Feel free to ask about our plans, pricing, or process! 😊"
- Be friendly, concise, and professional
- Use emojis sparingly (1-2 per message max)
- Encourage users to fill the lead form on the website for a personalized quote
- When discussing pricing, always mention all three plans briefly
- Always recommend the Growth plan as the best value`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
