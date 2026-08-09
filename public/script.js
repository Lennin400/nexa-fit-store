/* ==========================================================================
   NEXA FIT · CLIENT ENGINE (v2.0 Professional)
   ========================================================================== */

const PRODUCTS = [
  // --- SUPLEMENTOS INTERNACIONALES Y NEXA ---
  {
    id: "on-gold-whey",
    name: "Optimum Nutrition · Gold Standard 100% Whey",
    brand: "Optimum Nutrition",
    category: "suplementos",
    price: 249.90,
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
    price: 289.90,
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
    price: 139.90,
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
    price: 179.90,
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
    price: 219.90,
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
    price: 99.90,
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
    price: 159.90,
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
    price: 49.90,
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
    price: 119.90,
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
    price: 129.90,
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
    price: 149.90,
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
    price: 199.90,
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
    price: 79.90,
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
    price: 99.90,
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
    price: 139.90,
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
    price: 169.90,
    tag: "PREMIUM",
    image: "assets/hoodie.png",
    desc: "Algodón pesado perchado de 420 GSM para abrigar antes y después de cada sesión intensa. Ajuste holgado estético.",
    variants: ["Talla S / M", "Talla L / XL"]
  }
];

// Estado global de la aplicación
const state = {
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

function formatPEN(amount) {
  return `S/ ${amount.toFixed(2)}`;
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

// Detección de franquicia
function detectCardBrand(number) {
  const clean = number.replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^3(?:0[0-5]|[68])/.test(clean)) return "diners";
  if (/^6(?:011|5)/.test(clean)) return "discover";
  if (/^35/.test(clean)) return "jcb";
  return "tarjeta";
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
      (product, idx) => `
      <article class="product-card reveal-item is-revealed" style="animation: fadeIn 0.35s ease both; animation-delay: ${idx * 0.04}s;">
        <div class="product-media">
          <span class="product-tag">${product.tag}</span>
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="quick-view-btn" data-quickview-id="${product.id}">
            👁️ VISTA RÁPIDA
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.brand ? `${product.brand.toUpperCase()} · ` : ''}${product.category.toUpperCase()}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-bottom">
            <span class="product-price">${formatPEN(product.price)}</span>
            <button class="quick-add-btn" data-add-id="${product.id}">+ AGREGAR</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// ==========================================================================
// CÁLCULO Y RENDERIZADO DEL CARRITO
// ==========================================================================

function getCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const discountAmount = subtotal * state.couponDiscount;
  const netSubtotal = Math.max(0, subtotal - discountAmount);
  const shipping = netSubtotal >= 199 || netSubtotal === 0 ? 0 : 10;
  const grandTotal = netSubtotal + shipping;

  return { subtotal, discountAmount, netSubtotal, shipping, grandTotal };
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

// Formateo en tiempo real del número de tarjeta
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);

    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = formatted;

    const brand = detectCardBrand(value);
    const brandName = brand.toUpperCase();
    cardBrandBadge.textContent = brandName;
    cardBrandDisplay.textContent = brandName;

    if (value.length > 0) {
      cardNumberDisplay.textContent = formatted.padEnd(19, "•");
    } else {
      cardNumberDisplay.textContent = "•••• •••• •••• ••••";
    }

    // Validación visual de Luhn mientras se escribe
    if (value.length >= 15) {
      if (validateLuhn(value)) {
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
