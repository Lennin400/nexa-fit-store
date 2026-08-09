const fs = require("fs");
const path = require("path");

const brainDir = "C:\\Users\\73200\\.gemini\\antigravity-ide\\brain\\d119420f-ef68-4ed1-b990-406079f68448";
const targetAssets = path.join(__dirname, "assets");
const targetPublicAssets = path.join(__dirname, "public", "assets");

if (!fs.existsSync(targetAssets)) fs.mkdirSync(targetAssets, { recursive: true });
if (!fs.existsSync(targetPublicAssets)) fs.mkdirSync(targetPublicAssets, { recursive: true });

const mappings = [
  { src: "on_gold_whey_1786309838900.png", dest: "on-gold-whey.png" },
  { src: "dymatize_iso100_1786309864370.png", dest: "dymatize-iso100.png" },
  { src: "muscletech_nitro_1786309889615.png", dest: "muscletech-nitrotech.png" },
  { src: "muscletech_nitro_1786309889615.png", dest: "whey-pro.png" },
  { src: "cbum_thavage_1786309917413.png", dest: "cbum-thavage.png" },
  { src: "cbum_thavage_1786309917413.png", dest: "preworkout.png" },
  { src: "on_creatine_1786309945210.png", dest: "creatine.png" }
];

mappings.forEach(m => {
  const srcPath = path.join(brainDir, m.src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(targetAssets, m.dest));
    fs.copyFileSync(srcPath, path.join(targetPublicAssets, m.dest));
    console.log(`Copied ${m.src} -> assets/${m.dest}`);
  } else {
    console.warn(`Source file missing: ${srcPath}`);
  }
});
