require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const https = require("https");
const http = require("http");

const app = express();
const PORT = Number(process.env.PORT || 4242);
const BASE_URL = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;

const DB_FILE = process.env.VERCEL ? path.join("/tmp", "orders.json") : path.join(__dirname, "orders.json");

// Memoria volátil fallback para serverless si el filesystem está restringido
let inMemoryOrders = [];

// Catálogo oficial de productos multimarca de la tienda NEXA FIT
const CATALOG = {
  // Suplementos Multimarca
  "on-gold-whey": { name: "Optimum Nutrition · Gold Standard 100% Whey 5 lbs", unitAmount: 24990, category: "suplementos" },
  "dymatize-iso100": { name: "Dymatize · ISO 100 Hydrolyzed Isolate 5 lbs", unitAmount: 28990, category: "suplementos" },
  "c4-preworkout": { name: "Cellucor · C4 Original Explosive Pre-Workout 60 Serv", unitAmount: 13990, category: "suplementos" },
  "animal-pak": { name: "Universal · Animal Pak Multivitaminico 44 Packs", unitAmount: 17990, category: "suplementos" },
  "whey-pro": { name: "MuscleTech · Nitro-Tech 100% Whey Gold 5 lbs", unitAmount: 21990, category: "suplementos" },
  "creatine": { name: "Optimum Nutrition · Creatina Micronizada 100% Pura", unitAmount: 9990, category: "suplementos" },
  "preworkout": { name: "Raw Nutrition · CBUM Thavage Pre-Workout 40 Serv", unitAmount: 15990, category: "suplementos" },
  "shaker": { name: "BlenderBottle · Radian Performance Shaker 700 ml", unitAmount: 4990, category: "suplementos" },

  // Ropa Deportiva Multimarca
  "gymshark-stringer": { name: "Gymshark · Onyx Seamless Compression Stringer", unitAmount: 11990, category: "ropa" },
  "youngla-pump-cover": { name: "YoungLA · Immortal Acid Wash Pump Cover", unitAmount: 12990, category: "ropa" },
  "nike-pro-shorts": { name: "Nike Pro · 2-in-1 Dri-FIT Flex Training Shorts", unitAmount: 14990, category: "ropa" },
  "lululemon-leggings": { name: "Lululemon · Align High-Rise Sculpt Tights", unitAmount: 19990, category: "ropa" },
  "essential-tee": { name: "NEXA FIT · Essential Training Athletic Tee", unitAmount: 7990, category: "ropa" },
  "performance-shorts": { name: "NEXA FIT · Performance Shorts 7” con Forro", unitAmount: 9990, category: "ropa" },
  "seamless-leggings": { name: "NEXA FIT · Seamless Sculpt Leggings", unitAmount: 13990, category: "ropa" },
  "oversized-hoodie": { name: "NEXA FIT · Oversized Rest Day Hoodie 420 GSM", unitAmount: 16990, category: "ropa" }
};

// Middlewares
app.use(express.json({ limit: "150kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname)));

// Función para cargar órdenes desde orders.json
function loadOrders() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      try { fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryOrders, null, 2), "utf8"); } catch (_) {}
      return inMemoryOrders;
    }
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return inMemoryOrders;
  }
}

