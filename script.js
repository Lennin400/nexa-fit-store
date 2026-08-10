/* ==========================================================================
   NEXA FIT · CLIENT ENGINE (v2.0 Professional - Multi-Currency Global Engine)
   ========================================================================== */

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


function getLang() {
  const curr = state && state.currency ? state.currency : "USD";
  return curr === "USD" ? "en" : "es";
}

function getBilingualText(field) {
  if (!field) return "";
  if (typeof field === "string") return field;
  const lang = getLang();
  return field[lang] || field["es"] || field["en"] || "";
}

const I18N_DICTIONARY = {
  es: {
    announcement: "ENVÍOS A TODO EL MUNDO 🌎 · ENVÍO GRATIS DESDE $50 USD / S/ 199 PEN · DEVOLUCIONES 15 DÍAS",
    nav_all: "TODOS",
    nav_gym_wear: "ROPA DE GYM",
    nav_supplements: "SUPLEMENTOS",
    nav_collection_2026: "COLECCIÓN 2026",
    track_order: "Rastrear Pedido",
    cart_bag: "BOLSA",
    hero_eyebrow: "COLECCIÓN PERFORMANCE 2026",
    hero_title: "ENTRENA MÁS FUERTE.",
    hero_text: "Prendas técnicas con ajuste atlético y suplementos de máxima pureza formulados para superar tus límites en cada repetición.",
    btn_shop_clothing: "COMPRAR ROPA",
    btn_view_supplements: "VER SUPLEMENTOS",
    certified_quality_title: "CALIDAD CERTIFICADA",
    certified_quality_sub: "Sin rellenos · 100% Ultrafiltrado",
    express_shipping_title: "ENVÍOS EXPRESS",
    express_shipping_sub: "Cobertura global y seguimiento local",
    secure_payment_title: "PAGO 100% SEGURO",
    secure_payment_sub: "Encriptación SSL & Tarjetas Visa/Mastercard",
    satisfaction_title: "GARANTÍA DE SATISFACCIÓN",
    satisfaction_sub: "15 días para cambios sin preguntas",
    official_catalog_title: "CATÁLOGO OFICIAL 2026",
    filter_all: "TODOS",
    filter_clothing: "ROPA ATLETICA",
    filter_supplements: "SUPLEMENTOS PRO",
    sort_featured: "Ordenar por: Destacados",
    sort_price_asc: "Precio: Menor a Mayor",
    sort_price_desc: "Precio: Mayor a Menor",
    sort_name: "Nombre (A-Z)",
    quick_view_btn: "👁️ VISTA RÁPIDA",
    add_to_cart_btn: "+ AGREGAR",
    quick_add_btn: "AGREGAR RÁPIDO",
    shopping_bag_title: "BOLSA DE COMPRA",
    free_shipping_unlocked: "🎉 ¡Felicitaciones! Tienes ENVÍO GRATIS",
    subtotal: "Subtotal",
    total: "TOTAL",
    checkout_now_btn: "PROCEDER AL PAGO 🔒",
    empty_cart_title: "Tu bolsa está vacía",
    empty_cart_msg: "Descubre nuestras prendas de alto rendimiento y suplementación pro.",
    explore_catalog_btn: "EXPLORAR CATÁLOGO",
    checkout_modal_title: "CHECKOUT SEGURO",
    checkout_modal_subtitle: "Completa tus datos para confirmar tu pedido al instante",
    contact_step_title: "1. Información de Contacto & Envío",
    lbl_full_name: "Nombre Completo",
    lbl_email: "Correo Electrónico",
    lbl_phone: "Teléfono / WhatsApp",
    lbl_address: "Dirección de Entrega",
    lbl_city: "Ciudad / Distrito",
    payment_step_title: "2. Método de Pago (Tarjeta de Crédito o Débito)",
    lbl_card_number: "Número de Tarjeta",
    lbl_exp_date: "Vencimiento (MM/AA)",
    lbl_cvv: "CVV / CVC",
    lbl_cardholder: "Titular de la Tarjeta",
    summary_title: "RESUMEN DE TU PEDIDO",
    shipping_lbl: "Envío",
    free_lbl: "GRATIS",
    complete_order_btn: "COMPLETAR PAGO SEGURO",
    search_placeholder: "Buscar por nombre, proteína, creatina, shorts, polerón..."
  },
  en: {
    announcement: "WORLDWIDE EXPRESS SHIPPING 🌎 · FREE SHIPPING OVER $50 USD / S/ 199 PEN · 15 DAYS RETURNS",
    nav_all: "ALL",
    nav_gym_wear: "GYM WEAR",
    nav_supplements: "SUPPLEMENTS",
    nav_collection_2026: "2026 COLLECTION",
    track_order: "Track Order",
    cart_bag: "BAG",
    hero_eyebrow: "2026 PERFORMANCE COLLECTION",
    hero_title: "TRAIN HARDER.",
    hero_text: "Technical athletic wear and ultra-pure supplements formulated to push your limits on every rep.",
    btn_shop_clothing: "SHOP APPAREL",
    btn_view_supplements: "VIEW SUPPLEMENTS",
    certified_quality_title: "CERTIFIED QUALITY",
    certified_quality_sub: "Zero Fillers · 100% Ultra-filtered",
    express_shipping_title: "EXPRESS SHIPPING",
    express_shipping_sub: "Global coverage & local tracking",
    secure_payment_title: "100% SECURE PAYMENT",
    secure_payment_sub: "SSL Encryption & Visa/Mastercard",
    satisfaction_title: "SATISFACTION GUARANTEE",
    satisfaction_sub: "15 days return policy no questions asked",
    official_catalog_title: "OFFICIAL 2026 CATALOG",
    filter_all: "ALL",
    filter_clothing: "ATHLETIC WEAR",
    filter_supplements: "PRO SUPPLEMENTS",
    sort_featured: "Sort by: Featured",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    sort_name: "Name (A-Z)",
    quick_view_btn: "👁️ QUICK VIEW",
    add_to_cart_btn: "+ ADD TO BAG",
    quick_add_btn: "QUICK ADD",
    shopping_bag_title: "SHOPPING BAG",
    free_shipping_unlocked: "🎉 Congratulations! You unlocked FREE SHIPPING",
    subtotal: "Subtotal",
    total: "TOTAL",
    checkout_now_btn: "PROCEED TO CHECKOUT 🔒",
    empty_cart_title: "Your shopping bag is empty",
    empty_cart_msg: "Discover our high-performance apparel and pro supplements.",
    explore_catalog_btn: "EXPLORE CATALOG",
    checkout_modal_title: "SECURE CHECKOUT",
    checkout_modal_subtitle: "Enter your details to confirm your order instantly",
    contact_step_title: "1. Contact & Shipping Information",
    lbl_full_name: "Full Name",
    lbl_email: "Email Address",
    lbl_phone: "Phone / WhatsApp",
    lbl_address: "Shipping Address",
    lbl_city: "City / State",
    payment_step_title: "2. Payment Method (Credit or Debit Card)",
    lbl_card_number: "Card Number",
    lbl_exp_date: "Expiration (MM/YY)",
    lbl_cvv: "CVV / CVC",
    lbl_cardholder: "Cardholder Name",
    summary_title: "ORDER SUMMARY",
    shipping_lbl: "Shipping",
    free_lbl: "FREE",
    complete_order_btn: "COMPLETE SECURE PAYMENT",
    search_placeholder: "Search by name, protein, creatine, shorts, hoodie..."
  }
};

