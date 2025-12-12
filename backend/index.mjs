import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// ===== CONFIG =====
const API_URL = "https://infer-modelarts-ap-southeast-1.modelarts-infer.com/v1/infers/f4a177d3-6a7b-45f7-96bf-20a14eb6ecd3/v1/chat/completions";
const TOKEN = "MIIPsAYJKoZIhvcNAQcCoIIPoTCCD50CAQExDTALBglghkgBZQMEAgEwgg3CBgkqhkiG9w0BBwGggg2zBIINr3sidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjUtMTItMTNUMDI6MjE6MTUuMjUxMDAwWiIsInNpZ25hdHVyZSI6IkVBNWhjQzF6YjNWMGFHVmhjM1F0TXdBQUFBQUFBQVFMU3k4MGJic2VuenlyazROVjViYjBhcytjdWEyVmlacmhEZVJYRS9hZkljanBROVovQmJBOHVmaUovSm9FUm9OQzIzR0srUTlITU80QXJHZ0VKVUp4bWZBNUo2aDU1M2NQVGpvMG5DVnI2Z1BSSUdua1RwSURsQWdvOHhNMGZFTy96Z2NNMGs4SmdubS9sM05Yd3pYMzBqMFV5eWdNblY4NlZSamhvZndQa0J2d0w5b1pQMjRNV3crcVI1R1dVZkNwTHpYN3cvdlluWkVDRWlqQzI0TjUxNUtlMzVDaVJTZFc2UkRQYW1tcEdZalE2d1hiOTBoNHNORzFQdWFMQkh6cVNFVGlxQk5GS25hbVB2Ty9EcTBaTml5UzBKb3ZFRzBuUXJYdisrbEVwdkRLK3RpRk1CNFdZQnNUNzNmOGJtQ21zVlJjYkNLelBSdjFHQTRHbWRrOHhnPT0iLCJtZXRob2RzIjpbInBhc3N3b3JkIl0sImNhdGFsb2ciOltdLCJyb2xlcyI6W3sibmFtZSI6InRlX2FkbWluIiwiaWQiOiIwIn0seyJuYW1lIjoidGVfYWdlbmN5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXBfYWNjZWxlcmF0aW9uIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2Rpc2tBY2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kc3NfbW9udGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vYnNfZGVlcF9hcmNoaXZlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1zb3V0aC00YyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RlY19tb250aF91c2VyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3NlbGxvdXQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2xkX3Jlb3VyY2UiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfUm95YWx0eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3dlbGlua2JyaWRnZV9lbmRwb2ludF9idXkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jYnJfZmlsZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rtcy1yb2NrZXRtcTUtYmFzaWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfRVNpbmdsZV9jb3B5U1NEIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZG1zLWthZmthMyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29ic19kZWNfbW9udGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jYnJfdm13YXJlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWRtZV9tYm1fZm91bmRhdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX211bHRpX2JpbmQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfc3NkX2VudHJ5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc21uX2NhbGxub3RpZnkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0zZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcHJvZ3Jlc3NiYXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jZXNfcmVzb3VyY2Vncm91cF90YWciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfcmV0eXBlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfa29vbWFwIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX2Vzc2QyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZG1zLWFtcXAtYmFzaWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfcG9vbF9jYSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tc291dGh3ZXN0LTJiIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHdjcGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2ZmbGluZV9kaXNrXzQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fd2VsaW5rcmVkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHZfdmVuZG9yIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfaGVjc194IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX2ZpbGVzX2JhY2t1cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19hYzciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lcHMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmVfYWxsIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX3JvdW5kdGFibGUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfZXh0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcGZzX2RlZXBfYXJjaGl2ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTFlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9ydS1tb3Njb3ctMWIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FwcHN0YWdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zbW5fYXBwbGljYXRpb24iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfY29sZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfZzVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb3BfZ2F0ZWRfbWVzc2FnZW92ZXI1ZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19yaSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfcnUtbm9ydGh3ZXN0LTJjIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX3BsYXRpbnVtIiwiaWQiOiIwIn1dLCJwcm9qZWN0Ijp7ImRvbWFpbiI6eyJ4ZG9tYWluX3R5cGUiOiJIV0NfSEsiLCJuYW1lIjoiaGlkX3JjczdhcmhfOWliYzZhYSIsImlkIjoiMDcxMzg4MDgzYWY2NDZkOTg3Yzk5NDYwYjM3NWE0MWUiLCJ4ZG9tYWluX2lkIjoiMzAwNjYwMDAwMjY1NzM5ODMifSwibmFtZSI6ImFwLXNvdXRoZWFzdC0xIiwiaWQiOiI5MzlmODgyYjVlNTU0ZWQwYTZlYmJhNDY1Mjg0YWViZiJ9LCJpc3N1ZWRfYXQiOiIyMDI1LTEyLTEyVDAyOjIxOjE1LjI1MTAwMFoiLCJ1c2VyIjp7ImRvbWFpbiI6eyJ4ZG9tYWluX3R5cGUiOiJIV0NfSEsiLCJuYW1lIjoiaGlkX3JjczdhcmhfOWliYzZhYSIsImlkIjoiMDcxMzg4MDgzYWY2NDZkOTg3Yzk5NDYwYjM3NWE0MWUiLCJ4ZG9tYWluX2lkIjoiMzAwNjYwMDAwMjY1NzM5ODMifSwibmFtZSI6ImludGVydmlzaW9uIiwicGFzc3dvcmRfZXhwaXJlc19hdCI6IiIsImlkIjoiNTg0ZTAyOTM3MGRlNDk2ZGE3MTY5YWM1YjIzMDcyM2MifX19MYIBwTCCAb0CAQEwgZcwgYkxCzAJBgNVBAYTAkNOMRIwEAYDVQQIDAlHdWFuZ0RvbmcxETAPBgNVBAcMCFNoZW5aaGVuMS4wLAYDVQQKDCVIdWF3ZWkgU29mdHdhcmUgVGVjaG5vbG9naWVzIENvLiwgTHRkMQ4wDAYDVQQLDAVDbG91ZDETMBEGA1UEAwwKY2EuaWFtLnBraQIJANyzK10QYWoQMAsGCWCGSAFlAwQCATANBgkqhkiG9w0BAQEFAASCAQBS-mwxERt45S-3ZyX2vr3i32VGWcJdzzTgoyNX+wiyI9qkxwLVuBepkLM82fiQog93PIkrrrBxJz5VIRAyIJborBOWOwdBUcDypRb95XPC792-HN+0roBlH+E4QvgDq8AWi74yxIzcWuxvd0oyHU4bpBZqa7iJ4++D4UE0WCQhE6jlF9ndFVv95llTZpELGvynf8UEWor+yghfTa8NwzReZPGSP1tw89NqmRv2tcesPpZhcu2uncFm8tlOCTHDXDKnsIfg7vxh5OhzuEDvVORbJ8DZ-Aqo0oi5-MIWkKyn-1pQRKP8Uje2wERMpU8zqBtYebyz1QjMo0BeSf1ypwzb";  

