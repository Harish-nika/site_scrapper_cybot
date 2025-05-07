# Automated PDF Printer System with Puppeteer on Linux

## **Prerequisites**
- A Linux server (Ubuntu-based).
- Node.js and npm installed.
- Puppeteer installed for headless browser automation.
- Xvfb (X Virtual Frame Buffer) installed for running headless browsers in environments without an X server.

---

## **Steps**

### 1. **Set Up the Environment**

#### **Install Node.js** (if not already installed):
```bash
sudo apt update
sudo apt install nodejs npm 
```
Install Puppeteer:
Puppeteer is a Node.js library that provides a high-level API to control Chrome or Chromium in a headless mode. This allows us to automate tasks like navigating to a webpage and saving it as a PDF.

```bash
Copy
Edit
npm install puppeteer
```
###2. Set Up Xvfb (X Virtual Frame Buffer)
##Install Xvfb:
#Since Puppeteer requires a graphical environment, and you're working in a headless Linux server, Xvfb simulates a display so Puppeteer can run Chrome or Chromium.

```bash
Copy
Edit
sudo apt install xvfb
Start Xvfb:
Start a new Xvfb instance on display :99:
```

```bash
Copy
Edit
sudo Xvfb :99 & 
export DISPLAY=:99
```
###3. Write the Puppeteer Script
##Create a script (Automated_human_pranker.js) in a directory (/home/harish/Project_works/pdf_printer_chromium/) that will navigate to a webpage and generate a PDF:

```javascript
Copy
Edit
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const url = 'https://www.sec.gov/Archives/edgar/data/19617/000121390025032957/ea0238744-01_424b2.htm';
    
    await page.goto(url, {waitUntil: 'load'});
    await page.pdf({ path: '/home/harish/Project_works/pdf_printer_chromium/output.pdf', format: 'A4' });
    
    console.log('PDF generated!');
    await browser.close();
})();
```
Explanation of the Script:
Puppeteer launches a headless Chrome browser.

It opens a webpage from the specified URL (url).

The script waits for the page to load completely.

It generates a PDF of the page and saves it to the output directory.

The browser is closed once the process is complete.

4. Run the Script
Once the script is ready, run it using Node.js:

```bash
Copy
Edit
node /home/harish/Project_works/pdf_printer_chromium/Automated_human_pranker.js
```
Important Notes:

Make sure you start Xvfb and set the DISPLAY environment variable to :99 before running the script.

Puppeteer will use Chrome/Chromium in headless mode to navigate the webpage and generate the PDF.

###5. Check the Generated PDF
##After the script runs, check the output directory to verify that the PDF was generated successfully:

```bash
Copy
Edit
ls /home/harish/Project_works/pdf_printer_chromium/
```
You should see the generated output.pdf in the directory.

###6. Troubleshooting Tips:
##If you run into issues with the headless browser (e.g., sandbox errors), ensure that you're using the --no-sandbox flag when launching Puppeteer.

If you get an error related to the Xvfb server, ensure that the Xvfb process is running and the DISPLAY variable is correctly set.

Conclusion
You successfully set up an automated system to print a webpage as a PDF using Puppeteer and Xvfb on your Linux server. By following these steps, you can easily extend the system to handle more websites or automate other tasks like downloading files, screenshot generation, etc.