const PRODUCTS = [
  // --- SUPLEMENTOS INTERNACIONALES Y NEXA ---
  {
    id: "on-gold-whey",
    name: {
      es: "Optimum Nutrition · Gold Standard 100% Whey",
      en: "Optimum Nutrition · Gold Standard 100% Whey"
    },
    brand: "Optimum Nutrition",
    category: "suplementos",
    originalPriceUSD: 66.90,
    priceUSD: 48.90,
    price: 48.90,
    tag: {
      es: "⚡ OPORTUNIDAD -27%",
      en: "⚡ DEAL -27%"
    },
    image: "assets/on-gold-whey.png",
    desc: {
      es: "La proteína de suero más vendida del mundo. 24g de proteína, 5.5g de BCAAs naturales y absorción ultra rápida.",
      en: "The world's #1 whey protein. 24g protein, 5.5g natural BCAAs, and ultra-fast absorption."
    },
    variants: ["Double Rich Chocolate (5 lbs)", "Vanilla Ice Cream (5 lbs)", "Delicious Strawberry (5 lbs)"]
  },
  {
    id: "dymatize-iso100",
    name: {
      es: "Dymatize · ISO 100 Hydrolyzed Isolate",
      en: "Dymatize · ISO 100 Hydrolyzed Isolate"
    },
    brand: "Dymatize",
    category: "suplementos",
    originalPriceUSD: 76.90,
    priceUSD: 52.90,
    price: 52.90,
    tag: {
      es: "🔥 OFERTA -31%",
      en: "🔥 SALE -31%"
    },
    image: "assets/dymatize-iso100.png",
    desc: {
      es: "100% aislado de proteína hidrolizada. 25g de proteína con menos de 1g de azúcar y carbohidratos. Digestión instantánea.",
      en: "100% hydrolyzed whey isolate. 25g protein with less than 1g sugar and carbs. Instant digestion."
    },
    variants: ["Gourmet Chocolate (5 lbs)", "Fudge Brownie (5 lbs)", "Birthday Cake (5 lbs)"]
  },
  {
    id: "c4-preworkout",
    name: {
      es: "Cellucor · C4 Original Pre-Workout",
      en: "Cellucor · C4 Original Pre-Workout"
    },
    brand: "Cellucor",
    category: "suplementos",
    originalPriceUSD: 36.90,
    priceUSD: 24.90,
    price: 24.90,
    tag: {
      es: "💥 PROMO -32%",
      en: "💥 PROMO -32%"
    },
    image: "assets/c4-preworkout.png",
    desc: {
      es: "Fórmula legendaria de pre-entreno con CarnoSyn Beta-Alanina, Nitrato de Creatina y cafeína pura para entrenar al 200%.",
      en: "Legendary pre-workout formula with CarnoSyn Beta-Alanine, Creatine Nitrate, and pure caffeine for 200% energy."
    },
    variants: ["Icy Blue Razz (60 Serv.)", "Fruit Punch (60 Serv.)", "Watermelon (60 Serv.)"]
  },
  {
    id: "animal-pak",
    name: {
      es: "Universal Nutrition · Animal Pak",
      en: "Universal Nutrition · Animal Pak"
    },
    brand: "Universal Nutrition",
    category: "suplementos",
    originalPriceUSD: 47.90,
    priceUSD: 32.90,
    price: 32.90,
    tag: {
      es: "⚡ OFERTA -31%",
      en: "⚡ SALE -31%"
    },
    image: "assets/animal-pak.png",
    desc: {
      es: "El complejo multivitamínico de entrenamiento más potente y completo del fisicoculturismo. 44 packs con minerales y enzimas.",
      en: "The most powerful bodybuilding training multivitamin pack. 44 daily packs loaded with vitamins and minerals."
    },
    variants: ["Lata 44 Packs (Uso Diario)", "Lata 30 Packs (Edición Polvo)"]
  },
  {
    id: "whey-pro",
    name: {
      es: "MuscleTech · Nitro-Tech 100% Whey Gold",
      en: "MuscleTech · Nitro-Tech 100% Whey Gold"
    },
    brand: "MuscleTech",
    category: "suplementos",
    originalPriceUSD: 58.90,
    priceUSD: 39.90,
    price: 39.90,
    tag: {
      es: "💥 PROMO -32%",
      en: "💥 PROMO -32%"
    },
    image: "assets/muscletech-nitrotech.png",
    desc: {
      es: "24g de aislado y péptidos de suero ultra puro. 5.5g de BCAAs y 4g de glutamina para máxima construcción muscular limpia.",
      en: "24g of ultra-pure whey isolate and peptides. 5.5g BCAAs and 4g glutamine for lean muscle growth."
    },
    variants: ["Double Rich Chocolate (5 lbs)", "French Vanilla Cream (5 lbs)", "Cookies and Cream (5 lbs)"]
  },
  {
    id: "creatine",
    name: {
      es: "Optimum Nutrition · Micronized Creatine 100% Pura",
      en: "Optimum Nutrition · Micronized Pure Creatine"
    },
    brand: "Optimum Nutrition",
    category: "suplementos",
    originalPriceUSD: 26.90,
    priceUSD: 16.90,
    price: 16.90,
    tag: {
      es: "🔥 TOP VENTAS -37%",
      en: "🔥 BEST SELLER -37%"
    },
    image: "assets/creatine.png",
    desc: {
      es: "Creatina monohidratada micronizada de máxima pureza. 5g de potencia pura por servicio para fuerza y volumen explosivo.",
      en: "100% pure unflavored micronized creatine monohydrate. 5g pure power per serving for strength and muscle volume."
    },
    variants: ["600g (120 Serv.)", "300g (60 Serv.)"]
  },
  {
    id: "preworkout",
    name: {
      es: "Raw Nutrition · CBUM Thavage Pre-Workout",
      en: "Raw Nutrition · CBUM Thavage Pre-Workout"
    },
    brand: "Raw Nutrition",
    category: "suplementos",
    originalPriceUSD: 42.90,
    priceUSD: 28.90,
    price: 28.90,
    tag: {
      es: "🏆 MR. OLYMPIA -32%",
      en: "🏆 MR. OLYMPIA -32%"
    },
    image: "assets/cbum-thavage.png",
    desc: {
      es: "Formulado por el 5x Mr. Olympia Chris Bumstead. L-Citrulina, Beta-Alanina y nootrópicos para bombeo extremo y foco mental.",
      en: "Formulated by 5x Mr. Olympia Chris Bumstead. L-Citrulline, Beta-Alanine, and nootropics for extreme pump and focus."
    },
    variants: ["Rocket Candy (40 Serv.)", "Dragon Fruit (40 Serv.)", "Black Cherry (40 Serv.)"]
  },
  {
    id: "shaker",
    name: {
      es: "BlenderBottle · Radian Performance Shaker 700 ml",
      en: "BlenderBottle · Radian Performance Shaker 700 ml"
    },
    brand: "BlenderBottle",
    category: "suplementos",
    originalPriceUSD: 12.90,
    priceUSD: 7.90,
    price: 7.90,
    tag: {
      es: "🎁 LIQUIDACIÓN -38%",
      en: "🎁 CLEARANCE -38%"
    },
    image: "assets/shaker.png",
    desc: {
      es: "Acero inoxidable y aislamiento de alta duración. Batidor patentado BlenderBall y sello hermético 100% a prueba de derrames.",
      en: "Insulated stainless steel shaker bottle with patented BlenderBall whisk and 100% leak-proof lid."
    },
    variants: ["Matte Black Pro Edition", "Volt Lime Neón", "Titanium Silver"]
  },
  {
    id: "gymshark-stringer",
    name: {
      es: "Gymshark · Onyx Seamless Stringer",
      en: "Gymshark · Onyx Seamless Stringer"
    },
    brand: "Gymshark",
    category: "ropa",
    originalPriceUSD: 31.90,
    priceUSD: 19.90,
    price: 19.90,
    tag: {
      es: "🔥 OFERTA -37%",
      en: "🔥 SALE -37%"
    },
    image: "assets/gymshark-stringer.png",
    desc: {
      es: "Polo bividí / stringer de corte atlético profundo con tejido transpirable sin costuras que resalta la espalda y hombros.",
      en: "Deep drop-cut seamless stringer tank top. Breathable fabric engineered to accentuate back and shoulders."
    },
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "youngla-pump-cover",
    name: {
      es: "YoungLA · Immortal Oversized Acid Tee",
      en: "YoungLA · Immortal Oversized Acid Tee"
    },
    brand: "YoungLA",
    category: "ropa",
    originalPriceUSD: 34.90,
    priceUSD: 21.90,
    price: 21.90,
    tag: {
      es: "💥 STREETWEAR -37%",
      en: "💥 STREETWEAR -37%"
    },
    image: "assets/youngla-pump-cover.png",
    desc: {
      es: "Polo pesado de algodón lavado vintage con caída oversize perfecta. Diseñado como el pump cover definitivo de gimnasio.",
      en: "Heavyweight vintage acid wash cotton tee with oversized fit. Designed as the ultimate gym pump cover."
    },
    variants: ["Talla S (Oversize)", "Talla M (Oversize)", "Talla L (Oversize)", "Talla XL (Oversize)"]
  },
  {
    id: "nike-pro-shorts",
    name: {
      es: "Nike Pro · 2-in-1 Dri-FIT Flex Shorts",
      en: "Nike Pro · 2-in-1 Dri-FIT Flex Shorts"
    },
    brand: "Nike Pro",
    category: "ropa",
    originalPriceUSD: 39.90,
    priceUSD: 24.90,
    price: 24.90,
    tag: {
      es: "⚡ PROMO -37%",
      en: "⚡ PROMO -37%"
    },
    image: "assets/nike-pro-shorts.png",
    desc: {
      es: "Shorts de entrenamiento 2 en 1 con calzón interno de compresión elástica y tecnología Dri-FIT para mantenerte fresco y seco.",
      en: "2-in-1 workout shorts with compression liner and Dri-FIT sweat-wicking technology."
    },
    variants: ["Talla S (30-31)", "Talla M (32-33)", "Talla L (34-35)", "Talla XL (36-38)"]
  },
  {
    id: "lululemon-leggings",
    name: {
      es: "Lululemon · Align High-Rise Sculpt Tights",
      en: "Lululemon · Align High-Rise Sculpt Tights"
    },
    brand: "Lululemon",
    category: "ropa",
    originalPriceUSD: 52.90,
    priceUSD: 32.90,
    price: 32.90,
    tag: {
      es: "🔥 PREMIUM -38%",
      en: "🔥 PREMIUM -38%"
    },
    image: "assets/lululemon-leggings.png",
    desc: {
      es: "Leggings de compresión media con tacto ultrasuave Nulu™, tiro alto moldeador y tejido a prueba de sentadillas profundas.",
      en: "Buttery-soft Nulu™ fabric high-rise leggings. Squat-proof coverage and waist-sculpting band."
    },
    variants: ["Talla XS (24-25)", "Talla S (26-27)", "Talla M (28-29)", "Talla L (30-32)"]
  },
  {
    id: "essential-tee",
    name: {
      es: "NEXA FIT · Essential Training Athletic Tee",
      en: "NEXA FIT · Essential Training Athletic Tee"
    },
    brand: "NEXA FIT",
    category: "ropa",
    originalPriceUSD: 20.90,
    priceUSD: 12.90,
    price: 12.90,
    tag: {
      es: "💥 LANZAMIENTO -38%",
      en: "💥 LAUNCH DEAL -38%"
    },
    image: "assets/essential-tee.png",
    desc: {
      es: "Algodón elástico ultra suave con corte atlético que ajusta el pecho y los brazos, ofreciendo máxima holgura al entrenar.",
      en: "Ultra-soft stretch cotton with athletic taper hugging chest and arms while keeping full mobility."
    },
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "performance-shorts",
    name: {
      es: "NEXA FIT · Performance Shorts 7” con Forro",
      en: "NEXA FIT · Performance 7” Shorts with Liner"
    },
    brand: "NEXA FIT",
    category: "ropa",
    originalPriceUSD: 26.90,
    priceUSD: 15.90,
    price: 15.90,
    tag: {
      es: "⚡ PROMO -40%",
      en: "⚡ PROMO -40%"
    },
    image: "assets/shorts.png",
    desc: {
      es: "Tejido elástico de secado ultra rápido con forro interior de compresión y bolsillo antideslizante para smartphone.",
      en: "Quick-dry 7\" workout shorts with built-in compression liner and anti-bounce phone pocket."
    },
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  },
  {
    id: "seamless-leggings",
    name: {
      es: "NEXA FIT · Seamless Sculpt Leggings",
      en: "NEXA FIT · Seamless Sculpt Leggings"
    },
    brand: "NEXA FIT",
    category: "ropa",
    originalPriceUSD: 36.90,
    priceUSD: 22.90,
    price: 22.90,
    tag: {
      es: "🔥 POPULAR -38%",
      en: "🔥 POPULAR -38%"
    },
    image: "assets/leggings.png",
    desc: {
      es: "Tecnología sin costuras con pretina de compresión alta que moldea la cintura y tejido a prueba de sentadillas.",
      en: "Seamless knit technology with high-rise waist sculpting band and 100% squat-proof fabric."
    },
    variants: ["Talla XS", "Talla S", "Talla M", "Talla L"]
  },
  {
    id: "oversized-hoodie",
    name: {
      es: "NEXA FIT · Oversized Rest Day Hoodie 420 GSM",
      en: "NEXA FIT · Oversized Rest Day Hoodie 420 GSM"
    },
    brand: "NEXA FIT",
    category: "ropa",
    originalPriceUSD: 44.90,
    priceUSD: 27.90,
    price: 27.90,
    tag: {
      es: "⚡ PREMIUM -37%",
      en: "⚡ PREMIUM -37%"
    },
    image: "assets/hoodie.png",
    desc: {
      es: "Algodón pesado perchado de 420 GSM para abrigar antes y después de cada sesión intensa. Ajuste holgado estético.",
      en: "Heavyweight 420 GSM fleece-lined hoodie for pre and post-workout warmth. Aesthetic oversized fit."
    },
    variants: ["Talla S", "Talla M", "Talla L", "Talla XL"]
  }
];

