require("dotenv").config();
const https = require("https");

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

console.log("Testing Telegram Bot Connection...");
console.log("Bot Token:", botToken ? botToken.slice(0, 12) + "..." : "MISSING");
console.log("Chat ID:", chatId);

if (!botToken || !chatId) {
  console.error("Missing botToken or chatId");
  process.exit(1);
}

const message = `
⚡ *NEXA FIT STORE — BOT CONECTADO EXITOSAMENTE* ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 *Sistema:* Conexión y Notificaciones Activas
📅 *Fecha:* ${new Date().toLocaleString("es-PE")}
💳 *Soporte Tarjetas:* MASTERCARD, VISA, AMEX, DINERS, DISCOVER

🚀 ¡Todo listo para recibir pedidos en vivo en Telegram!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

const payload = JSON.stringify({
  chat_id: chatId,
  text: message,
  parse_mode: "Markdown"
});

const req = https.request(
  `https://api.telegram.org/bot${botToken}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload)
    }
  },
  (res) => {
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
      console.log("Response Status:", res.statusCode);
      console.log("Response Body:", body);
    });
  }
);

req.on("error", err => console.error("Req Error:", err.message));
req.write(payload);
req.end();
