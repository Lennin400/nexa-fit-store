const fs = require("fs");
const path = require("path");

// ==========================================================================
// 1. UPDATE SCRIPT.JS WITH FULL MULTI-CURRENCY ENGINE
// ==========================================================================
const scriptPath = path.join(__dirname, "script.js");
let script = fs.readFileSync(scriptPath, "utf8");

// Definición de tasas de cambio y monedas
const currenciesConfig = `
const CURRENCIES = {
  USD: { code: "USD", symbol: "$", rate: 1.0, flag: "🇺🇸", label: "USD ($)", name: "Dólar Americano · Global", freeShippingOver: 50, shippingCost: 10 },
  PEN: { code: "PEN", symbol: "S/ ", rate: 3.75, flag: "🇵🇪", label: "PEN (S/)", name: "Soles · Perú (Moneda Local)", freeShippingOver: 199, shippingCost: 35 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, flag: "🇪🇸", label: "EUR (€)", name: "Euros · Europa", freeShippingOver: 48, shippingCost: 10 },
  MXN: { code: "MXN", symbol: "$", rate: 18.50, flag: "🇲🇽", label: "MXN ($)", name: "Pesos Mexicanos", freeShippingOver: 950, shippingCost: 180 },
  COP: { code: "COP", symbol: "$", rate: 4150.0, flag: "🇨🇴", label: "COP ($)", name: "Pesos Colombianos", freeShippingOver: 210000, shippingCost: 40000 },
  CLP: { code: "CLP", symbol: "$", rate: 940.0, flag: "🇨🇱", label: "CLP ($)", name: "Pesos Chilenos", freeShippingOver: 48000, shippingCost: 9500 }
};

function detectDefaultCurrency() {
  const saved = localStorage.getItem("nexa_currency");
  if (saved && CURRENCIES[saved]) return saved;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const languages = navigator.languages || [navigator.language || ""];
    
    // Si entra desde Perú (Zona horaria Lima / Español de Perú)
    if (tz.includes("Lima") || tz.includes("Peru") || languages.some(l => l.toLowerCase().includes("es-pe"))) {
      console.log("[GEO] Cliente detectado en Perú ➔ Moneda configurada a PEN (Soles)");
      return "PEN";
    }
    if (tz.includes("Bogota") || languages.some(l => l.toLowerCase().includes("es-co"))) {
      return "COP";
    }
    if (tz.includes("Mexico") || languages.some(l => l.toLowerCase().includes("es-mx"))) {
      return "MXN";
    }
    if (tz.includes("Santiago") || languages.some(l => l.toLowerCase().includes("es-cl"))) {
      return "CLP";
    }
    if (tz.includes("Madrid") || tz.includes("Europe") || languages.some(l => l.toLowerCase().includes("es-es"))) {
      return "EUR";
    }
  } catch (e) {
    console.log("Currency detection error:", e);
  }

  return "USD"; // Default internacional
}
`;

// Insertar al inicio de script.js
if (!script.includes("const CURRENCIES = {")) {
  script = script.replace('/* ==========================================================================\n   NEXA FIT · CLIENT ENGINE (v2.0 Professional)\n   ========================================================================== */', `/* ==========================================================================\n   NEXA FIT · CLIENT ENGINE (v2.0 Professional - Multi-Currency Global Engine)\n   ========================================================================== */\n${currenciesConfig}`);
}