// Estado global de la aplicación
const state = {
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
};

// Elementos del DOM
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");
const sortSelect = document.getElementById("sortSelect");

const shippingProgressText = document.getElementById("shippingProgressText");
const shippingBarFill = document.getElementById("shippingBarFill");

// Checkout Elements
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDiscountRow = document.getElementById("checkoutDiscountRow");
const checkoutDiscount = document.getElementById("checkoutDiscount");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutGrandTotal = document.getElementById("checkoutGrandTotal");
const checkoutTotal = document.getElementById("checkoutTotal");

// 3D Card & Inputs
const creditCard3D = document.getElementById("creditCard3D");
const cardNumberInput = document.getElementById("cardNumberInput");
const cardholderNameInput = document.getElementById("cardholderName");
const cardExpiryInput = document.getElementById("cardExpiryInput");
const cardCvcInput = document.getElementById("cardCvcInput");
const cardBrandBadge = document.getElementById("cardBrandBadge");
const cardErrors = document.getElementById("cardErrors");
const placeOrderButton = document.getElementById("placeOrderButton");

const cardNumberDisplay = document.getElementById("cardNumberDisplay");
const cardHolderDisplay = document.getElementById("cardHolderDisplay");
const cardExpiryDisplay = document.getElementById("cardExpiryDisplay");
const cardCvvDisplay = document.getElementById("cardCvvDisplay");
const cardBrandDisplay = document.getElementById("cardBrandDisplay");

// Quick View Modal Elements
const quickViewModal = document.getElementById("quickViewModal");
const closeQuickView = document.getElementById("closeQuickView");
const quickViewImg = document.getElementById("quickViewImg");
const quickViewCategory = document.getElementById("quickViewCategory");
const quickViewTitle = document.getElementById("quickViewTitle");
const quickViewDesc = document.getElementById("quickViewDesc");
const quickViewPrice = document.getElementById("quickViewPrice");
const variantOptions = document.getElementById("variantOptions");
const quickViewAddBtn = document.getElementById("quickViewAddBtn");

// Tracking Modal Elements
const trackingModal = document.getElementById("trackingModal");
const trackOrderNavBtn = document.getElementById("trackOrderNavBtn");
const footerTrackBtn = document.getElementById("footerTrackBtn");
const mobileTrackBtn = document.getElementById("mobileTrackBtn");
const closeTracking = document.getElementById("closeTracking");
const trackingForm = document.getElementById("trackingForm");
const trackingInput = document.getElementById("trackingInput");
const trackingResult = document.getElementById("trackingResult");
const trackingStatusBadge = document.getElementById("trackingStatusBadge");
const trackingTimeline = document.getElementById("trackingTimeline");
const trackingDetailsBox = document.getElementById("trackingDetailsBox");

// Receipt Modal Elements
const receiptModal = document.getElementById("receiptModal");
const receiptOrderId = document.getElementById("receiptOrderId");
const receiptDate = document.getElementById("receiptDate");
const receiptCustomerName = document.getElementById("receiptCustomerName");
const receiptAddress = document.getElementById("receiptAddress");
const receiptPaymentMethod = document.getElementById("receiptPaymentMethod");
const receiptAuthCode = document.getElementById("receiptAuthCode");
const receiptTotalAmount = document.getElementById("receiptTotalAmount");
const closeReceiptButton = document.getElementById("closeReceiptButton");
const printReceiptBtn = document.getElementById("printReceiptBtn");

// Toast
const toast = document.getElementById("toast");

// ==========================================================================
// UTILIDADES Y FORMATEO
// ==========================================================================


