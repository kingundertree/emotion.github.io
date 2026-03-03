const puppeteer = require('puppeteer-core');
const os = require('os');

(async () => {
    const homeDir = os.homedir();
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });
    
    const indexPath = `${homeDir}/.openclaw/workspace/emotion.github.io/index.html`;
    console.log('Loading:', indexPath);
    
    try {
        await page.goto(`file://${indexPath}`, { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });
        await new Promise(r => setTimeout(r, 3000));
        
        const homeScreenshot = `${homeDir}/.openclaw/workspace/emotion.github.io/screenshots/homepage.png`;
        await page.screenshot({ path: homeScreenshot, fullPage: false });
        console.log('✅ 主页截图:', homeScreenshot);
    } catch (err) {
        console.error('Error:', err.message);
    }
    
    await browser.close();
})();