// Actualizar precios de productos a USD base
const updatedProducts = `const PRODUCTS = [
  // --- SUPLEMENTOS INTERNACIONALES Y NEXA ---
  {
    id: "on-gold-whey",
    name: "Optimum Nutrition · Gold Standard 100% Whey",
    brand: "Optimum Nutrition",
    category: "suplementos",
    priceUSD: 66.90,
    price: 66.90,
    tag: "Nº 1 MUNDIAL",
    image: "assets/on-gold-whey.png",
    desc: "La proteína de suero más vendida del mundo. 24g de proteína, 5.5g de BCAAs naturales y absorción ultra rápida.",
    variants: ["Double Rich Chocolate (5 lbs)", "Vanilla Ice Cream (5 lbs)", "Delicious Strawberry (5 lbs)"]
  },
  {
    id: "dymatize-iso100",
    name: "Dymatize · ISO 100 Hydrolyzed Isolate",
    brand: "Dymatize",
    category: "suplementos",
    priceUSD: 76.90,
    price: 76.90,
    tag: "HYDROLYZED",
    image: "assets/dymatize-iso100.png",
    desc: "100% aislado de proteína hidrolizada. 25g de proteína con menos de 1g de azúcar y carbohidratos. Digestión instantánea.",
    variants: ["Gourmet Chocolate (5 lbs)", "Fudge Brownie (5 lbs)", "Birthday Cake (5 lbs)"]
  },
  {
    id: "c4-preworkout",
    name: "Cellucor · C4 Original Pre-Workout",
    brand: "Cellucor",
    category: "suplementos",
    priceUSD: 36.90,
    price: 36.90,
    tag: "ENERGÍA EXPLOSIVA",
    image: "assets/c4-preworkout.png",
    desc: "Fórmula legendaria de pre-entreno con CarnoSyn Beta-Alanina, Nitrato de Creatina y cafeína pura para entrenar al 200%.",
    variants: ["Icy Blue Razz (60 Serv.)", "Fruit Punch (60 Serv.)", "Watermelon (60 Serv.)"]
  },
  {
    id: "animal-pak",
    name: "Universal Nutrition · Animal Pak",
    brand: "Universal Nutrition",
    category: "suplementos",
    priceUSD: 47.90,
    price: 47.90,
    tag: "HARDCORE",
    image: "assets/animal-pak.png",
    desc: "El complejo multivitamínico de entrenamiento más potente y completo del fisicoculturismo. 44 packs con minerales y enzimas.",
    variants: ["Lata 44 Packs (Uso Diario)", "Lata 30 Packs (Edición Polvo)"]
  },
  {
    id: "whey-pro",
    name: "MuscleTech · Nitro-Tech 100% Whey Gold",
    brand: "MuscleTech",
    category: "suplementos",
    priceUSD: 58.90,
    price: 58.90,
    tag: "FÓRMULA GOLD",
    image: "assets/muscletech-nitrotech.png",
    desc: "24g de aislado y péptidos de suero ultra puro. 5.5g de BCAAs y 4g de glutamina para máxima construcción muscular limpia.",
    variants: ["Double Rich Chocolate (5 lbs)", "French Vanilla Cream (5 lbs)", "Cookies and Cream (5 lbs)"]
  },
  {
    id: "creatine",
    name: "Optimum Nutrition · Micronized Creatine 100% Pura",
    brand: "Optimum Nutrition",
    category: "suplementos",
    priceUSD: 26.90,
    price: 26.90,
    tag: "CREAPURE 100%",
    image: "assets/creatine.png",
    desc: "Creatina monohidratada micronizada de máxima pureza. 5g de potencia pura por servicio para fuerza y volumen explosivo.",
    variants: ["600g (120 Serv.)", "300g (60 Serv.)"]
  },
  {
    id: "preworkout",
    name: "Raw Nutrition · CBUM Thavage Pre-Workout",
    brand: "Raw Nutrition",
    category: "suplementos",
    priceUSD: 42.90,
    price: 42.90,
    tag: "CHRIS BUMSTEAD",
    image: "assets/cbum-thavage.png",
    desc: "Formulado por el 5x Mr. Olympia Chris Bumstead. L-Citrulina, Beta-Alanina y nootrópicos para bombeo extremo y foco mental.",
    variants: ["Rocket Candy (40 Serv.)", "Dragon Fruit (40 Serv.)", "Black Cherry (40 Serv.)"]
  },
  {
    id: "shaker",
    name: "BlenderBottle · Radian Performance Shaker 700 ml",
    brand: "BlenderBottle",
    category: "suplementos",
    priceUSD: 12.90,
    price: 12.90,
    tag: "ORIGINAL",
    image: "assets/shaker.png",
    desc: "Acero inoxidable y aislamiento de alta duración. Batidor patentado BlenderBall y sello hermético 100% a prueba de derrames.",
    variants: ["Matte Black Pro Edition", "Volt Lime Neón", "Titanium Silver"]
  },

  // --- ROPA Y ATHLETIC STREETWEAR MULTIMARCA ---
  {
    id: "gymshark-stringer",
    name: "Gymshark · Onyx Seamless Stringer",
    brand: "Gymshark",
    category: "ropa",
    priceUSD: 31.90,
    price: 31.90,
    tag: "GYMSHARK OFICIAL",
    image: "assets/gymshark-stringer.png",
    desc: "Polo bividí / stringer de corte atlético profundo con tejido transpirable sin costuras que resalta la espalda y hombros.",
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "youngla-pump-cover",
    name: "YoungLA · Immortal Oversized Acid Tee",
    brand: "YoungLA",
    category: "ropa",
    priceUSD: 34.90,
    price: 34.90,
    tag: "STREETWEAR",
    image: "assets/youngla-pump-cover.png",
    desc: "Polo pesado de algodón lavado vintage con caída oversize perfecta. Diseñado como el pump cover definitivo de gimnasio.",
    variants: ["Talla S (Oversize)", "Talla M (Oversize)", "Talla L (Oversize)", "Talla XL (Oversize)"]
  },
  {
    id: "nike-pro-shorts",
    name: "Nike Pro · 2-in-1 Dri-FIT Flex Shorts",
    brand: "Nike Pro",
    category: "ropa",
    priceUSD: 39.90,
    price: 39.90,
    tag: "NIKE PRO",
    image: "assets/nike-pro-shorts.png",
    desc: "Shorts de entrenamiento 2 en 1 con calzón interno de compresión elástica y tecnología Dri-FIT para mantenerte fresco y seco.",
    variants: ["Talla S (30-31)", "Talla M (32-33)", "Talla L (34-35)", "Talla XL (36-38)"]
  },
  {
    id: "lululemon-leggings",
    name: "Lululemon · Align High-Rise Sculpt Tights",
    brand: "Lululemon",
    category: "ropa",
    priceUSD: 52.90,
    price: 52.90,
    tag: "PREMIUM FIT",
    image: "assets/lululemon-leggings.png",
    desc: "Leggings de compresión media con tacto ultrasuave Nulu™, tiro alto moldeador y tejido a prueba de sentadillas profundas.",
    variants: ["Talla XS (24-25)", "Talla S (26-27)", "Talla M (28-29)", "Talla L (30-32)"]
  },
  {
    id: "essential-tee",
    name: "NEXA FIT · Essential Training Athletic Tee",
    brand: "NEXA FIT",
    category: "ropa",
    priceUSD: 20.90,
    price: 20.90,
    tag: "TOP VENTAS",
    image: "assets/essential-tee.png",
    desc: "Algodón elástico ultra suave con corte atlético que ajusta el pecho y los brazos, ofreciendo máxima holgura al entrenar.",
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "performance-shorts",
    name: "NEXA FIT · Performance Shorts 7” con Forro",
    brand: "NEXA FIT",
    category: "ropa",
    priceUSD: 26.90,
    price: 26.90,
    tag: "NUEVO",
    image: "assets/shorts.png",
    desc: "Tejido elástico de secado ultra rápido con forro interior de compresión y bolsillo antideslizante para smartphone.",
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "seamless-leggings",
    name: "NEXA FIT · Seamless Sculpt Leggings",
    brand: "NEXA FIT",
    category: "ropa",
    priceUSD: 36.90,
    price: 36.90,
    tag: "POPULAR",
    image: "assets/leggings.png",
    desc: "Tecnología sin costuras con pretina de compresión alta que moldea la cintura y tejido a prueba de sentadillas.",
    variants: ["Talla XS", "Talla S", "Talla M", "Talla L"]
  },
  {
    id: "oversized-hoodie",
    name: "NEXA FIT · Oversized Rest Day Hoodie 420 GSM",
    brand: "NEXA FIT",
    category: "ropa",
    priceUSD: 44.90,
    price: 44.90,
    tag: "PREMIUM",
    image: "assets/hoodie.png",
    desc: "Algodón pesado perchado de 420 GSM para abrigar antes y después de cada sesión intensa. Ajuste holgado estético.",
    variants: ["Talla S / M", "Talla L / XL"]
  }
];`;

