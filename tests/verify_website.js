/**
 * Automated Verification Script for Sele Birthday Website
 * Task: Verificación Funcional y Visual Automatizada
 * 
 * Verifies:
 * 1. Existence and integrity of index.html (> 10KB)
 * 2. Existence and integrity of assets/sele-flyer.jpg (> 100KB)
 * 3. Existence and integrity of assets/disco-ball.svg (> 5KB)
 * 4. Google Maps embed iframe with exact Kraken Bar Lima URL
 * 5. RSVP button text and WhatsApp URL with exact phone and URL-encoded message
 * 6. Countdown target date exact 2026-09-19T21:00:00-05:00
 * 7. Viewport responsive meta tag and Spanish language support (lang="es")
 * 8. Date parsing and countdown calculations do not yield NaN
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_FILE = path.join(ROOT_DIR, 'index.html');
const FLYER_FILE = path.join(ROOT_DIR, 'assets', 'sele-flyer.jpg');
const DISCO_BALL_FILE = path.join(ROOT_DIR, 'assets', 'disco-ball.svg');
const YAPE_FILE = path.join(ROOT_DIR, 'assets', 'yape-icon.png');

const EXPECTED_MAPS_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.740219505921!2d-77.06177992400096!3d-12.0613866881766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c979204be905%3A0x1f4945a1b3f4c333!2sKraken%20Bar%20Lima!5e0!3m2!1ses-419!2spe!4v1788839978057!5m2!1ses-419!2spe";
const EXPECTED_PHONE = "51912652283";
const EXPECTED_MSG_ENCODED = "CONFIRMO%20MI%20ASISTENCIA%20%E2%9C%93";
const EXPECTED_TARGET_DATE = "2026-09-19T21:00:00-05:00";

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  \x1b[32m✔\x1b[0m [PASS] ${testName}`);
    testsPassed++;
  } catch (error) {
    console.error(`  \x1b[31m✘\x1b[0m [FAIL] ${testName}`);
    console.error(`    \x1b[31mError: ${error.message}\x1b[0m`);
    testsFailed++;
  }
}

console.log("\n==================================================");
console.log("   VERIFICACIÓN AUTOMATIZADA: CUMPLE DE SELE");
console.log("==================================================\n");

// 1. Existencia e integridad de sele-birthday/index.html (> 10KB)
runTest("1. Existencia e integridad de index.html (> 10KB)", () => {
  assert(fs.existsSync(HTML_FILE), `Archivo no encontrado: ${HTML_FILE}`);
  const stats = fs.statSync(HTML_FILE);
  const minBytes = 10 * 1024;
  assert(
    stats.size > minBytes,
    `index.html es demasiado pequeño (${(stats.size / 1024).toFixed(2)} KB), se esperaba > 10 KB`
  );
  console.log(`    (Tamaño actual: ${(stats.size / 1024).toFixed(2)} KB)`);
});

// 2. Existencia e integridad de sele-birthday/assets/sele-flyer.jpg (> 100KB)
runTest("2. Existencia e integridad de assets/sele-flyer.jpg (> 100KB)", () => {
  assert(fs.existsSync(FLYER_FILE), `Archivo no encontrado: ${FLYER_FILE}`);
  const stats = fs.statSync(FLYER_FILE);
  const minBytes = 100 * 1024;
  assert(
    stats.size > minBytes,
    `sele-flyer.jpg es demasiado pequeño (${(stats.size / 1024).toFixed(2)} KB), se esperaba > 100 KB`
  );
  console.log(`    (Tamaño actual: ${(stats.size / 1024).toFixed(2)} KB)`);
});

// 3. Existencia e integridad de sele-birthday/assets/disco-ball.svg (> 5KB)
runTest("3. Existencia e integridad de assets/disco-ball.svg (> 5KB)", () => {
  assert(fs.existsSync(DISCO_BALL_FILE), `Archivo no encontrado: ${DISCO_BALL_FILE}`);
  const stats = fs.statSync(DISCO_BALL_FILE);
  const minBytes = 5 * 1024;
  assert(
    stats.size > minBytes,
    `disco-ball.svg es demasiado pequeño (${(stats.size / 1024).toFixed(2)} KB), se esperaba > 5 KB`
  );
  console.log(`    (Tamaño actual: ${(stats.size / 1024).toFixed(2)} KB)`);
});

// Leer contenido de index.html para validaciones de texto/DOM
let htmlContent = "";
try {
  htmlContent = fs.readFileSync(HTML_FILE, 'utf-8');
} catch (err) {
  console.error("No se pudo leer index.html para los siguientes tests");
}

// 3.1 Referencia de activos dentro del HTML
runTest("3.1 Referencia correcta de activos dentro del index.html", () => {
  assert(
    htmlContent.includes("assets/sele-flyer.jpg"),
    "No se encontró la referencia a 'assets/sele-flyer.jpg' en el HTML"
  );
  assert(
    htmlContent.includes("assets/disco-ball.svg"),
    "No se encontró la referencia a 'assets/disco-ball.svg' en el HTML"
  );
  assert(
    htmlContent.includes("assets/yape-icon.png"),
    "No se encontró la referencia a 'assets/yape-icon.png' en el HTML"
  );
});

// 3.2 Existencia e integridad de assets/yape-icon.png (> 10KB)
runTest("3.2 Existencia e integridad de assets/yape-icon.png (> 10KB)", () => {
  assert(fs.existsSync(YAPE_FILE), `Archivo no encontrado: ${YAPE_FILE}`);
  const stats = fs.statSync(YAPE_FILE);
  const minBytes = 10 * 1024;
  assert(
    stats.size > minBytes,
    `yape-icon.png es demasiado pequeño (${(stats.size / 1024).toFixed(2)} KB), se esperaba > 10 KB`
  );
  console.log(`    (Tamaño actual: ${(stats.size / 1024).toFixed(2)} KB)`);
});

// 4. El HTML contiene exactamente el iframe de Google Maps para Kraken Bar Lima
runTest("4. Google Maps iframe exacto para Kraken Bar Lima", () => {
  assert(htmlContent.length > 0, "El contenido de index.html está vacío");
  
  // Verificar etiqueta iframe
  assert(/<iframe\b[^>]*>/i.test(htmlContent), "No se encontró etiqueta <iframe> en index.html");

  // Verificar URL exacta
  assert(
    htmlContent.includes(EXPECTED_MAPS_SRC),
    `No se encontró la URL esperada de Google Maps en el iframe:\n${EXPECTED_MAPS_SRC}`
  );
});

// 5. El HTML contiene el botón con texto "CONFIRMAR ASISTENCIA" y la URL de WhatsApp
runTest("5. Botón 'CONFIRMAR ASISTENCIA' y URL de WhatsApp con número y texto codificado", () => {
  // Verificar texto del botón
  assert(
    htmlContent.includes("CONFIRMAR ASISTENCIA"),
    "No se encontró el texto 'CONFIRMAR ASISTENCIA' en el HTML"
  );

  // Verificar número de teléfono
  assert(
    htmlContent.includes(EXPECTED_PHONE),
    `No se encontró el número de teléfono '${EXPECTED_PHONE}' en el HTML`
  );

  // Verificar texto codificado
  assert(
    htmlContent.includes(EXPECTED_MSG_ENCODED),
    `No se encontró el texto codificado '${EXPECTED_MSG_ENCODED}' en el HTML`
  );

  // Verificar estructura completa de la URL de WhatsApp
  const fullWhatsappRegex = /https:\/\/wa\.me\/51912652283\?text=CONFIRMO%20MI%20ASISTENCIA%20%E2%9C%93/;
  assert(
    fullWhatsappRegex.test(htmlContent),
    "No se encontró la URL completa y correcta de WhatsApp wa.me"
  );
});

// 5.1 Eliminación de Dress Code y presencia de 'TRAER REGALO *OBLIGATORIO*' con color de Actitud (var(--gold-dark))
runTest("5.1 Dress Code eliminado y 'TRAER REGALO *OBLIGATORIO*' con color var(--gold-dark) presente", () => {
  assert(
    !htmlContent.includes("Dress Code"),
    "Se encontró todavía la etiqueta 'Dress Code' en el HTML"
  );
  assert(
    htmlContent.includes("TRAER REGALO"),
    "No se encontró 'TRAER REGALO' en el HTML"
  );
  assert(
    htmlContent.includes("*OBLIGATORIO*"),
    "No se encontró '*OBLIGATORIO*' en el HTML"
  );
  assert(
    htmlContent.includes("color: var(--gold-dark) !important;"),
    "No se encontró color: var(--gold-dark) aplicado a gift-desc"
  );
});

// 6. El contador regresivo contiene la fecha objetivo exacta 2026-09-19T21:00:00-05:00
runTest("6. Fecha objetivo exacta del contador regresivo (2026-09-19T21:00:00-05:00)", () => {
  assert(
    htmlContent.includes(EXPECTED_TARGET_DATE),
    `No se encontró la fecha objetivo '${EXPECTED_TARGET_DATE}' en el script del HTML`
  );
});

// 7. El HTML tiene etiquetas responsive de viewport y soporte de idioma en español (lang="es")
runTest("7. Viewport responsive y soporte de idioma español (lang=\"es\")", () => {
  // Verificar lang="es"
  const langMatch = /<html\b[^>]*lang=["']es["']/i.test(htmlContent);
  assert(langMatch, "La etiqueta <html> no tiene atributo lang=\"es\"");

  // Verificar viewport
  const viewportMatch = /<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i.test(htmlContent);
  assert(viewportMatch, "No se encontró etiqueta meta viewport responsive con width=device-width");
});

// 8. Verifica que las fechas y cálculos no arrojen NaN
runTest("8. Validación de fechas y cálculos matemáticos sin NaN", () => {
  // 8.1 Extraer la fecha objetivo del código
  const dateMatch = htmlContent.match(/targetDate\s*=\s*new Date\(["']([^"']+)["']\)/);
  assert(dateMatch, "No se pudo extraer la instanciación de targetDate = new Date() en el HTML");
  
  const extractedDateStr = dateMatch[1];
  assert.strictEqual(
    extractedDateStr,
    EXPECTED_TARGET_DATE,
    `La fecha extraída '${extractedDateStr}' difiere de '${EXPECTED_TARGET_DATE}'`
  );

  const targetDateObj = new Date(extractedDateStr);
  const targetTimestamp = targetDateObj.getTime();

  assert(!Number.isNaN(targetTimestamp), "El timestamp de la fecha objetivo es NaN");
  assert(targetTimestamp > 0, "El timestamp debe ser mayor a 0");

  // 8.2 Simular lógica del contador matemático con diferentes momentos en el tiempo
  const testTimestamps = [
    new Date("2026-09-08T19:00:00-05:00").getTime(), // Previo al evento
    new Date("2026-09-19T20:59:59-05:00").getTime(), // 1 segundo antes
    Date.now(),                                       // Fecha actual
    new Date("2026-09-19T21:00:00-05:00").getTime(), // Hora exacta
    new Date("2026-09-20T00:00:00-05:00").getTime()  // Post evento
  ];

  for (const mockNow of testTimestamps) {
    const diff = targetTimestamp - mockNow;
    
    assert(!Number.isNaN(diff), `Diferencia de tiempo calculada es NaN con now=${mockNow}`);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    assert(!Number.isNaN(days), `Cálculo de 'days' arrojó NaN para diff=${diff}`);
    assert(!Number.isNaN(hours), `Cálculo de 'hours' arrojó NaN para diff=${diff}`);
    assert(!Number.isNaN(minutes), `Cálculo de 'minutes' arrojó NaN para diff=${diff}`);
    assert(!Number.isNaN(seconds), `Cálculo de 'seconds' arrojó NaN para diff=${diff}`);
  }
});

console.log("\n--------------------------------------------------");
console.log(`Resumen de Pruebas: ${testsPassed} pasadas, ${testsFailed} falladas`);
console.log("--------------------------------------------------\n");

if (testsFailed > 0) {
  console.error(`\x1b[31m[ERROR] Fallaron ${testsFailed} pruebas de verificación.\x1b[0m\n`);
  process.exit(1);
} else {
  console.log(`\x1b[32m[ÉXITO] Todas las aserciones de verificación pasaron satisfactoriamente.\x1b[0m\n`);
  process.exit(0);
}