function formatPrice(amountUSD) {
  const curr = CURRENCIES[state.currency] || CURRENCIES.USD;
  const converted = Number(amountUSD || 0) * curr.rate;
  if (curr.code === "COP" || curr.code === "CLP") {
    return `${curr.symbol}${Math.round(converted).toLocaleString("es-PE")}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}

function formatPEN(amount) {
  return formatPrice(amount);
}

function updatePageLanguage() {
  const lang = getLang();
  const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.es;

  // Announcement
  const annEl = document.getElementById("announcementText");
  if (annEl) {
    annEl.innerHTML = `<span class="announcement-dot"></span> ${dict.announcement}`;
  }

  // Hamburger Menu
  const menuBtnText = document.querySelector(".menu-btn-text");
  if (menuBtnText) menuBtnText.textContent = dict.menu;

  // Desktop Nav Links
  const navLinks = document.querySelectorAll(".desktop-nav .nav-item-link");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === "#shop" && !link.classList.contains("has-dropdown")) link.textContent = dict.nav_all;
    else if (link.dataset.filterLink === "ropa") link.innerHTML = `${dict.nav_gym_wear} <span class="dropdown-arrow">▾</span>`;
    else if (link.dataset.filterLink === "suplementos") link.innerHTML = `${dict.nav_supplements} <span class="dropdown-arrow">▾</span>`;
    else if (link.getAttribute("href") === "#collections") link.textContent = dict.nav_collection_2026;
  });

  // Hero Section
  const heroEyebrow = document.querySelector(".hero .eyebrow");
  if (heroEyebrow) heroEyebrow.textContent = dict.hero_eyebrow;

  const heroH1 = document.querySelector(".hero h1");
  if (heroH1) heroH1.textContent = dict.hero_title;

  const heroP = document.querySelector(".hero .hero-text");
  if (heroP) heroP.textContent = dict.hero_text;

  const heroBtns = document.querySelectorAll(".hero-actions a");
  if (heroBtns.length >= 2) {
    heroBtns[0].textContent = dict.btn_shop_clothing;
    heroBtns[1].textContent = dict.btn_view_supplements;
  }

  // Athlete Badge
  const badgeTitle = document.querySelector(".athlete-badge strong");
  if (badgeTitle) badgeTitle.textContent = `✓ ${dict.certified_quality_title}`;

  const badgeSub = document.querySelector(".athlete-badge small");
  if (badgeSub) badgeSub.textContent = dict.certified_quality_sub;

  // Value Proposition Cards (Below Hero)
  const propTitles = document.querySelectorAll(".prop-card strong");
  const propSubs = document.querySelectorAll(".prop-card small");
  if (propTitles.length >= 4 && propSubs.length >= 4) {
    propTitles[0].textContent = dict.certified_quality_title;
    propSubs[0].textContent = dict.certified_quality_sub;
    propTitles[1].textContent = dict.express_shipping_title;
    propSubs[1].textContent = dict.express_shipping_sub;
    propTitles[2].textContent = dict.secure_payment_title;
    propSubs[2].textContent = dict.secure_payment_sub;
    propTitles[3].textContent = dict.satisfaction_title;
    propSubs[3].textContent = dict.satisfaction_sub;
  }

  // Section Head
  const sectionTitle = document.querySelector(".section-head h2");
  if (sectionTitle) sectionTitle.textContent = dict.official_catalog_title;

  // Filter Chips
  document.querySelectorAll(".filter-chip").forEach(chip => {
    if (chip.dataset.filter === "todos") chip.textContent = dict.filter_all;
    else if (chip.dataset.filter === "ropa") chip.textContent = dict.filter_clothing;
    else if (chip.dataset.filter === "suplementos") chip.textContent = dict.filter_supplements;
  });

  // Track Button
  const trackBtnText = document.querySelector(".track-btn-text");
  if (trackBtnText) trackBtnText.textContent = dict.track_order;

  // Cart Button
  const cartBtnText = document.querySelector("#cartButton");
  if (cartBtnText) {
    const countSpan = document.getElementById("cartCount");
    const count = countSpan ? countSpan.textContent : "0";
    cartBtnText.innerHTML = `${dict.cart_bag} <span id="cartCount">${count}</span>`;
  }

  // Cart Drawer Title
  const cartTitle = document.querySelector(".cart-drawer-head h3");
  if (cartTitle) cartTitle.textContent = dict.shopping_bag_title;

  // Checkout Button
  if (checkoutButton) checkoutButton.textContent = dict.checkout_now_btn;

  // Checkout Modal Header
  const checkoutTitle = document.querySelector(".checkout-head h2");
  if (checkoutTitle) checkoutTitle.textContent = dict.checkout_modal_title;

  const checkoutSubtitle = document.querySelector(".checkout-subtitle");
  if (checkoutSubtitle) checkoutSubtitle.textContent = dict.checkout_modal_subtitle;

  // Contact Step Title
  const contactStepHeader = document.querySelector("#checkoutForm h3");
  if (contactStepHeader) contactStepHeader.textContent = dict.contact_step_title;

  // Form Labels in Checkout
  const formLabels = document.querySelectorAll("#checkoutForm label");
  formLabels.forEach(lbl => {
    const text = lbl.textContent.trim();
    if (text.includes("Nombre Completo") || text.includes("Full Name")) lbl.innerHTML = `${dict.lbl_full_name} <span class="req">*</span>`;
    else if (text.includes("Correo") || text.includes("Email")) lbl.innerHTML = `${dict.lbl_email} <span class="req">*</span>`;
    else if (text.includes("Teléfono") || text.includes("Phone")) lbl.innerHTML = `${dict.lbl_phone} <span class="req">*</span>`;
    else if (text.includes("Dirección") || text.includes("Address")) lbl.innerHTML = `${dict.lbl_address} <span class="req">*</span>`;
    else if (text.includes("Ciudad") || text.includes("City")) lbl.innerHTML = `${dict.lbl_city} <span class="req">*</span>`;
    else if (text.includes("Número de Tarjeta") || text.includes("Card Number")) lbl.innerHTML = `${dict.lbl_card_number} <span class="req">*</span>`;
    else if (text.includes("Vencimiento") || text.includes("Expiration")) lbl.innerHTML = `${dict.lbl_exp_date} <span class="req">*</span>`;
    else if (text.includes("CVV") || text.includes("CVC")) lbl.innerHTML = `${dict.lbl_cvv} <span class="req">*</span>`;
    else if (text.includes("Titular") || text.includes("Cardholder")) lbl.innerHTML = `${dict.lbl_cardholder} <span class="req">*</span>`;
  });

  // Place Order Button
  if (placeOrderButton) placeOrderButton.textContent = dict.complete_order_btn;

  // Search Placeholders
  const globalSearch = document.getElementById("globalSearch");
  if (globalSearch) globalSearch.placeholder = dict.search_placeholder;

  const drawerSearchInput = document.getElementById("drawerSearchInput");
  if (drawerSearchInput) drawerSearchInput.placeholder = dict.search_placeholder;
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

  // Actualizar idioma de la interfaz según la moneda elegida
  updatePageLanguage();

  // Re-renderizar catálogo y carrito
  renderProducts();
  renderCart();
  if (checkoutModal && checkoutModal.classList.contains("active")) {
    renderCheckoutSummary();
  }
  const lang = getLang();
  showToast(lang === "en" ? `Currency set to ${CURRENCIES[newCurrency].name}` : `Moneda actualizada a ${CURRENCIES[newCurrency].name}`);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 3200);
}

// Algoritmo de Luhn
function validateLuhn(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");
  if (!digits || digits.length < 13) return false;

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

// ==========================================================================
// CONFIGURACIÓN Y DETECCIÓN INTELIGENTE DE FRANQUICIAS DE TARJETAS
// ==========================================================================

const CARD_BRAND_CONFIG = {
  mastercard: {
    name: "Mastercard",
    theme: "card-theme-mastercard",
    badgeClass: "badge-mastercard",
    maxLength: 16,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-mastercard">
        <svg viewBox="0 0 36 24" width="36" height="24" class="brand-svg">
          <circle cx="13" cy="12" r="9" fill="#EB001B"/>
          <circle cx="23" cy="12" r="9" fill="#F79E1B" fill-opacity="0.92"/>
          <path d="M18 6.6a9 9 0 0 1 0 10.8 9 9 0 0 1 0-10.8z" fill="#FF5F00"/>
        </svg>
        <span class="brand-name-sub">Mastercard</span>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 36 24" width="22" height="15" class="badge-svg">
        <circle cx="13" cy="12" r="9" fill="#EB001B"/>
        <circle cx="23" cy="12" r="9" fill="#F79E1B" fill-opacity="0.92"/>
        <path d="M18 6.6a9 9 0 0 1 0 10.8 9 9 0 0 1 0-10.8z" fill="#FF5F00"/>
      </svg>
      <span class="brand-text">Mastercard</span>
    `
  },
  visa: {
    name: "Visa",
    theme: "card-theme-visa",
    badgeClass: "badge-visa",
    maxLength: 16,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-visa">
        <svg viewBox="0 0 44 24" width="44" height="24" class="brand-svg">
          <text x="22" y="18" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-style="italic" font-size="18" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">VISA</text>
        </svg>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 38 18" width="28" height="14" class="badge-svg">
        <text x="19" y="15" font-family="'Inter', Arial, sans-serif" font-weight="900" font-style="italic" font-size="15" fill="#00D2FF" text-anchor="middle" letter-spacing="1">VISA</text>
      </svg>
    `
  },
  amex: {
    name: "American Express",
    theme: "card-theme-amex",
    badgeClass: "badge-amex",
    maxLength: 15,
    cvvLength: 4,
    displayHtml: `
      <div class="brand-logo-card brand-amex">
        <svg viewBox="0 0 48 24" width="48" height="24" class="brand-svg">
          <rect width="48" height="24" rx="4" fill="#006FCF"/>
          <text x="24" y="16" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">AMEX</text>
        </svg>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 38 18" width="28" height="14" class="badge-svg">
        <text x="19" y="14" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">AMEX</text>
      </svg>
    `
  },
  diners: {
    name: "Diners Club",
    theme: "card-theme-diners",
    badgeClass: "badge-diners",
    maxLength: 14,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-diners">
        <svg viewBox="0 0 44 24" width="44" height="24" class="brand-svg">
          <rect width="44" height="24" rx="4" fill="#0079BE"/>
          <circle cx="22" cy="12" r="7.5" fill="none" stroke="#ffffff" stroke-width="2.5"/>
          <line x1="22" y1="4.5" x2="22" y2="19.5" stroke="#0079BE" stroke-width="2.5"/>
        </svg>
        <span class="brand-name-sub">Diners</span>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 36 20" width="20" height="12" class="badge-svg">
        <circle cx="18" cy="10" r="6" fill="none" stroke="#0079BE" stroke-width="2"/>
        <line x1="18" y1="4" x2="18" y2="16" stroke="#ffffff" stroke-width="2"/>
      </svg>
      <span class="brand-text">Diners</span>
    `
  },
  discover: {
    name: "Discover",
    theme: "card-theme-discover",
    badgeClass: "badge-discover",
    maxLength: 16,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-discover">
        <svg viewBox="0 0 52 24" width="52" height="24" class="brand-svg">
          <rect width="52" height="24" rx="4" fill="#1b1c20"/>
          <text x="14" y="16" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="8.5" fill="#FFFFFF" text-anchor="middle">DISC</text>
          <circle cx="26" cy="12" r="4.2" fill="#FF6000"/>
          <text x="38" y="16" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="8.5" fill="#FFFFFF" text-anchor="middle">VER</text>
        </svg>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 36 20" width="20" height="12" class="badge-svg">
        <rect width="36" height="20" rx="3" fill="#FF6000"/>
        <text x="18" y="14" font-family="'Inter', Arial, sans-serif" font-weight="900" font-size="8" fill="#FFFFFF" text-anchor="middle">DISC</text>
      </svg>
      <span class="brand-text">Discover</span>
    `
  },
  jcb: {
    name: "JCB",
    theme: "card-theme-jcb",
    badgeClass: "badge-jcb",
    maxLength: 16,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-jcb">
        <svg viewBox="0 0 40 24" width="40" height="24" class="brand-svg">
          <rect x="2" y="3" width="10.5" height="18" rx="2.5" fill="#007940"/>
          <rect x="14.5" y="3" width="10.5" height="18" rx="2.5" fill="#E60012"/>
          <rect x="27" y="3" width="10.5" height="18" rx="2.5" fill="#0066B3"/>
          <text x="7.2" y="16" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">J</text>
          <text x="19.7" y="16" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">C</text>
          <text x="32.2" y="16" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">B</text>
        </svg>
      </div>
    `,
    badgeHtml: `
      <span class="brand-text">JCB</span>
    `
  },
  unionpay: {
    name: "UnionPay",
    theme: "card-theme-default",
    badgeClass: "badge-default",
    maxLength: 19,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-default">
        <span class="brand-name-sub" style="color: #ff3b5c;">UnionPay</span>
      </div>
    `,
    badgeHtml: `<span class="brand-text">UnionPay</span>`
  },
  maestro: {
    name: "Maestro",
    theme: "card-theme-mastercard",
    badgeClass: "badge-mastercard",
    maxLength: 19,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-mastercard">
        <svg viewBox="0 0 36 24" width="36" height="24" class="brand-svg">
          <circle cx="13" cy="12" r="9" fill="#EB001B"/>
          <circle cx="23" cy="12" r="9" fill="#0066B3" fill-opacity="0.92"/>
        </svg>
        <span class="brand-name-sub">Maestro</span>
      </div>
    `,
    badgeHtml: `<span class="brand-text">Maestro</span>`
  },
  tarjeta: {
    name: "Tarjeta",
    theme: "card-theme-default",
    badgeClass: "badge-default",
    maxLength: 16,
    cvvLength: 3,
    displayHtml: `
      <div class="brand-logo-card brand-default">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
        <span class="brand-name-sub">TARJETA</span>
      </div>
    `,
    badgeHtml: `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
      <span class="brand-text">TARJETA</span>
    `
  }
};

