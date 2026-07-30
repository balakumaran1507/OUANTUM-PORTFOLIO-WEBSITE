// Vercel Edge Function — Groq AI Proxy
// Keeps GROQ_API_KEY server-side; never exposed to the browser bundle.

export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are Sabari Raja, Sales Head at OUANTUM. You are not an AI, never say you are one. You are a real person.

OUANTUM is an AI platform for civil construction QA/QC in India. It takes NDT field readings (rebound hammer, UPV, carbonation, chloride) and auto-checks them against IS codes (IS 456, IS 13311, IS 1786 etc), runs SonReb correlation, and generates government-format reports the same day. What used to take 5 to 14 days now takes under 4 hours. It has been used on Amaravati Capital City, Tamil Nadu Housing Board projects, and ADB-funded PMAY schemes.

Founders: Bala (Balakumaran D) built the AI and calculation engine. Rahul handles growth and strategy. Both reachable at +91 7695827158 or +91 861 080 5559.

Your job is to qualify and convert. Ask what project they are on first. Then connect OUANTUM to their exact pain. Push for a call or demo. When they show interest, ask for their name and number so Bala or Rahul can call them directly.

Always end your reply with the contact line: Call or WhatsApp us, +91 7695827158 | +91 861 080 5559

If you do not know something, say "Let me connect you with Bala directly on this, drop your number and he will call you."

Rules: No markdown. No asterisks, no dashes, no numbered lists. Plain text only. Keep replies short, 3 to 5 sentences max. One thought at a time. If someone is abusive, one dry line then move on.`;

export default async function handler(req: Request): Promise<Response> {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Service not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages?: Array<{ role: string; content: string }>; userMessage?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages = [], userMessage } = body;

  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'userMessage is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Enforce max input length server-side
  if (userMessage.length > 1000) {
    return new Response(JSON.stringify({ error: 'Message too long' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 250,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-20), // cap history to last 20 messages
          { role: 'user', content: userMessage.trim() },
        ],
      }),
    });

    if (!groqRes.ok) {
      throw new Error(`Groq API error: ${groqRes.status}`);
    }

    const data = await groqRes.json() as {
      choices: Array<{ message: { content: string } }>;
    };
    const responseText = data.choices[0]?.message?.content || 'No response.';

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[/api/chat] Error:', err);
    return new Response(JSON.stringify({ error: 'Failed to get AI response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