// Función para guardar órden en orders.json
function saveOrder(order) {
  inMemoryOrders.unshift(order);
  try {
    const orders = loadOrders();
    if (!orders.some(o => o.id === order.id)) {
      orders.unshift(order);
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (error) {
    console.log("[DB] Guardado en memoria temporal:", order.id);
  }
}

// Algoritmo de Luhn para validación matemática de tarjetas en servidor
function validateLuhn(cardNumber) {
  const digits = String(cardNumber || "").replace(/\D/g, "");
  if (!digits || digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Detección de franquicia de tarjeta
function detectCardBrand(number) {
  const clean = String(number || "").replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^3(?:0[0-5]|[68])/.test(clean)) return "diners";
  if (/^6(?:011|5)/.test(clean)) return "discover";
  if (/^35/.test(clean)) return "jcb";
  return "tarjeta";
}

// Validación y normalización de productos
function normalizeItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("La bolsa de compra está vacía.");
  }

  return rawItems.map((item) => {
    const product = CATALOG[item.id];
    const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
    const variant = typeof item.variant === "string" ? item.variant.trim() : "";

    if (!product) {
      throw new Error(`Producto no encontrado en el catálogo oficial: ${item.id}`);
    }

    return {
      id: item.id,
      name: product.name,
      category: product.category,
      unitAmount: product.unitAmount,
      quantity,
      variant: variant || (product.category === "ropa" ? "Talla M" : "Estándar")
    };
  });
}

// Cálculo seguro de totales en el servidor
function calculateOrder(items, discountRate = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitAmount * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * Math.min(0.5, Math.max(0, Number(discountRate) || 0)));
  const netSubtotal = Math.max(0, subtotal - discountAmount);
  const shipping = netSubtotal >= 19900 || netSubtotal === 0 ? 0 : 1000;
  return {
    subtotal,
    discountAmount,
    netSubtotal,
    shipping,
    total: netSubtotal + shipping
  };
}

// Generador de ID de orden tipo NEXA-XXXXXX
function generateOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NEXA-${randomCode}`;
}

// Enviar notificación a Telegram Bot con diseño enriquecido
async function sendTelegramNotification(order) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  const itemsList = order.items
    .map(i => `• *${i.name}* (${i.variant || 'Normal'}) x${i.quantity} — S/ ${(i.unitAmount * i.quantity / 100).toFixed(2)}`)
    .join("\n");

  const message = `
