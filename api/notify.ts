// Vercel Edge Function — Telegram Notification Proxy
// Keeps TELEGRAM_BOT_TOKEN + CHAT_IDs server-side; never exposed to the browser.

export const config = { runtime: 'edge' };

type NotifyPayload =
  | { type: 'chatbot'; userMessage: string; aiResponse: string; isLead?: boolean; conversationSnippet?: string }
  | { type: 'hero_form'; name: string; email: string; phone?: string; message?: string }
  | { type: 'contact_form'; name: string; email: string; organization?: string; message: string };

function buildMessage(payload: NotifyPayload): string {
  switch (payload.type) {
    case 'chatbot': {
      const base = `💬 *OUANTUM Chatbot — New Query*\n\n*Asked:* ${payload.userMessage}\n\n*AI replied:* ${payload.aiResponse}`;
      if (payload.isLead && payload.conversationSnippet) {
        return `🔥 *HOT LEAD — Contact Details Detected*\n\n*Details shared:* ${payload.userMessage}\n\n*Conversation:*\n${payload.conversationSnippet}`;
      }
      return base;
    }
    case 'hero_form':
      return `🚨 *New Website Lead (Hero Form)*\n\n*Name:* ${payload.name}\n*Email:* ${payload.email}\n*Phone:* ${payload.phone || 'N/A'}\n*Message:* ${payload.message || 'N/A'}`;
    case 'contact_form':
      return `📩 *New Contact Enquiry*\n\n*Name:* ${payload.name}\n*Email:* ${payload.email}\n*Organisation:* ${payload.organization || 'N/A'}\n*Message:* ${payload.message}`;
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const chatId2 = process.env.TELEGRAM_CHAT_ID_2;

  if (!token || !chatId) {
    // Silently succeed — notifications are non-critical, never block UX
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  let payload: NotifyPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = buildMessage(payload);

  const sendTo = (id: string) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: id, text, parse_mode: 'Markdown' }),
    }).catch(() => {});

  // Fire and forget — don't block response on Telegram latency
  const sends: Promise<void>[] = [sendTo(chatId)];
  if (chatId2) sends.push(sendTo(chatId2));
  await Promise.allSettled(sends);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
