const puppeteer = require('puppeteer');

// Function to introduce random delays
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
  // Launch the browser in headless mode (without GUI)
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode (without GUI)
    args: ['--no-sandbox'], // Add --no-sandbox flag here
  });

  const page = await browser.newPage();

  // Set a custom user-agent (mimic a real browser)
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 YourBot/1.0 (contact: your.email@example.com)'
  );

  // Go to the SEC webpage
  await page.goto('https://www.sec.gov/Archives/edgar/data/927971/000121465925006084/b417252fwp.htm', {
    waitUntil: 'networkidle0', // Wait until the network is idle (page fully loaded)
  });

  // Add human-like behavior: Simulate scrolling
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight); // Scroll down one screen
  });

  // Add random delay before simulating mouse move
  await delay(Math.random() * 3000 + 2000); // Random delay between 2 and 5 seconds

  // Simulate mouse movement (human-like behavior)
  await page.mouse.move(100, 100);  // Move mouse to (100, 100)
  await delay(Math.random() * 2000 + 1000);  // Random delay between 1 and 3 seconds
  await page.mouse.click(100, 100); // Simulate a click at (100, 100)

  // Add another random delay before saving as PDF
  await delay(Math.random() * 3000 + 2000); // Random delay between 2 and 5 seconds

  // Save the page as PDF
  await page.pdf({
    path: '/home/harish/Project_works/pdf_printer_chromium/edgar_document.pdf',
    format: 'A4', // You can adjust the format
  });

  // Close the browser
  await browser.close();
})();
