const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // Login
    await page.goto(
      'https://billing.freeminecrafthost.com/auth/login?r=https://billing.freeminecrafthost.com/dashboard',
      { waitUntil: 'networkidle2' }
    );

    await page.type('#inputEmail', 'DevVmos');
    await page.type('#inputPassword', '357159258');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // AFK page
    await page.goto('https://billing.freeminecrafthost.com/earn/coins', { waitUntil: 'networkidle2' });
    console.log('AFK page open!');

    // **Periodic refresh / interaction**
    setInterval(async () => {
      try {
        await page.reload({ waitUntil: 'networkidle2' });
        console.log('AFK page refreshed!');
        // Agar coins collect karne ka button hai, yaha click karwa do
        // await page.click('#collectCoinsButton');
      } catch (err) {
        console.error('Error during refresh:', err);
      }
    }, 10 * 60 * 1000); // har 10 minute refresh

  } catch (err) {
    console.error('Error:', err);
  }

})();
