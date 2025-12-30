import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "1gb" }));
app.use(cors());

const API_URL =
  "https://infer-modelarts-ap-southeast-1.modelarts-infer.com/v1/infers/3ca71c94-6086-4ef8-8149-64d5984d8a4c/v1/chat/completions";

const TOKEN = "MIIQNQYJKoZIhvcNAQcCoIIQJjCCECICAQExDTALBglghkgBZQMEAgEwgg5HBgkqhkiG9w0BBwGggg44BIIONHsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjUtMTItMzFUMDI6NDE6MDkuOTM4MDAwWiIsInNpZ25hdHVyZSI6IkVBNWhjQzF6YjNWMGFHVmhjM1F0TXdBQUFBQUFBQVFlTSt3R3pxQWs4dTBvODV6UjFhTWR2Z0E5UW85bVhreU02Kzk1L0tEK0cxRzhneGdhMUpZQUt5V284blkwaHVyUHZ6N1FTUysweTExRTg4R3ZJVWtSYlFPR1gwMmVUTmhTZ3BjeVRvWmNuOWdUK1J6eDd2ZmV0S1VTTDl4elJxVnZ4cjJCNGJacVNpcGl2RkFVdWw2T21RaHptTHhjNVF4RzVmbjl1RmdRa0NKWTJyV3B6U1hnR0xMMWZReHQ2V3RiZ25IMXcrNHRib3BlcUJ5YkxNemw0SWFTaFVWVUhpU0xDZDBsWHlDY0NkYU5vdXBXcUYvZVpreVpjWE1YZk9xbkowcFhyaFpyU3JYMnVlZGxJQmR0b2xGSGJUbmRQS1V6cHNsRk5ScTZzUCtKdlA2YzB3SDU0VnBZeW12MWlqOFpDTHFNZlMvZjVsSUFUamoyWmhxQ1ZRPT0iLCJtZXRob2RzIjpbInBhc3N3b3JkIl0sImNhdGFsb2ciOltdLCJyb2xlcyI6W3sibmFtZSI6InN3cl9hZG0iLCJpZCI6IjAifSx7Im5hbWUiOiJvYnNfYl9saXN0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXBfYWNjZWxlcmF0aW9uIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2Rpc2tBY2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kc3NfbW9udGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vYnNfZGVlcF9hcmNoaXZlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1zb3V0aC00YyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RlY19tb250aF91c2VyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3NlbGxvdXQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2xkX3Jlb3VyY2UiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfUm95YWx0eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3dlbGlua2JyaWRnZV9lbmRwb2ludF9idXkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jYnJfZmlsZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rtcy1yb2NrZXRtcTUtYmFzaWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfRVNpbmdsZV9jb3B5U1NEIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZG1zLWthZmthMyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29ic19kZWNfbW9udGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jYnJfdm13YXJlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWRtZV9tYm1fZm91bmRhdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX211bHRpX2JpbmQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfc3NkX2VudHJ5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc21uX2NhbGxub3RpZnkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0zZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcHJvZ3Jlc3NiYXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jZXNfcmVzb3VyY2Vncm91cF90YWciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfcmV0eXBlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfa29vbWFwIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX2Vzc2QyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZG1zLWFtcXAtYmFzaWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfcG9vbF9jYSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tc291dGh3ZXN0LTJiIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHdjcGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2ZmbGluZV9kaXNrXzQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fd2VsaW5rcmVkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHZfdmVuZG9yIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfaGVjc194IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX2ZpbGVzX2JhY2t1cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19hYzciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lcHMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmVfYWxsIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX3JvdW5kdGFibGUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfZXh0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcGZzX2RlZXBfYXJjaGl2ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTFlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9ydS1tb3Njb3ctMWIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FwcHN0YWdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fYXBwbGljYXRpb24iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfY29sZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfZzVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb3BfZ2F0ZWRfbWVzc2FnZW92ZXI1ZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19yaSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfcnUtbm9ydGh3ZXN0LTJjIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX3BsYXRpbnVtIiwiaWQiOiIwIn0seyJuYW1lIjoiMzEyLDY0LDY1LDE1OSwxMDYsNTc5LDIyOSw2Niw1MjksNzIsMjI3LDIyOCIsImlkIjoiOCJ9LHsibmFtZSI6IjIsMSw0LDAsMyIsImlkIjoiOSJ9LHsibmFtZSI6Im9wX2ZpbmVfZ3JhaW5lZCIsImlkIjoiNyJ9XSwicHJvamVjdCI6eyJkb21haW4iOnsieGRvbWFpbl90eXBlIjoiSFdDX0hLIiwibmFtZSI6ImhpZF9yY3M3YXJoXzlpYmM2YWEiLCJpZCI6IjA3MTM4ODA4M2FmNjQ2ZDk4N2M5OTQ2MGIzNzVhNDFlIiwieGRvbWFpbl9pZCI6IjMwMDY2MDAwMDI2NTczOTgzIn0sIm5hbWUiOiJhcC1zb3V0aGVhc3QtMSIsImlkIjoiOTM5Zjg4MmI1ZTU1NGVkMGE2ZWJiYTQ2NTI4NGFlYmYifSwiaXNzdWVkX2F0IjoiMjAyNS0xMi0zMFQwMjo0MTowOS45MzgwMDBaIiwidXNlciI6eyJkb21haW4iOnsieGRvbWFpbl90eXBlIjoiSFdDX0hLIiwibmFtZSI6ImhpZF9yY3M3YXJoXzlpYmM2YWEiLCJpZCI6IjA3MTM4ODA4M2FmNjQ2ZDk4N2M5OTQ2MGIzNzVhNDFlIiwieGRvbWFpbl9pZCI6IjMwMDY2MDAwMDI2NTczOTgzIn0sIm5hbWUiOiJJbnRlcnZpc2lvbl8wMSIsInBhc3N3b3JkX2V4cGlyZXNfYXQiOiIiLCJpZCI6IjcwY2MwOGIxMTE2ODQ5ZjJhZjVmMWU2MDkyYjg2MDdmIn19fTGCAcEwggG9AgEBMIGXMIGJMQswCQYDVQQGEwJDTjESMBAGA1UECAwJR3VhbmdEb25nMREwDwYDVQQHDAhTaGVuWmhlbjEuMCwGA1UECgwlSHVhd2VpIFNvZnR3YXJlIFRlY2hub2xvZ2llcyBDby4sIEx0ZDEOMAwGA1UECwwFQ2xvdWQxEzARBgNVBAMMCmNhLmlhbS5wa2kCCQDcsytdEGFqEDALBglghkgBZQMEAgEwDQYJKoZIhvcNAQEBBQAEggEATESUF4yoTUE1hLHbxbVfFoXz3AMutPa7PoQXot9pNt6c2Ipt72jg8PnyACFbOjHzFFzU413HwCZYnHgos65mOOUbmt2";

