const fs = require("fs");
const path = require("path");

// 1. UPDATE STYLES.CSS with Currency Selector CSS
const cssPath = path.join(__dirname, "styles.css");
let css = fs.readFileSync(cssPath, "utf8");

const currencyStyles = `
/* ==========================================================================
   SELECTOR DE MONEDA INTERNACIONAL / LOCAL
   ========================================================================== */
.currency-selector-wrap {
  position: relative;
  z-index: 105;
}

.currency-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  background: var(--off-white);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-size: 11.5px;
  font-weight: 900;
  color: var(--black);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.currency-btn:hover,
.currency-selector-wrap.active .currency-btn {
  background: var(--black);
  color: #ffffff;
  border-color: var(--black);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.currency-arrow {
  font-size: 9px;
  color: var(--gray);
  transition: transform var(--transition-fast);
}

.currency-selector-wrap.active .currency-arrow {
  transform: rotate(180deg);
  color: var(--coral);
}

.currency-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 250px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
  padding: 8px;
  display: none;
  flex-direction: column;
  gap: 4px;
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 200;
}

.currency-selector-wrap.active .currency-dropdown {
  display: flex;
}

.currency-dropdown-header {
  font-size: 9.5px;
  font-weight: 950;
  letter-spacing: 0.12em;
  color: var(--gray);
  padding: 6px 10px 4px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  margin-bottom: 4px;
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  width: 100%;
}

.currency-option:hover {
  background: var(--off-white);
  border-color: var(--line);
  transform: translateX(3px);
}

.currency-option.active {
  background: rgba(255, 59, 92, 0.08);
  border-color: rgba(255, 59, 92, 0.3);
}

.currency-option.active strong {
  color: var(--coral);
}

.currency-flag {
  font-size: 20px;
  line-height: 1;
}

.currency-info {
  display: flex;
  flex-direction: column;
}

.currency-info strong {
  font-size: 12px;
  font-weight: 900;
  color: var(--black);
  line-height: 1.2;
}

.currency-info small {
  font-size: 10px;
  color: var(--gray);
}
`;

if (!css.includes(".currency-selector-wrap")) {
  css += `\n${currencyStyles}\n`;
}

fs.writeFileSync(cssPath, css, "utf8");

// 2. UPDATE INDEX.HTML with Currency Selector HTML
const htmlPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const currencySelectorHtml = `
        <!-- Selector de Moneda Inteligente (Auto-Detección y Manual) -->
        <div class="currency-selector-wrap" id="currencySelectorWrap">
          <button id="currencyToggle" class="currency-btn" aria-label="Seleccionar moneda" title="Cambiar Moneda / País">
            <span id="currentCurrencyFlag">🇺🇸</span>
            <strong id="currentCurrencyCode">USD</strong>
            <span class="currency-arrow">▾</span>
          </button>
          <div class="currency-dropdown" id="currencyDropdown">
            <div class="currency-dropdown-header">SELECCIONA TU MONEDA:</div>
            <button type="button" class="currency-option active" data-currency="USD">
              <span class="currency-flag">🇺🇸</span>
              <div class="currency-info">
                <strong>USD ($)</strong>
                <small>Dólar Americano · Global</small>
              </div>
            </button>
            <button type="button" class="currency-option" data-currency="PEN">
              <span class="currency-flag">🇵🇪</span>
              <div class="currency-info">
                <strong>PEN (S/)</strong>
                <small>Soles · Perú (Moneda Local)</small>
              </div>
            </button>
            <button type="button" class="currency-option" data-currency="EUR">
              <span class="currency-flag">🇪🇸</span>
              <div class="currency-info">
                <strong>EUR (€)</strong>
                <small>Euros · Europa</small>
              </div>
            </button>
            <button type="button" class="currency-option" data-currency="MXN">
              <span class="currency-flag">🇲🇽</span>
              <div class="currency-info">
                <strong>MXN ($)</strong>
                <small>Pesos Mexicanos</small>
              </div>
            </button>
            <button type="button" class="currency-option" data-currency="COP">
              <span class="currency-flag">🇨🇴</span>
              <div class="currency-info">
                <strong>COP ($)</strong>
                <small>Pesos Colombianos</small>
              </div>
            </button>
            <button type="button" class="currency-option" data-currency="CLP">
              <span class="currency-flag">🇨🇱</span>
              <div class="currency-info">
                <strong>CLP ($)</strong>
                <small>Pesos Chilenos</small>
              </div>
            </button>
          </div>
        </div>
`;

if (!html.includes('id="currencySelectorWrap"')) {
  html = html.replace('<div class="nav-actions">', `<div class="nav-actions">\n${currencySelectorHtml}`);
}

// Announcement Bar with ID
html = html.replace(
  /<div class="announcement">[\s\S]*?<\/div>/,
  `<div class="announcement">
    <span id="announcementText">
      <span class="announcement-dot"></span>
      ENVÍOS A TODO EL MUNDO 🌎 · ENVÍO GRATIS DESDE $50 USD / S/ 199 PEN · DEVOLUCIONES 15 DÍAS
    </span>
  </div>`
);

fs.writeFileSync(htmlPath, html, "utf8");
console.log("HTML and CSS updated with Currency Selector component!");