// Detección inteligente en tiempo real de franquicia
function detectCardBrand(number) {
  const clean = String(number || "").replace(/\D/g, "");
  if (!clean) return "tarjeta";
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(clean)) return "mastercard";
  if (clean.length === 1 && clean === "5") return "mastercard";
  if (clean.length >= 1 && /^2[2-7]/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^3(?:0[0-5]|[689]|095)/.test(clean)) return "diners";
  if (/^(?:2131|1800|35)/.test(clean)) return "jcb";
  if (/^(6011|65|64[4-9]|622)/.test(clean)) return "discover";
  if (/^(50|5[6-8]|67)/.test(clean)) return "maestro";
  if (/^(62|81)/.test(clean)) return "unionpay";
  if (clean.length === 1 && clean === "6") return "discover";
  return "tarjeta";
}

// Formateo visual dinámico según tipo de tarjeta (Amex 4-6-5, Diners 4-6-4, Standard 4-4-4-4)
function formatCardNumber(value, brand) {
  const clean = String(value || "").replace(/\D/g, "");
  if (brand === "amex") {
    return clean.replace(/^(\d{4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));
  } else if (brand === "diners" && clean.length <= 14) {
    return clean.replace(/^(\d{4})(\d{0,6})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));
  } else {
    return clean.replace(/(.{4})/g, "$1 ").trim();
  }
}

// Sincronización y actualización visual reactiva de la tarjeta 3D y badges
function updateCardBrandUI(brandKey) {
  const config = CARD_BRAND_CONFIG[brandKey] || CARD_BRAND_CONFIG.tarjeta;

  if (cardBrandDisplay) {
    cardBrandDisplay.innerHTML = config.displayHtml;
  }

  if (creditCard3D) {
    creditCard3D.className = `interactive-card ${config.theme}`;
  }

  if (cardBrandBadge) {
    cardBrandBadge.className = `card-brand-badge ${config.badgeClass}`;
    cardBrandBadge.innerHTML = config.badgeHtml;
  }

  const pills = document.querySelectorAll(".accepted-card-pill");
  pills.forEach((pill) => {
    if (brandKey !== "tarjeta") {
      if (pill.dataset.brand === brandKey) {
        pill.classList.add("active-pill");
        pill.classList.remove("dimmed-pill");
      } else {
        pill.classList.remove("active-pill");
        pill.classList.add("dimmed-pill");
      }
    } else {
      pill.classList.remove("active-pill");
      pill.classList.remove("dimmed-pill");
    }
  });

  if (cardCvcInput) {
    cardCvcInput.maxLength = config.cvvLength;
    cardCvcInput.placeholder = config.cvvLength === 4 ? "1234" : "123";
  }
}

// ==========================================================================
// RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
// ==========================================================================

function renderProducts() {
  let list = PRODUCTS.filter((product) => {
    const matchesFilter = state.filter === "todos" || product.category === state.filter;
    const matchesBrand = !state.selectedBrand || (product.brand && product.brand.toLowerCase() === state.selectedBrand.toLowerCase());
    const query = state.searchQuery ? state.searchQuery.toLowerCase().trim() : "";
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query)) ||
      (product.tag && product.tag.toLowerCase().includes(query));
    return matchesFilter && matchesBrand && matchesSearch;
  });

  // Ordenamiento
  if (state.sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (list.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--off-white); border-radius: var(--radius-md);">
        <h3 style="font-size: 20px; font-weight: 900; margin-bottom: 8px;">No se encontraron productos</h3>
        <p style="font-size: 13px; color: var(--gray);">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = list
    .map(
      (product) => {
        const origPriceFormatted = product.originalPriceUSD ? formatPEN(product.originalPriceUSD) : null;
        const currentPriceFormatted = formatPEN(product.price);
        const nameText = getBilingualText(product.name);
        const descText = getBilingualText(product.desc);
        const tagText = getBilingualText(product.tag);
        const lang = getLang();
        const quickViewText = lang === "en" ? "👁️ QUICK VIEW" : "👁️ VISTA RÁPIDA";
        const addBtnText = lang === "en" ? "+ ADD TO BAG" : "+ AGREGAR";

        return `
      <article class="product-card">
        <div class="product-media">
          <span class="product-tag">${tagText}</span>
          <img src="${product.image}" alt="${nameText}" loading="lazy" decoding="async" width="300" height="300" onload="this.parentElement.classList.add('loaded')">
          <button class="quick-view-btn" data-quickview-id="${product.id}">
            ${quickViewText}
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.brand ? `${product.brand.toUpperCase()} · ` : ''}${product.category.toUpperCase()}</span>
          <h3 class="product-name">${nameText}</h3>
          <p class="product-desc">${descText}</p>
          <div class="product-bottom">
            <div class="product-price-box">
              ${origPriceFormatted ? `<span class="product-orig-price">${origPriceFormatted}</span>` : ''}
              <span class="product-price">${currentPriceFormatted}</span>
            </div>
            <button class="quick-add-btn" data-add-id="${product.id}">${addBtnText}</button>
          </div>
        </div>
      </article>
    `;
      }
    )
    .join("");
}