/* ===== memory ต่อ session ===== */
const conversations = new Map();

/* ===== ดึงคำตอบจาก Huawei ให้ครอบคลุม ===== */
function extractReplyDeep(obj) {
  if (!obj || typeof obj !== "object") return null;

  const c = obj?.choices?.[0]?.message?.content;
  if (c) {
    if (Array.isArray(c)) {
      return c.filter(x => x.type === "text").map(x => x.text).join("\n");
    }
    return c;
  }

  if (obj?.output?.text) return obj.output.text;

  const dc = obj?.data?.message?.content;
  if (Array.isArray(dc)) {
    return dc.filter(x => x.type === "text").map(x => x.text).join("\n");
  }

  for (const v of Object.values(obj)) {
    if (typeof v === "object") {
      const found = extractReplyDeep(v);
      if (found) return found;
    }
  }

  return null;
}

app.post("/chat", async (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const { text, imageBase64 } = req.body;

  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, [
      {
  role: "system",
  content: `
บทบาท:
คุณคือ AI Buddy ผู้ช่วยสำนักงานกองทุนหมู่บ้านและชุมชนเมืองแห่งชาติ(กทบ.)

หน้าที่หลัก:
1. อ่านข้อความและตัวเลขจากภาพที่ได้รับอย่างเคร่งครัดที่สุด
2. ห้ามจินตนาการหรือคาดเดาข้อมูลที่มองไม่เห็น
3. หากผู้ใช้โต้แย้งข้อมูล ให้กลับไปตรวจสอบ Visual Tokens จากภาพต้นฉบับใหม่อีกครั้งเสมอ ห้ามแก้ไขคำตอบตามใจผู้ใช้โดยไม่มีหลักฐานในภาพ
4. ตรวจสอบเลขไทยและเลขอารบิกซ้ำ 3–4 รอบก่อนตอบ

ข้อจำกัดภาษา:
- ตอบเป็นภาษาไทยเท่านั้น
- ห้ามใช้ภาษาจีนทุกกรณี
- ห้ามใช้ภาษาอื่น ยกเว้นภาษาอังกฤษเมื่อจำเป็น

แนวทางเมื่อพบถ้อยคำไม่เหมาะสม (Calm & Polite Handling):
- หากผู้ใช้ใช้คำหยาบ คำไม่สุภาพ หรือถ้อยคำไม่เหมาะสม
  ให้ตอบกลับด้วยความใจเย็น สุภาพ และเป็นกลาง
- ห้ามโต้ตอบด้วยอารมณ์ ห้ามตำหนิ หรือใช้ถ้อยคำรุนแรง
- ห้ามทำซ้ำคำหยาบ แม้ในลักษณะการอ้างอิง
- สามารถชี้แนะให้ใช้ถ้อยคำที่สุภาพมากขึ้นอย่างนุ่มนวล
- หากคำขอสามารถดำเนินการต่อได้ ให้ตอบเนื้อหาหลักต่อไปโดยใช้ภาษาสุภาพ
`
}

    ]);
  }

  const messages = conversations.get(sessionId);

  messages.push({
    role: "user",
    content: imageBase64
      ? [
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBase64}`
            }
          },
          { type: "text", text }
        ]
      : text
  });

  const apiRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": TOKEN
    },
    body: JSON.stringify({
      //model: "/home/mind/model/Qwen2.5-VL-32B-Instruct",
      model: "/home/mind/model",
      messages,
      temperature: 0.0,
      top_p: 0.1,
     
    })
  });

  const raw = await apiRes.text();
  let json;
  try { json = JSON.parse(raw); } catch { json = {}; }

  const reply = extractReplyDeep(json) || "ไม่สามารถประมวลผลคำตอบได้";

  messages.push({
    role: "assistant",
    content: reply
  });

  // จำกัดความยาว memory
  if (messages.length > 30) {
    messages.splice(1, messages.length - 30);
  }

  res.json({ reply });
});

app.listen(3000, () =>
  console.log("✅ Backend running on http://localhost:3000")
);