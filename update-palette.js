const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "styles.css");
let css = fs.readFileSync(cssPath, "utf8");

// Reemplazos de tokens y variables para diseño unisex atlético de lujo
css = css.replace(
  /:root\s*\{[\s\S]*?--transition-slow:\s*0\.5s[^;]+;\s*\}/,
  `:root {
  --black: #0b0d13;
  --black-2: #121622;
  --black-3: #1a2030;
  --white: #ffffff;
  --off-white: #f8fafc;
  --off-white-2: #f1f5f9;

  /* PALETA UNISEX ATLÉTICA DE ALTO RENDIMIENTO */
  /* Coral Sunset (Energía / Pasión / Fuerza unisex) */
  --coral: #ff3b5c;
  --coral-dark: #e62849;
  --coral-glow: rgba(255, 59, 92, 0.38);
  --coral-gradient: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);

  /* Cyber Cyan (Frescura / Tecnología / Hidratación) */
  --cyan: #00d2ff;
  --cyan-dark: #00b4db;
  --cyan-glow: rgba(0, 210, 255, 0.35);
  --cyan-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);

  /* Royal Indigo / Violeta Pro */
  --indigo: #6366f1;
  --indigo-glow: rgba(99, 102, 241, 0.35);

  /* Mapeo retrocompatible */
  --lime: #ff3b5c;
  --lime-dark: #e62849;
  --lime-glow: rgba(255, 59, 92, 0.38);
  --purple: #6366f1;
  --purple-glow: rgba(99, 102, 241, 0.35);

  --gray: #64748b;
  --gray-light: #94a3b8;
  --line: #e2e8f0;
  --dark-line: #242b3d;
  --danger: #ef4444;
  --success: #10b981;
  --container: 1400px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 30px;
  --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 12px 32px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 25px 55px -10px rgba(0, 0, 0, 0.28);
  --shadow-card: 0 20px 45px rgba(0, 0, 0, 0.4);
  --transition-fast: 0.18s ease;
  --transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}`
);

// Announcement Bar
css = css.replace(
  /\.announcement\s*\{[\s\S]*?\}/,
  `.announcement {
  background: linear-gradient(90deg, #0b0d13 0%, #171c28 50%, #0b0d13 100%);
  color: #f8fafc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 16px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}`
);

css = css.replace(
  /\.announcement-dot\s*\{[\s\S]*?\}/,
  `.announcement-dot {
  width: 7px;
  height: 7px;
  background: #ff3b5c;
  box-shadow: 0 0 10px #ff3b5c;
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}`
);

// Brand Sub Logo
css = css.replace(
  /\.brand-sub\s*\{[\s\S]*?\}/,
  `.brand-sub {
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 950;
  border-radius: 5px;
  letter-spacing: 0.08em;
  box-shadow: 0 3px 12px rgba(255, 51, 102, 0.4);
}`
);

// Button Dark / Primary Buttons
css = css.replace(
  /\.button-dark\s*\{[\s\S]*?\}\s*\.button-dark:hover\s*\{[\s\S]*?\}/,
  `.button-dark {
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(255, 51, 102, 0.35);
}

.button-dark:hover {
  background: linear-gradient(135deg, #e62849 0%, #ff5733 100%);
  box-shadow: 0 12px 28px rgba(255, 51, 102, 0.5);
  transform: translateY(-2px);
}`
);

// Button Lime
css = css.replace(
  /\.button-lime\s*\{[\s\S]*?\}\s*\.button-lime:hover\s*\{[\s\S]*?\}/,
  `.button-lime {
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(255, 51, 102, 0.35);
}

.button-lime:hover {
  background: #ffffff;
  color: #0b0d13;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25);
}`
);

// Quick Add Button
css = css.replace(
  /\.quick-add-btn:hover\s*\{[\s\S]*?\}/,
  `.quick-add-btn:hover {
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(255, 51, 102, 0.4);
  transform: translateY(-2px);
}`
);

// Product Tag
css = css.replace(
  /\.product-tag\s*\{[\s\S]*?\}/,
  `.product-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(11, 13, 19, 0.92);
  backdrop-filter: blur(8px);
  color: #ff3b5c;
  border: 1px solid rgba(255, 59, 92, 0.3);
  font-size: 9.5px;
  font-weight: 950;
  letter-spacing: 0.08em;
  padding: 4px 9px;
  border-radius: 6px;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}`
);

// Menu Button Hover
css = css.replace(
  /\.menu-button:hover\s*\{[\s\S]*?\}/,
  `.menu-button:hover {
  background: var(--black);
  color: #ff3b5c;
  border-color: var(--black);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}`
);

// Track Button Hover
css = css.replace(
  /\.track-btn:hover\s*\{[\s\S]*?\}/,
  `.track-btn:hover {
  background: var(--black);
  color: #ff3b5c;
  border-color: var(--black);
}`
);

// Pay Button in Checkout
css = css.replace(
  /\.pay-button\s*\{[\s\S]*?\}\s*\.pay-button:hover\s*\{[\s\S]*?\}/,
  `.pay-button {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 950;
  letter-spacing: 0.1em;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  box-shadow: 0 8px 24px rgba(255, 51, 102, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.pay-button:hover {
  background: linear-gradient(135deg, #e62849 0%, #ff5733 100%);
  box-shadow: 0 12px 30px rgba(255, 51, 102, 0.5);
  transform: translateY(-2px);
}`
);

// Progress Bar Shipping
css = css.replace(
  /\.shipping-progress-fill\s*\{[\s\S]*?\}/,
  `.shipping-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff3366 0%, #ff8c38 100%);
  border-radius: 4px;
  transition: width 0.4s ease;
  box-shadow: 0 0 10px rgba(255, 51, 102, 0.4);
}`
);

// Cart Button Span (Counter)
css = css.replace(
  /\.cart-button span\s*\{[\s\S]*?\}/,
  `.cart-button span {
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 950;
  box-shadow: 0 2px 6px rgba(255, 51, 102, 0.4);
}`
);

// Checkout Button in Drawer
css = css.replace(
  /\.drawer-checkout-btn\s*\{[\s\S]*?\}\s*\.drawer-checkout-btn:hover\s*\{[\s\S]*?\}/,
  `.drawer-checkout-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #ff3366 0%, #ff6b4a 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 950;
  letter-spacing: 0.1em;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  box-shadow: 0 8px 24px rgba(255, 51, 102, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.drawer-checkout-btn:hover {
  background: linear-gradient(135deg, #e62849 0%, #ff5733 100%);
  box-shadow: 0 12px 30px rgba(255, 51, 102, 0.5);
  transform: translateY(-2px);
}`
);

fs.writeFileSync(cssPath, css, "utf8");
console.log("styles.css updated with Unisex Luxury Color Palette!");