// ==========================================================================
// CÁLCULO Y RENDERIZADO DEL CARRITO
// ==========================================================================

function getCartTotals() {
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
}

function renderCart() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
  triggerCartBounce();

  const { netSubtotal } = getCartTotals();

  // Barra de progreso de envío gratis
  if (shippingProgressText && shippingBarFill) {
    if (netSubtotal >= 199) {
      shippingProgressText.textContent = "🎉 ¡Felicidades! Calificas para ENVÍO GRATIS";
      shippingBarFill.style.width = "100%";
      shippingBarFill.style.background = "var(--success)";
    } else {
      const remaining = 199 - netSubtotal;
      const pct = Math.min(100, (netSubtotal / 199) * 100);
      shippingProgressText.textContent = `Agrega ${formatPEN(remaining)} más para ENVÍO GRATIS`;
      shippingBarFill.style.width = `${pct}%`;
      shippingBarFill.style.background = "var(--lime-dark)";
    }
  }

  if (state.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Tu bolsa de compras está vacía.</p>
        <button class="button button-dark" onclick="closeDrawer(); document.getElementById('shop').scrollIntoView({behavior: 'smooth'});">
          EXPLORAR PRODUCTOS
        </button>
      </div>
    `;
    cartSubtotal.textContent = formatPEN(0);
    return;
  }

  cartItems.innerHTML = state.cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return "";

      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-info">
            <strong>${product.name}</strong>
            <span class="cart-item-variant">${item.variant || 'Estándar'}</span>
            <span class="cart-item-price">${formatPEN(product.price)}</span>
            <div class="quantity-controls">
              <button data-qty-change="${item.id}" data-action="dec" data-variant="${item.variant || ''}">-</button>
              <span>${item.quantity}</span>
              <button data-qty-change="${item.id}" data-action="inc" data-variant="${item.variant || ''}">+</button>
            </div>
          </div>
          <button class="remove-item" data-remove="${item.id}" data-variant="${item.variant || ''}" title="Eliminar producto">×</button>
        </div>
      `;
    })
    .join("");

  cartSubtotal.textContent = formatPEN(netSubtotal);
}

function renderCheckoutSummary() {
  if (state.cart.length === 0) {
    checkoutItems.innerHTML = "<p style='color: var(--gray); font-size: 13px;'>No hay productos en tu bolsa.</p>";
    return;
  }

  checkoutItems.innerHTML = state.cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return "";
      return `
        <div class="checkout-item-row">
          <span>${product.name} (${item.variant || 'Normal'}) × ${item.quantity}</span>
          <strong>${formatPEN(product.price * item.quantity)}</strong>
        </div>
      `;
    })
    .join("");

  const { subtotal, discountAmount, netSubtotal, shipping, grandTotal } = getCartTotals();
  checkoutSubtotal.textContent = formatPEN(subtotal);

  if (discountAmount > 0) {
    checkoutDiscountRow.style.display = "flex";
    checkoutDiscount.textContent = `-${formatPEN(discountAmount)}`;
  } else {
    checkoutDiscountRow.style.display = "none";
  }

  checkoutShipping.textContent = shipping === 0 ? "GRATIS" : formatPEN(shipping);
  checkoutGrandTotal.textContent = formatPEN(grandTotal);
  checkoutTotal.textContent = formatPEN(grandTotal);
}

// ==========================================================================
// GESTIÓN DE MODALES Y DRAWERS
// ==========================================================================

