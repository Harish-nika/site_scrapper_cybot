const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Utility to delay like a human
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Sanitize filename
function sanitizeFilename(url) {
  return url.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 100);
}

// Main function
(async () => {
  const results = [];
  const csvFilePath = '/home/harish/Project_works/pdf_printer_chromium/urls.csv';

  // Read URLs from CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Set user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 YourBot/1.0 (contact: your.email@example.com)'
  );

  for (const row of results) {
    const url = row.url;
    if (!url) continue;

    console.log(`Processing: ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Human-like scroll and click
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await delay(Math.random() * 3000 + 2000);
      await page.mouse.move(100, 100);
      await delay(Math.random() * 2000 + 1000);
      await page.mouse.click(100, 100);
      await delay(Math.random() * 3000 + 2000);

      // Save as PDF
      const filename = sanitizeFilename(url) + '.pdf';
      const savePath = path.join('/home/harish/Project_works/pdf_printer_chromium/', filename);
      await page.pdf({
        path: savePath,
        format: 'A4',
      });

      console.log(`✅ Saved: ${filename}`);
    } catch (err) {
      console.error(`❌ Error processing ${url}:`, err.message);
    }
  }

  await browser.close();
})();
