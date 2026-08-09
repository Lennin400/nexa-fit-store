const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "styles.css");
const htmlPath = path.join(__dirname, "index.html");
const publicHtmlPath = path.join(__dirname, "public", "index.html");

const css = fs.readFileSync(cssPath, "utf8");
let html = fs.readFileSync(htmlPath, "utf8");

// Si ya tiene <style id="inline-styles">, reemplazarlo
if (html.includes('id="inline-styles"')) {
  html = html.replace(/<style id="inline-styles">[\s\S]*?<\/style>/, `<style id="inline-styles">\n${css}\n</style>`);
} else {
  html = html.replace('<link rel="stylesheet" href="styles.css">', `<style id="inline-styles">\n${css}\n</style>\n  <link rel="stylesheet" href="styles.css">`);
}

fs.writeFileSync(htmlPath, html, "utf8");

if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
fs.writeFileSync(publicHtmlPath, html, "utf8");
fs.copyFileSync(cssPath, path.join(__dirname, "public", "styles.css"));
fs.copyFileSync(path.join(__dirname, "script.js"), path.join(__dirname, "public", "script.js"));

console.log("CSS successfully inlined and public directory updated!");