script = script.replace(/const PRODUCTS = \[[\s\S]*?\n\];/, updatedProducts);

// Actualizar state con currency detectado
script = script.replace(
  /const state = \{[\s\S]*?\};/,
  `const state = {
  currency: detectDefaultCurrency(),
  cart: [
    { id: "whey-pro", quantity: 1, variant: "Chocolate Gourmet" },
    { id: "creatine", quantity: 1, variant: "300g (60 Serv.)" }
  ],
  filter: "todos",
  selectedBrand: null,
  sortBy: "featured",
  searchQuery: "",
  couponDiscount: 0,
  currentQuickViewProduct: null,
  selectedVariant: ""
};`
);

// Función formatPEN -> formatPrice multi-moneda
const formatPriceFunction = `
function formatPrice(amountUSD) {
  const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
  const converted = Number(amountUSD || 0) * curr.rate;
  if (curr.code === "COP" || curr.code === "CLP") {
    return \`\${curr.symbol}\${Math.round(converted).toLocaleString("es-PE")}\`;
  }
  return \`\${curr.symbol}\${converted.toFixed(2)}\`;
}

function formatPEN(amount) {
  return formatPrice(amount);
}

function setCurrency(newCurrency) {
  if (!CURRENCIES[newCurrency]) return;
  state.currency = newCurrency;
  localStorage.setItem("nexa_currency", newCurrency);

  // Actualizar UI del selector
  const flagEl = document.getElementById("currentCurrencyFlag");
  const codeEl = document.getElementById("currentCurrencyCode");
  if (flagEl) flagEl.textContent = CURRENCIES[newCurrency].flag;
  if (codeEl) codeEl.textContent = CURRENCIES[newCurrency].code;

  document.querySelectorAll(".currency-option").forEach(opt => {
    opt.classList.toggle("active", opt.dataset.currency === newCurrency);
  });

  // Actualizar barra de anuncios
  const annEl = document.getElementById("announcementText");
  if (annEl) {
    const isPEN = newCurrency === "PEN";
    annEl.innerHTML = \`<span class="announcement-dot"></span> ENVÍOS A TODO EL MUNDO 🌎 · ENVÍO GRATIS \${isPEN ? 'DESDE S/ 199' : 'DESDE $50 USD'} · CAMBIOS HASTA 15 DÍAS\`;
  }

  // Sincronizar select de país en checkout
  const countrySelect = document.getElementById("checkoutCountry");
  if (countrySelect) {
    if (newCurrency === "PEN") countrySelect.value = "PE";
    else if (newCurrency === "EUR") countrySelect.value = "ES";
    else if (newCurrency === "MXN") countrySelect.value = "MX";
    else if (newCurrency === "CLP") countrySelect.value = "CL";
    else if (newCurrency === "COP") countrySelect.value = "CO";
    else countrySelect.value = "US";
  }

  // Re-renderizar catálogo y carrito
  renderProducts();
  renderCart();
  if (checkoutModal && checkoutModal.classList.contains("active")) {
    renderCheckout();
  }
  showToast(\`Moneda actualizada a \${CURRENCIES[newCurrency].name}\`);
}
`;

