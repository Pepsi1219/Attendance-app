// ============================================================
// /api/notify-line — Vercel Serverless Function
// ส่งข้อความเข้ากลุ่ม LINE หลังจาก user (ที่ login แล้ว) กดบันทึกเช็คชื่อ
//
// Required env vars (Vercel → Project Settings → Environment Variables):
//   LINE_CHANNEL_ACCESS_TOKEN  (จาก LINE Developers Console)
//   LINE_GROUP_ID              (Group ID ที่ bot อยู่)
//
// Optional (มี default ที่เป็นค่า public อยู่แล้ว):
//   SUPABASE_URL
//   SUPABASE_ANON_KEY
// ============================================================

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://hmlghxlcbkqvectkcaok.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || 'sb_publishable_wz0zN3hV7p_w_1X1OpdvlA_qWqAHPcs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

  if (!LINE_TOKEN || !LINE_GROUP_ID) {
    return res.status(500).json({
      error: 'LINE config missing',
      hint: 'Set LINE_CHANNEL_ACCESS_TOKEN and LINE_GROUP_ID in Vercel env vars'
    });
  }

  // 1) Verify user is authenticated (Supabase JWT)
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const verifyRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: authHeader,
        apikey: SUPABASE_ANON_KEY
      }
    });
    if (!verifyRes.ok) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
  } catch (e) {
    return res.status(500).json({ error: 'Auth verification failed', detail: String(e) });
  }

  // 2) Read message body
  const body = req.body || {};
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return res.status(400).json({ error: 'Missing or invalid "message"' });
  }
  // LINE text message max 5000 chars
  const text = message.slice(0, 4900);

  // 3) Push to LINE
  try {
    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LINE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: LINE_GROUP_ID,
        messages: [{ type: 'text', text }]
      })
    });

    if (!lineRes.ok) {
      const detail = await lineRes.text();
      return res
        .status(502)
        .json({ error: 'LINE API error', status: lineRes.status, detail });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Fetch to LINE failed', detail: String(e) });
  }
}
