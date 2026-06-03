// ============================================================
// /api/line-webhook — Vercel Serverless Function
// ใช้สำหรับหา Group ID ของ LINE group ที่ bot อยู่
//
// วิธีใช้:
//   1. ตั้ง LINE_CHANNEL_ACCESS_TOKEN ใน Vercel env vars
//   2. ใน LINE Developers Console → Messaging API → Webhook settings:
//      Webhook URL: https://<your-vercel-app>.vercel.app/api/line-webhook
//      Use webhook: ON
//   3. เชิญ bot เข้ากลุ่ม → พิมพ์อะไรก็ได้ในกลุ่ม → bot จะตอบกลับด้วย Group ID
//   4. Copy Group ID ไปใส่ใน LINE_GROUP_ID env var
//   5. (Optional) ลบไฟล์นี้ทิ้งหลังเสร็จ
// ============================================================

export default async function handler(req, res) {
  // LINE ต้องได้ 200 จาก webhook เสมอ
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true });
  }

  const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const events = (req.body && req.body.events) || [];

  for (const event of events) {
    if (event.type === 'message' && event.replyToken && event.source) {
      const sourceType = event.source.type; // 'user' | 'group' | 'room'
      const sourceId =
        event.source.groupId || event.source.roomId || event.source.userId;

      console.log(`[LINE webhook] type=${sourceType} id=${sourceId}`);

      // ตอบกลับด้วย Group ID เพื่อให้ copy ได้ง่าย
      if (LINE_TOKEN) {
        try {
          await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${LINE_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              replyToken: event.replyToken,
              messages: [
                {
                  type: 'text',
                  text: `🔑 Source type: ${sourceType}\n🆔 ID: ${sourceId}\n\nคัดลอก ID ด้านบนไปใส่ใน Vercel env var: LINE_GROUP_ID`
                }
              ]
            })
          });
        } catch (e) {
          console.warn('Failed to reply:', e);
        }
      }
    }
  }

  return res.status(200).json({ ok: true });
}