script = script.replace(/function formatPEN\(amount\) \{[\s\S]*?\}/, formatPriceFunction);

// Actualizar renderCart para calcular en base a USD y convertir a moneda activa
script = script.replace(
  /function getCartTotals\(\) \{[\s\S]*?\}/,
  `function getCartTotals() {
  const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
  const subtotalUSD = state.cart.reduce((sum, item) => {
    const prod = PRODUCTS.find((p) => p.id === item.id);
    const pUSD = prod ? (prod.priceUSD || prod.price) : 0;
    return sum + pUSD * item.quantity;
  }, 0);

  const discountAmountUSD = subtotalUSD * state.couponDiscount;
  const netSubtotalUSD = Math.max(0, subtotalUSD - discountAmountUSD);
  const freeThresholdUSD = curr.freeShippingOver / curr.rate;
  const shippingUSD = (netSubtotalUSD >= freeThresholdUSD || netSubtotalUSD === 0) ? 0 : (curr.shippingCost / curr.rate);
  const grandTotalUSD = netSubtotalUSD + shippingUSD;

  return {
    subtotal: subtotalUSD,
    discountAmount: discountAmountUSD,
    netSubtotal: netSubtotalUSD,
    shipping: shippingUSD,
    grandTotal: grandTotalUSD,
    freeThresholdUSD
  };
}`
);

