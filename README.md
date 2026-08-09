# NEXA FIT — Plataforma de Comercio Electrónico & Pasarela Directa

**NEXA FIT** es una plataforma de comercio electrónico de alto rendimiento para ropa deportiva técnica y suplementación atlética, diseñada con una arquitectura moderna, pasarela de pago directa con tarjeta 3D interactiva, persistencia local en base de datos (`orders.json`), sistema de rastreo de pedidos en tiempo real y notificaciones automáticas vía Bot de Telegram y Webhooks.

---

## ✨ Características Principales

1. **Pasarela de Pago Directa e Independiente:**
   - Formulario de pago estilizado sin dependencias de pasarelas externas en iframes.
   - Tarjeta virtual interactiva en 3D con efecto de inclinación por movimiento de mouse (Parallax Tilt), brillo holográfico láser, chip dorado y giro fluido de 180° al interactuar con el código CVV.
   - Detección automática de franquicias en tiempo real: **Visa, Mastercard, American Express, Diners Club, Discover y JCB**.
   - Validación matemática con **Algoritmo de Luhn** tanto en cliente como en servidor (`server.js`).

2. **Experiencia de Usuario (UX/UI Deportiva Premium):**
   - Catálogo interactivo con filtrado por categorías ("Todos", "Ropa de Gym", "Suplementos").
   - Ordenamiento por precio (menor a mayor, mayor a menor, nombre).
   - Modal de **Vista Rápida (Quick View)** con selector dinámico de tallas (S, M, L, XL) o sabores/presentaciones.
   - Bolsa lateral dinámica con **calculador de envío gratis** (Progreso visual hacia S/ 199.00).
   - Sistema de cupones de descuento (Código de prueba: `NEXAFIT20` para 20% OFF).
   - Celebración con animación de **confeti** en Canvas tras finalizar la compra.

3. **Sistema de Rastreo de Pedidos ("Order Tracker"):**
   - Consulta de estado por código de orden (`NEXA-XXXXXX`) con línea de tiempo visual (*Pago Confirmado ➔ En Preparación ➔ En Camino ➔ Entregado*).
   - Endpoint dedicado: `GET /api/orders/:orderId`.

4. **Comprobante Digital Oficial Imprimible:**
   - Modal de confirmación con código de autorización bancaria simulada, desglose financiero e integración de impresión optimizada (`@media print` / PDF).

5. **Notificaciones en Tiempo Real (Bot de Telegram & Webhooks):**
   - Envío instantáneo de cada transacción con reporte formateado en Markdown a Telegram.
   - Webhook genérico para integración con microservicios o Discord.

---

## 🚀 Puesta en Marcha Rápida

### Requisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### Instalación y Ejecución
1. Abre tu terminal en esta carpeta:
```bash
npm install
```

2. (Opcional) Configura tus credenciales de Telegram en el archivo `.env`:
```env
PORT=4242
BASE_URL=http://127.0.0.1:4242
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui
```

3. Inicia el servidor:
```bash
npm start
```

4. Abre tu navegador web en:
```text
http://127.0.0.1:4242
```

---

## 📡 Endpoints de la API Backend

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/config` | Obtiene la configuración de la tienda y estado del bot. |
| `POST` | `/api/process-payment` | Valida la tarjeta con Luhn, calcula precios oficiales y guarda la orden en `orders.json`. |
| `GET` | `/api/orders/:orderId` | Consulta los detalles y línea de tiempo de una orden para rastreo. |
| `GET` | `/api/orders` | Lista el historial completo de órdenes registradas. |
| `GET` | `/api/stats` | Métricas generales del negocio (Ventas totales, ticket promedio, ítems vendidos). |

---

## 💳 Tarjetas de Prueba Válidas (Algoritmo de Luhn)

Puedes usar cualquiera de estas tarjetas para probar el sistema:

- **Visa:** `4532 0151 1283 0366` · Vence: `12/28` · CVV: `123`
- **Mastercard:** `5555 5555 5555 4444` · Vence: `10/27` · CVV: `456`
- **Amex:** `3782 8224 6310 005` · Vence: `08/29` · CVV: `1234`
- **Cupón de descuento de prueba:** `NEXAFIT20`

---

## 📂 Estructura del Proyecto

```text
nexa_fit_store_card_payment/
├── assets/                 # Imágenes de alta resolución y recursos gráficos
├── .env                    # Configuración de variables de entorno
├── .env.example            # Plantilla de variables de entorno
├── index.html              # Estructura semántica HTML5 con modales y checkout
├── styles.css              # Sistema de diseño CSS moderno v2.0
├── script.js               # Lógica del cliente, catálogo, tarjeta 3D y checkout
├── server.js               # Servidor Node.js/Express y API de pagos
├── orders.json             # Base de datos local de pedidos
├── package.json            # Dependencias y scripts de ejecución
└── README.md               # Documentación oficial del proyecto
```
