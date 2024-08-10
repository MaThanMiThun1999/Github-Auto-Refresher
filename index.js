const puppeteer = require("puppeteer");

const GitHubRefresher = async (URL) => {
  let browser;
  try {
    console.log("Starting Browser");
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
      ],
      headless: true
    });

    console.log("Getting Page");
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
      });
    });
    console.log("Page Loading");
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log("Page Refreshed");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    if (browser) {
      console.log("Browser Closed");
      try {
        await browser.close();
      } catch (error) {
        console.error("Error closing browser:", error);
      }
    }
  }
};

const URL = "https://github.com/MaThanMiThun1999";
GitHubRefresher(URL);