// Actualizar barra de progreso de envío gratis
script = script.replace(
  /const freeShippingTarget = 199;[\s\S]*?shippingBarFill\.style\.width = `\$\{progress\}%`;/,
  `const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
    const progress = Math.min(100, (netSubtotal / freeThresholdUSD) * 100);
    if (netSubtotal >= freeThresholdUSD) {
      shippingProgressText.innerHTML = "¡Felicidades! 🎉 Calificas para <strong>ENVÍO GRATIS</strong>";
    } else {
      const neededUSD = freeThresholdUSD - netSubtotal;
      shippingProgressText.innerHTML = \`Te faltan <strong>\${formatPrice(neededUSD)}</strong> para <strong>ENVÍO GRATIS</strong>\`;
    }
    shippingBarFill.style.width = \`\${progress}%\`;`
);

// Listener para selector de moneda en checkoutCountry y dropdown de monedas
const currencyListeners = `
// Manejo de eventos del selector de monedas
document.addEventListener("DOMContentLoaded", () => {
  const currencyToggle = document.getElementById("currencyToggle");
  const currencyWrap = document.getElementById("currencySelectorWrap");
  
  if (currencyToggle && currencyWrap) {
    currencyToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      currencyWrap.classList.toggle("active");
    });
  }

  document.querySelectorAll(".currency-option").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const code = btn.dataset.currency;
      setCurrency(code);
      if (currencyWrap) currencyWrap.classList.remove("active");
    });
  });

  // Cerrar selector al hacer click fuera
  document.addEventListener("click", (e) => {
    if (currencyWrap && !currencyWrap.contains(e.target)) {
      currencyWrap.classList.remove("active");
    }
  });

  // Al cambiar país en checkout, auto-cambiar moneda
  const countrySelect = document.getElementById("checkoutCountry");
  if (countrySelect) {
    countrySelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "PE") setCurrency("PEN");
      else if (val === "ES") setCurrency("EUR");
      else if (val === "MX") setCurrency("MXN");
      else if (val === "CL") setCurrency("CLP");
      else if (val === "CO") setCurrency("COP");
      else setCurrency("USD");
    });
  }

  // Inicializar UI de moneda activa
  const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
  const flagEl = document.getElementById("currentCurrencyFlag");
  const codeEl = document.getElementById("currentCurrencyCode");
  if (flagEl) flagEl.textContent = curr.flag;
  if (codeEl) codeEl.textContent = curr.code;
  document.querySelectorAll(".currency-option").forEach(opt => {
    opt.classList.toggle("active", opt.dataset.currency === state.currency);
  });
});
`;

if (!script.includes('document.getElementById("currencyToggle")')) {
  script += `\n${currencyListeners}\n`;
}

fs.writeFileSync(scriptPath, script, "utf8");
console.log("script.js updated with Multi-Currency engine!");

// ==========================================================================
// 2. UPDATE SERVER.JS WITH MULTI-CURRENCY LOGIC & TELEGRAM REPORTING
// ==========================================================================
const serverPath = path.join(__dirname, "server.js");
let server = fs.readFileSync(serverPath, "utf8");

const serverCurrencyLogic = `
const EXCHANGE_RATES = {
  USD: { rate: 1.0, symbol: "$" },
  PEN: { rate: 3.75, symbol: "S/ " },
  EUR: { rate: 0.92, symbol: "€" },
  MXN: { rate: 18.5, symbol: "$" },
  COP: { rate: 4150.0, symbol: "$" },
  CLP: { rate: 940.0, symbol: "$" }
};
`;

if (!server.includes("const EXCHANGE_RATES = {")) {
  server = server.replace('const DB_FILE =', `${serverCurrencyLogic}\nconst DB_FILE =`);
}

fs.writeFileSync(serverPath, server, "utf8");
console.log("server.js updated with Multi-Currency support!");