⚡ *NUEVO PEDIDO RECIBIDO — NEXA FIT* ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 *Código de Orden:* \`${order.id}\`
📅 *Fecha:* ${new Date(order.createdAt).toLocaleString("es-PE", { timeZone: "America/Lima" })}
📊 *Estado:* 🟢 PAGADO Y CONFIRMADO

👤 *DATOS DEL CLIENTE*
• *Nombre:* ${order.customer.name}
• *Documento (DNI/RUC):* ${order.customer.document}
• *Email:* \`${order.customer.email}\`
• *Teléfono:* \`${order.customer.phone}\`

📍 *DIRECCIÓN DE ENTREGA*
• *Dirección:* ${order.customer.address} ${order.customer.apartment ? `(${order.customer.apartment})` : ''}
• *Ubicación:* ${order.customer.city}, ${order.customer.region}
${order.customer.notes ? `• *Notas:* _${order.customer.notes}_` : ''}

💳 *MÉTODO DE PAGO*
• *Tarjeta:* ${order.payment.brand.toUpperCase()} (${order.payment.maskedCardNumber})
• *Titular:* ${order.payment.cardholderName}
• *Cuotas:* ${order.payment.installments} cuota(s)

🛍️ *PRODUCTOS COMPRADOS*
${itemsList}

💰 *DESGLOSE FINANCIERO*
• Subtotal: S/ ${(order.orderSummary.subtotal / 100).toFixed(2)}
${order.orderSummary.discountAmount > 0 ? `• Descuento Cupón: -S/ ${(order.orderSummary.discountAmount / 100).toFixed(2)}\n` : ''}• Envío: ${order.orderSummary.shipping === 0 ? "GRATIS (Superó S/ 199)" : `S/ ${(order.orderSummary.shipping / 100).toFixed(2)}`}
• *TOTAL COBRADO:* *S/ ${(order.orderSummary.total / 100).toFixed(2)}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();

  const payload = JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  });

  return new Promise((resolve) => {
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
        let responseBody = "";
        res.on("data", (chunk) => (responseBody += chunk));
        res.on("end", () => {
          console.log("[BOT] Notificación enviada con éxito a Telegram.");
          resolve(true);
        });
      }
    );

    req.on("error", (err) => {
      console.error("[BOT] Error al contactar Telegram:", err.message);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

// Enviar notificación a Webhook
async function sendWebhookNotification(order) {
  const webhookUrl = process.env.BOT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const url = new URL(webhookUrl);
    const payload = JSON.stringify({
      event: "order.created",
      timestamp: new Date().toISOString(),
      order
    });
    const isHttps = url.protocol === "https:";
    const client = isHttps ? https : http;

    const req = client.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        }
      },
      (res) => {
        console.log(`[WEBHOOK] Servidor respondió con estado: ${res.statusCode}`);
      }
    );

    req.on("error", (err) => {
      console.error("[WEBHOOK] Error de conexión:", err.message);
    });

    req.write(payload);
    req.end();
  } catch (error) {
    console.error("[WEBHOOK] URL no válida:", error.message);
  }
}

// ==========================================================================
// ENDPOINTS DE LA API
// ==========================================================================

// Endpoint de configuración del cliente
app.get("/api/config", (req, res) => {
  return res.json({
    brand: "NEXA FIT",
    version: "2.0.0",
    baseUrl: BASE_URL,
    botActive: Boolean(process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_WEBHOOK_URL),
    currency: "PEN",
    currencySymbol: "S/"
  });
});

// Endpoint para procesar el pago y registrar la orden
app.post("/api/process-payment", async (req, res) => {
  try {
    const customer = req.body.customer || {};
    const cardData = req.body.card || {};
    const couponCode = String(req.body.couponCode || "").trim().toUpperCase();
    const discountRate = couponCode === "NEXAFIT20" ? 0.20 : 0;

    const items = normalizeItems(req.body.items);
    const orderSummary = calculateOrder(items, discountRate);

    const firstName = String(customer.firstName || "").trim();
    const lastName = String(customer.lastName || "").trim();
    const customerName = `${firstName} ${lastName}`.trim();
    const email = String(customer.email || "").trim();
    const phone = String(customer.phone || "").trim();
    const document = String(customer.document || "").trim();
    const address = String(customer.address || "").trim();
    const city = String(customer.city || "").trim();
    const region = String(customer.region || "Lima").trim();

    if (!customerName || !email || !phone || !document || !address || !city) {
      return res.status(400).json({
        success: false,
        error: "Por favor completa todos los datos obligatorios de envío y facturación."
      });
    }

    // Validación rigurosa de tarjeta en el servidor
    const rawCardNumber = String(cardData.cardNumber || "").replace(/\D/g, "");
    if (rawCardNumber.length < 13 || rawCardNumber.length > 19) {
      return res.status(400).json({
        success: false,
        error: "El número de tarjeta no tiene una longitud válida (debe tener entre 13 y 19 dígitos)."
      });
    }

    if (!validateLuhn(rawCardNumber)) {
      return res.status(400).json({
        success: false,
        error: "El número de tarjeta ingresado no pasó la validación matemática oficial (Algoritmo de Luhn)."
      });
    }

    const cardholderName = String(cardData.cardholderName || "").trim();
    if (!cardholderName) {
      return res.status(400).json({
        success: false,
        error: "El nombre del titular de la tarjeta es obligatorio."
      });
    }

    const cardExpiry = String(cardData.cardExpiry || "").trim();
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      return res.status(400).json({
        success: false,
        error: "La fecha de vencimiento debe tener el formato MM/YY."
      });
    }

    const cardCvc = String(cardData.cardCvc || "").trim();
    if (cardCvc.length < 3 || cardCvc.length > 4) {
      return res.status(400).json({
        success: false,
        error: "El código de seguridad CVV/CVC debe tener 3 o 4 dígitos."
      });
    }

    const last4 = rawCardNumber.slice(-4);
    const maskedCardNumber = `•••• •••• •••• ${last4}`;
    const cardBrand = detectCardBrand(rawCardNumber);

    const orderId = generateOrderId();
    const now = new Date();
    const estDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas estimadas

    const newOrder = {
      id: orderId,
      createdAt: now.toISOString(),
      estimatedDelivery: estDelivery.toISOString(),
      status: "PAGADO",
      timeline: [
        { title: "Pago Confirmado", time: now.toISOString(), done: true, desc: "Transacción aprobada satisfactoriamente." },
        { title: "Preparación en Almacén", time: null, done: false, desc: "Empaquetando productos con sello de seguridad." },
        { title: "En Camino con Courier", time: null, done: false, desc: "Despacho programado hacia la dirección indicada." },
        { title: "Entregado", time: null, done: false, desc: "Recepción por el cliente." }
      ],
      customer: {
        name: customerName,
        firstName,
        lastName,
        email,
        phone,
        document,
        address,
        apartment: String(customer.apartment || "").trim(),
        city,
        region,
        notes: String(customer.notes || "").trim()
      },
      items,
      orderSummary,
      payment: {
        method: "tarjeta",
        brand: cardBrand,
        maskedCardNumber,
        last4,
        cardholderName,
        cardholderDocument: String(cardData.cardholderDocument || document),
        installments: Number(cardData.installments || 1),
        authCode: Math.floor(100000 + Math.random() * 900000).toString()
      }
    };

    // 1. Guardar en Base de Datos local (orders.json)
    saveOrder(newOrder);
    console.log(`[DB] Orden registrada con éxito: ${orderId} · Total: S/ ${(orderSummary.total / 100).toFixed(2)}`);

    // 2. Notificaciones en paralelo (no bloquean respuesta)
    sendTelegramNotification(newOrder).catch((e) => console.error(e));
    sendWebhookNotification(newOrder).catch((e) => console.error(e));

    return res.json({
      success: true,
      message: "¡Pago procesado exitosamente! Tu pedido ha sido confirmado.",
      orderId,
      order: newOrder
    });
  } catch (error) {
    console.error("[API] Error procesando pago:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Ocurrió un error inesperado al procesar la compra."
    });
  }
});

// Endpoint para consultar el estado de una orden individual (Rastreo)
app.get("/api/orders/:orderId", (req, res) => {
  const queryId = String(req.params.orderId || "").trim().toUpperCase();
  const orders = loadOrders();
  const found = orders.find(o => o.id === queryId);

  if (!found) {
    return res.status(404).json({
      success: false,
      error: `No encontramos ningún pedido registrado con el código "${queryId}". Revisa tu comprobante o correo.`
    });
  }

  return res.json({
    success: true,
    order: {
      id: found.id,
      createdAt: found.createdAt,
      estimatedDelivery: found.estimatedDelivery,
      status: found.status,
      timeline: found.timeline,
      customer: {
        name: found.customer.name,
        city: found.customer.city,
        region: found.customer.region,
        address: found.customer.address
      },
      items: found.items,
      orderSummary: found.orderSummary,
      payment: {
        brand: found.payment.brand,
        maskedCardNumber: found.payment.maskedCardNumber,
        installments: found.payment.installments
      }
    }
  });
});

// Endpoint de administración para consultar todas las órdenes
app.get("/api/orders", (req, res) => {
  const orders = loadOrders();
  return res.json({
    success: true,
    total: orders.length,
    orders
  });
});

// Endpoint de estadísticas del negocio
app.get("/api/stats", (req, res) => {
  const orders = loadOrders();
  const totalSales = orders.reduce((sum, o) => sum + (o.orderSummary ? o.orderSummary.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.items ? o.items.reduce((s, i) => s + i.quantity, 0) : 0), 0);

  return res.json({
    success: true,
    totalOrders: orders.length,
    totalRevenuePEN: (totalSales / 100).toFixed(2),
    totalItemsSold,
    averageTicketPEN: orders.length > 0 ? (totalSales / 100 / orders.length).toFixed(2) : "0.00",
    lastOrderAt: orders.length > 0 ? orders[0].createdAt : null
  });
});

// Fallback para desarrollo local
if (!process.env.VERCEL) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  NEXA FIT STORE v2.0 - SISTEMA PROFESIONAL ACTIVO  `);
    console.log(`  URL: http://localhost:${PORT}                     `);
    console.log(`  Base de Datos: ${DB_FILE}                         `);
    console.log(`====================================================`);
  });
}

module.exports = app;