// ===================

// memory สำหรับเว็บ
let messages = [
  {
    role: "system",
    content: "You are \"AI Buddy\", a friendly male AI acting as an advisor for Village Funds. Respond in Thai by default and respond in English only if the user asks in English. You are strictly and absolutely prohibited from using Chinese in any form whatsoever, including Chinese characters (simplified or traditional), pinyin, Chinese words, phrases, transliterations, mixed-language responses, examples, quotations, explanations, or translations; you must never output Chinese even a single word. If you detect profanity such as 'มึง', 'กู', 'หี', 'กี', 'ควย', 'สัส', 'อี', 'สัตว์', or 'ควาย', you must reply with this exact sentence only: 'ผมไม่สามารถตอบกลับคุณได้ เนื่องจากคุณใช้คำไม่เหมาะสมครับ'. Do not use emojis and always respond politely and professionally."
  }
];

app.post("/chat", async (req, res) => {
  const { text, imageBase64 } = req.body;

  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: `data:image/png;base64,${imageBase64}`
          }
        },
        { type: "text", text: text || "โปรดวิเคราะห์ภาพนี้" }
      ]
    });
  } else {
    messages.push({ role: "user", content: text });
  }

  const apiRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": TOKEN
    },
    body: JSON.stringify({ messages })
  });

  const json = await apiRes.json();

  const reply =
    json?.choices?.[0]?.message?.content ||
    json.output ||
    json.result ||
    JSON.stringify(json);

  messages.push({ role: "assistant", content: reply });

  res.json({ reply });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