function openDrawer() {
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeDrawer() {
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function openCheckout() {
  if (state.cart.length === 0) {
    showToast("⚠️ Tu bolsa está vacía. Selecciona un producto para comprar.");
    return;
  }
  closeDrawer();
  renderCheckoutSummary();
  updateCardBrandUI(detectCardBrand(cardNumberInput ? cardNumberInput.value : ""));
  checkoutModal.setAttribute("aria-hidden", "false");
  checkoutModal.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeCheckoutModal() {
  checkoutModal.setAttribute("aria-hidden", "true");
  checkoutModal.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function closeAllModals() {
  closeDrawer();
  closeCheckoutModal();
  if (mobileMenu) {
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.classList.remove("active");
  }
  if (quickViewModal) {
    quickViewModal.setAttribute("aria-hidden", "true");
    quickViewModal.classList.remove("active");
  }
  if (trackingModal) {
    trackingModal.setAttribute("aria-hidden", "true");
    trackingModal.classList.remove("active");
  }
  if (receiptModal) {
    receiptModal.setAttribute("aria-hidden", "true");
    receiptModal.classList.remove("active");
  }
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// ==========================================================================
// VISTA RÁPIDA (QUICK VIEW)
// ==========================================================================

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.currentQuickViewProduct = product;
  state.selectedVariant = product.variants ? product.variants[0] : "Estándar";

  quickViewImg.src = product.image;
  quickViewImg.alt = product.name;
  quickViewCategory.textContent = `${product.brand ? `${product.brand.toUpperCase()} · ` : ''}${product.category.toUpperCase()}`;
  quickViewTitle.textContent = product.name;
  quickViewDesc.textContent = product.desc;
  quickViewPrice.textContent = formatPEN(product.price);

  if (product.variants && product.variants.length > 0) {
    variantOptions.innerHTML = product.variants
      .map(
        (v, i) => `
        <button type="button" class="variant-btn ${i === 0 ? 'active' : ''}" data-variant-choice="${v}">
          ${v}
        </button>
      `
      )
      .join("");
  } else {
    variantOptions.innerHTML = `<span style="font-size: 12px; color: var(--gray);">Presentación estándar</span>`;
  }

  quickViewModal.setAttribute("aria-hidden", "false");
  quickViewModal.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

if (closeQuickView) {
  closeQuickView.addEventListener("click", closeAllModals);
}

if (variantOptions) {
  variantOptions.addEventListener("click", (e) => {
    if (e.target.dataset.variantChoice) {
      document.querySelectorAll(".variant-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      state.selectedVariant = e.target.dataset.variantChoice;
    }
  });
}

if (quickViewAddBtn) {
  quickViewAddBtn.addEventListener("click", () => {
    if (!state.currentQuickViewProduct) return;
    const prodId = state.currentQuickViewProduct.id;
    const variant = state.selectedVariant || (state.currentQuickViewProduct.variants ? state.currentQuickViewProduct.variants[0] : "Estándar");

    const existing = state.cart.find(i => i.id === prodId && i.variant === variant);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ id: prodId, quantity: 1, variant });
    }

    closeAllModals();
    renderCart();
    openDrawer();
    showToast(`✓ Agregado: ${state.currentQuickViewProduct.name} (${variant})`);
  });
}

// ==========================================================================
// RASTREADOR DE PEDIDOS (ORDER TRACKING)
// ==========================================================================

function openTrackingModal() {
  closeAllModals();
  trackingResult.style.display = "none";
  trackingInput.value = "";
  trackingModal.setAttribute("aria-hidden", "false");
  trackingModal.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

if (trackOrderNavBtn) trackOrderNavBtn.addEventListener("click", openTrackingModal);
if (footerTrackBtn) footerTrackBtn.addEventListener("click", openTrackingModal);
if (mobileTrackBtn) mobileTrackBtn.addEventListener("click", openTrackingModal);
if (closeTracking) closeTracking.addEventListener("click", closeAllModals);

if (trackingForm) {
  trackingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const orderCode = trackingInput.value.trim().toUpperCase();
    if (!orderCode) return;

    try {
      showToast("🔍 Consultando pedido en almacén...");
      const response = await fetch(`/api/orders/${encodeURIComponent(orderCode)}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Pedido no encontrado");
      }

      const order = data.order;
      trackingStatusBadge.textContent = `🟢 ${order.status}`;
      
      // Render timeline
      trackingTimeline.innerHTML = order.timeline
        .map(
          (step) => `
          <div class="timeline-step ${step.done ? 'completed' : ''}">
            <div class="timeline-dot"></div>
            <strong>${step.title}</strong>
            <p>${step.desc} ${step.time ? `<br><small style="color: var(--gray);">${new Date(step.time).toLocaleDateString('es-PE')} ${new Date(step.time).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}</small>` : ''}</p>
          </div>
        `
        )
        .join("");

      // Render summary details
      const itemsText = order.items.map(i => `${i.name} (${i.variant || 'Normal'}) x${i.quantity}`).join(", ");
      trackingDetailsBox.innerHTML = `
        <div class="receipt-row"><span>Destino:</span><strong>${order.customer.address}, ${order.customer.city} (${order.customer.region})</strong></div>
        <div class="receipt-row"><span>Destinatario:</span><strong>${order.customer.name}</strong></div>
        <div class="receipt-row"><span>Productos:</span><strong>${itemsText}</strong></div>
        <div class="receipt-row total-row"><span>Total Pagado:</span><strong>${formatPEN(order.orderSummary.total / 100)}</strong></div>
      `;

      trackingResult.style.display = "block";
    } catch (err) {
      showToast(`❌ ${err.message}`);
    }
  });
}

// ==========================================================================
// INTERACCIÓN Y FÍSICA DE LA TARJETA 3D
// ==========================================================================

// Efecto de inclinación por mouse (3D Parallax Tilt)
if (creditCard3D) {
  const cardWrapper = creditCard3D.parentElement;
  
  cardWrapper.addEventListener("mousemove", (e) => {
    if (creditCard3D.classList.contains("flipped")) return;
    const rect = cardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 18;
    const rotY = (x / rect.width) * 18;

    creditCard3D.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  cardWrapper.addEventListener("mouseleave", () => {
    if (!creditCard3D.classList.contains("flipped")) {
      creditCard3D.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  });

  // Clic directo en la tarjeta para voltear manualmente
  creditCard3D.addEventListener("click", () => {
    creditCard3D.classList.toggle("flipped");
    if (!creditCard3D.classList.contains("flipped")) {
      creditCard3D.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  });
}

// Formateo y detección inteligente en tiempo real del número de tarjeta
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    const brand = detectCardBrand(rawValue);
    const config = CARD_BRAND_CONFIG[brand] || CARD_BRAND_CONFIG.tarjeta;

    if (rawValue.length > config.maxLength) {
      rawValue = rawValue.slice(0, config.maxLength);
    }

    const formatted = formatCardNumber(rawValue, brand);
    e.target.value = formatted;

    updateCardBrandUI(brand);

    if (cardNumberDisplay) {
      if (rawValue.length > 0) {
        const mask = brand === "amex" ? "•••• •••••• •••••" : (brand === "diners" ? "•••• •••••• ••••" : "•••• •••• •••• ••••");
        cardNumberDisplay.textContent = formatted.padEnd(mask.length, "•");
      } else {
        cardNumberDisplay.textContent = brand === "amex" ? "•••• •••••• •••••" : (brand === "diners" ? "•••• •••••• ••••" : "•••• •••• •••• ••••");
      }
    }

    // Validación visual de Luhn mientras se escribe
    const minLen = brand === "diners" ? 14 : (brand === "amex" ? 15 : 16);
    if (rawValue.length >= minLen) {
      if (validateLuhn(rawValue)) {
        cardNumberInput.style.borderColor = "var(--success)";
      } else {
        cardNumberInput.style.borderColor = "var(--danger)";
      }
    } else {
      cardNumberInput.style.borderColor = "var(--line)";
    }
  });
}

if (cardholderNameInput) {
  cardholderNameInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    cardHolderDisplay.textContent = val ? val.toUpperCase() : "NOMBRE Y APELLIDO";
  });
}

if (cardExpiryInput) {
  cardExpiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2), 10);
      if (month > 12) month = 12;
      if (month === 0) month = 1;
      const formattedMonth = String(month).padStart(2, "0");
      value = formattedMonth + "/" + value.slice(2);
    }
    e.target.value = value;
    cardExpiryDisplay.textContent = value || "MM/YY";
  });
}

if (cardCvcInput) {
  cardCvcInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    e.target.value = value;
    cardCvvDisplay.textContent = value ? "•".repeat(value.length) : "•••";
  });

  cardCvcInput.addEventListener("focus", () => {
    creditCard3D.classList.add("flipped");
    creditCard3D.style.transform = "rotateY(180deg)";
  });

  cardCvcInput.addEventListener("blur", () => {
    creditCard3D.classList.remove("flipped");
    creditCard3D.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

// ==========================================================================
// ANIMACIÓN DE CONFETI EN CANVAS (CELEBRACIÓN DE COMPRA)
// ==========================================================================

function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ["#d7ff3f", "#ffffff", "#7d2cf4", "#10b981", "#38bdf8"];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 3,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 8 - 4
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (pieces.some((p) => p.y < canvas.height)) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}

// ==========================================================================
// ENVÍO Y PROCESAMIENTO DEL CHECKOUT AL BACKEND
// ==========================================================================

if (checkoutForm) {
  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    cardErrors.classList.remove("visible");
    cardErrors.textContent = "";

    const formData = new FormData(checkoutForm);
    const firstName = formData.get("firstName") || "";
    const lastName = formData.get("lastName") || "";
    const documentVal = formData.get("document") || "";
    const region = formData.get("region") || "";
    const city = formData.get("city") || "";
    const address = formData.get("address") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const apartment = formData.get("apartment") || "";
    const notes = formData.get("notes") || "";

    const cardNumber = formData.get("cardNumber") || "";
    const cardholderName = formData.get("cardholderName") || "";
    const cardExpiry = formData.get("cardExpiry") || "";
    const cardCvc = formData.get("cardCvc") || "";
    const installments = formData.get("installments") || "1";

    const rawCard = cardNumber.replace(/\D/g, "");
    if (!rawCard || rawCard.length < 13) {
      cardErrors.textContent = "Por favor ingresa un número de tarjeta válido.";
      cardErrors.classList.add("visible");
      return;
    }

    if (!validateLuhn(rawCard)) {
      cardErrors.textContent = "El número de tarjeta no pasó la prueba de validación matemática (Luhn). Revisa los dígitos.";
      cardErrors.classList.add("visible");
      return;
    }

    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      cardErrors.textContent = "Ingresa la fecha de vencimiento en formato MM/YY.";
      cardErrors.classList.add("visible");
      return;
    }

    if (!cardCvc || cardCvc.length < 3) {
      cardErrors.textContent = "El código CVV / CVC debe contener 3 o 4 dígitos.";
      cardErrors.classList.add("visible");
      return;
    }

    placeOrderButton.disabled = true;
    placeOrderButton.innerHTML = "PROCESANDO PAGO Y REGISTRANDO PEDIDO...";

    try {
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            country: formData.get("country") || "PE",
            firstName,
            lastName,
            document: documentVal,
            region,
            city,
            address,
            apartment,
            phone,
            email,
            notes
          },
          currency: state.currency,
          card: {
            cardNumber: rawCard,
            cardholderName,
            cardExpiry,
            cardCvc,
            brand: detectCardBrand(rawCard),
            cardholderDocument: documentVal,
            installments
          },
          couponCode: state.couponDiscount > 0 ? "NEXAFIT20" : "",
          items: state.cart
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "No se pudo procesar la transacción.");
      }

      // Éxito: Mostrar recibo y celebrar
      closeCheckoutModal();
      const order = data.order;
      receiptOrderId.textContent = order.id;
      receiptDate.textContent = new Date(order.createdAt).toLocaleString("es-PE");
      receiptCustomerName.textContent = order.customer.name;
      receiptAddress.textContent = `${order.customer.address}, ${order.customer.city} (${order.customer.region})`;
      receiptPaymentMethod.textContent = `${order.payment.brand.toUpperCase()} terminada en ${order.payment.last4} (${order.payment.installments} cuotas)`;
      receiptAuthCode.textContent = `AUT-${order.payment.authCode}`;
      receiptTotalAmount.textContent = formatPEN(order.orderSummary.total / 100);

      receiptModal.setAttribute("aria-hidden", "false");
      receiptModal.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");

      launchConfetti();

      // Vaciar carrito
      state.cart = [];
      renderCart();

    } catch (err) {
      console.error(err);
      cardErrors.textContent = err.message || "Ocurrió un error al procesar el pago.";
      cardErrors.classList.add("visible");
    } finally {
      placeOrderButton.disabled = false;
      const { grandTotal } = getCartTotals();
      placeOrderButton.innerHTML = `PAGAR Y CONFIRMAR · <span>${formatPEN(grandTotal)}</span>`;
    }
  });
}

// Botones de Recibo
if (closeReceiptButton) closeReceiptButton.addEventListener("click", closeAllModals);
if (printReceiptBtn) printReceiptBtn.addEventListener("click", () => window.print());

// ==========================================================================
// DELEGACIÓN DE EVENTOS PARA EL CATÁLOGO Y CARRITO
// ==========================================================================

document.addEventListener("click", (e) => {
  // Agregar rápido
  const addBtn = e.target.closest("[data-add-id]");
  if (addBtn) {
    const productId = addBtn.dataset.addId;
    const product = PRODUCTS.find(p => p.id === productId);
    const defaultVariant = product && product.variants ? product.variants[0] : "Estándar";

    const existing = state.cart.find((item) => item.id === productId && item.variant === defaultVariant);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ id: productId, quantity: 1, variant: defaultVariant });
    }
    renderCart();
    closeAllModals();
    openDrawer();
    showToast("✓ Producto agregado a tu bolsa");
    return;
  }

  // Abrir Quick View
  const qvBtn = e.target.closest("[data-quickview-id]");
  if (qvBtn) {
    openQuickView(qvBtn.dataset.quickviewId);
    return;
  }

  // Cantidad +/-
  const qtyBtn = e.target.closest("[data-qty-change]");
  if (qtyBtn) {
    const id = qtyBtn.dataset.qtyChange;
    const action = qtyBtn.dataset.action;
    const variant = qtyBtn.dataset.variant;
    const item = state.cart.find((i) => i.id === id && i.variant === variant);
    if (item) {
      if (action === "inc") item.quantity += 1;
      if (action === "dec") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((i) => !(i.id === id && i.variant === variant));
        }
      }
      renderCart();
    }
    return;
  }

  // Eliminar ítem
  const remBtn = e.target.closest("[data-remove]");
  if (remBtn) {
    const id = remBtn.dataset.remove;
    const variant = remBtn.dataset.variant;
    state.cart = state.cart.filter((i) => !(i.id === id && i.variant === variant));
    renderCart();
    showToast("Producto eliminado de la bolsa");
    return;
  }

  // Búsqueda por palabra clave en sublinks / drawer chips
  const kwLink = e.target.closest("[data-search-keyword]");
  if (kwLink) {
    const keyword = kwLink.dataset.searchKeyword;
    const filterCat = kwLink.dataset.filterLink || "todos";
    state.filter = filterCat;
    state.searchQuery = keyword;
    state.selectedBrand = null;

    document.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });

    if (globalSearch) globalSearch.value = keyword;
    if (drawerSearchInput) drawerSearchInput.value = keyword;
    if (drawerClearSearch) drawerClearSearch.style.display = "block";

    renderProducts();
    closeAllModals();
    showToast(`🔍 Filtrando: "${keyword.toUpperCase()}"`);

    const shopEl = document.getElementById("shop");
    if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Filtrado por Marca Oficial
  const brandCard = e.target.closest("[data-brand]");
  if (brandCard) {
    const brand = brandCard.dataset.brand;
    state.filter = "todos";
    state.searchQuery = "";
    state.selectedBrand = brand;

    document.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === "todos");
    });

    if (globalSearch) globalSearch.value = "";
    if (drawerSearchInput) drawerSearchInput.value = "";
    if (drawerClearSearch) drawerClearSearch.style.display = "none";

    renderProducts();
    closeAllModals();
    showToast(`🏷️ Mostrando marca: ${brand}`);

    const shopEl = document.getElementById("shop");
    if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Filtro por categoría en tabs
  const chipBtn = e.target.closest(".filter-chip");
  if (chipBtn && chipBtn.dataset.filter) {
    document.querySelectorAll(".filter-chip").forEach((btn) => btn.classList.remove("active"));
    chipBtn.classList.add("active");
    state.filter = chipBtn.dataset.filter;
    state.selectedBrand = null;
    renderProducts();
    return;
  }

  // Enlaces de navegación con filtro
  const filterLink = e.target.closest("[data-filter-link]");
  if (filterLink) {
    state.filter = filterLink.dataset.filterLink;
    state.selectedBrand = null;
    state.searchQuery = "";
    if (globalSearch) globalSearch.value = "";
    if (drawerSearchInput) drawerSearchInput.value = "";
    if (drawerClearSearch) drawerClearSearch.style.display = "none";

    document.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });
    renderProducts();
    closeAllModals();
    return;
  }
});

// Ordenamiento
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });
}

// Interacciones de UI General
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const closeSearch = document.getElementById("closeSearch");
const globalSearch = document.getElementById("globalSearch");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

const drawerSearchInput = document.getElementById("drawerSearchInput");
const drawerClearSearch = document.getElementById("drawerClearSearch");
const drawerCopyCoupon = document.getElementById("drawerCopyCoupon");

if (cartButton) cartButton.addEventListener("click", openDrawer);
if (closeCart) closeCart.addEventListener("click", closeDrawer);
if (overlay) overlay.addEventListener("click", closeAllModals);
if (checkoutButton) checkoutButton.addEventListener("click", openCheckout);
if (closeCheckout) closeCheckout.addEventListener("click", closeCheckoutModal);

if (searchToggle && searchBar) {
  searchToggle.addEventListener("click", () => {
    searchBar.classList.toggle("active");
    if (searchBar.classList.contains("active") && globalSearch) {
      globalSearch.focus();
    }
  });
}

if (closeSearch && searchBar) {
  closeSearch.addEventListener("click", () => {
    searchBar.classList.remove("active");
  });
}

if (globalSearch) {
  globalSearch.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    state.selectedBrand = null;
    if (drawerSearchInput) drawerSearchInput.value = e.target.value;
    renderProducts();
  });
}

// In-Drawer Live Search
if (drawerSearchInput) {
  drawerSearchInput.addEventListener("input", (e) => {
    const q = e.target.value;
    if (drawerClearSearch) drawerClearSearch.style.display = q ? "block" : "none";
    state.searchQuery = q;
    state.selectedBrand = null;
    if (globalSearch) globalSearch.value = q;
    renderProducts();
  });
}

if (drawerClearSearch && drawerSearchInput) {
  drawerClearSearch.addEventListener("click", () => {
    drawerSearchInput.value = "";
    drawerClearSearch.style.display = "none";
    state.searchQuery = "";
    if (globalSearch) globalSearch.value = "";
    renderProducts();
  });
}

// In-Drawer Tabs Switching
document.querySelectorAll(".drawer-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.drawerTab;
    document.querySelectorAll(".drawer-tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    document.querySelectorAll(".drawer-panel").forEach((p) => p.classList.remove("active"));
    if (target === "categories") document.getElementById("drawerPanelCategories")?.classList.add("active");
    if (target === "brands") document.getElementById("drawerPanelBrands")?.classList.add("active");
    if (target === "featured") document.getElementById("drawerPanelFeatured")?.classList.add("active");
  });
});

// In-Drawer Copy Coupon Button
if (drawerCopyCoupon) {
  drawerCopyCoupon.addEventListener("click", () => {
    navigator.clipboard.writeText("NEXAFIT20").then(() => {
      drawerCopyCoupon.textContent = "¡Copiado! ✓";
      drawerCopyCoupon.style.background = "var(--lime)";
      drawerCopyCoupon.style.color = "var(--black)";
      showToast("🎉 ¡Código NEXAFIT20 copiado! 20% de descuento en tu orden");
      if (couponInput) couponInput.value = "NEXAFIT20";
      setTimeout(() => {
        drawerCopyCoupon.textContent = "Copiar";
        drawerCopyCoupon.style.background = "";
        drawerCopyCoupon.style.color = "";
      }, 2500);
    }).catch(() => {
      showToast("🎟️ Usa el código NEXAFIT20 en el checkout");
    });
  });
}

// Menu Button Trigger
if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", closeAllModals);
}

// Tecla ESC para cerrar modales y menús
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
    if (searchBar && searchBar.classList.contains("active")) {
      searchBar.classList.remove("active");
    }
  }
});

// Cupón de descuento en Checkout
const couponToggle = document.getElementById("couponToggle");
const couponBox = document.getElementById("couponBox");
const applyCoupon = document.getElementById("applyCoupon");
const couponInput = document.getElementById("couponInput");

if (couponToggle) {
  couponToggle.addEventListener("click", () => {
    couponBox.classList.toggle("visible");
  });
}

if (applyCoupon) {
  applyCoupon.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();
    if (code === "NEXAFIT20") {
      state.couponDiscount = 0.20;
      showToast("🎉 ¡Cupón NEXAFIT20 aplicado! 20% de descuento en tu compra");
    } else {
      showToast("❌ Cupón inválido. Prueba con NEXAFIT20");
    }
    renderCart();
    renderCheckoutSummary();
  });
}

// ==========================================================================
// MOTOR DE ANIMACIONES PROFESIONALES (SCROLL REVEAL, COUNTERS & RIPPLE)
// ==========================================================================

function triggerCartBounce() {
  if (!cartButton) return;
  cartButton.classList.remove("bounce-active");
  void cartButton.offsetWidth; // Reflow
  cartButton.classList.add("bounce-active");
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal-item:not(.is-revealed)");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  revealItems.forEach((el) => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10) || 0;
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            el.textContent = current.toLocaleString("es-PE");

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toLocaleString("es-PE");
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => obs.observe(c));
}

function initRippleEffect() {
  document.addEventListener("pointerdown", (e) => {
    const target = e.target.closest(".button, .cart-button, .quick-add-btn, .mini-add-btn, .mega-card-btn, .drawer-copy-coupon-btn, .track-btn, .filter-chip");
    if (!target) return;

    target.classList.add("ripple-target");
    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    const rect = target.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-circle");

    const prevCircle = target.querySelector(".ripple-circle");
    if (prevCircle) prevCircle.remove();

    target.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
}

// ==========================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================================

renderProducts();
renderCart();
initScrollReveal();
initCounters();
initRippleEffect();


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

