const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // Login page
    await page.goto(
      'https://billing.freeminecrafthost.com/auth/login?r=https://billing.freeminecrafthost.com/dashboard', 
      { waitUntil: 'networkidle2' }
    );

    // Login karna
    await page.type('#inputEmail', 'DevVmos');        // Username field
    await page.type('#inputPassword', '357159258');   // Password field
    await page.click('button[type="submit"]');        // Login button

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // AFK page
    await page.goto('https://billing.freeminecrafthost.com/earn/coins', { waitUntil: 'networkidle2' });
    console.log('AFK page open!');

    // AFK mode: Page ko 5 ghante ke liye open rakhe
    await page.waitForTimeout(5 * 60 * 60 * 1000);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
