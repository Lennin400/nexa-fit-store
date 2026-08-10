const fs = require("fs");
const path = require("path");

async function compressImages() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (err) {
    console.error("sharp module not available yet:", err.message);
    return;
  }

  const dirs = [
    path.join(__dirname, "assets"),
    path.join(__dirname, "public", "assets")
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!/\.(png|jpe?g)$/i.test(file)) continue;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.size < 100000) continue; // Ya está comprimido (<100KB)

      const tempPath = filePath + ".tmp";
      try {
        await sharp(filePath)
          .resize({ width: 500, height: 500, fit: "inside", withoutEnlargement: true })
          .png({ quality: 80, compressionLevel: 8 })
          .toFile(tempPath);

        const newStat = fs.statSync(tempPath);
        if (newStat.size < stat.size) {
          fs.renameSync(tempPath, filePath);
          console.log(`Optimized ${file}: ${(stat.size/1024).toFixed(0)}KB -> ${(newStat.size/1024).toFixed(0)}KB`);
        } else {
          fs.unlinkSync(tempPath);
        }
      } catch (e) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.warn(`Error processing ${file}:`, e.message);
      }
    }
  }
  console.log("Image compression complete!");
}

compressImages();
