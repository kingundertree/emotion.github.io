const puppeteer = require('puppeteer-core');
const path = require('path');
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
    
    // 测试主页
    const indexPath = `${homeDir}/.openclaw/workspace/emotion.github.io/index.html`;
    await page.goto(`file://${indexPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const homeScreenshot = `${homeDir}/.openclaw/workspace/emotion.github.io/screenshots/homepage.png`;
    await page.screenshot({ path: homeScreenshot, fullPage: true });
    console.log('✅ 主页截图:', homeScreenshot);
    
    // 测试搜索页面
    const testPath = `${homeDir}/.openclaw/workspace/emotion.github.io/test-search.html`;
    await page.goto(`file://${testPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    const searchScreenshot = `${homeDir}/.openclaw/workspace/emotion.github.io/screenshots/search-test.png`;
    await page.screenshot({ path: searchScreenshot, fullPage: true });
    console.log('✅ 搜索测试截图:', searchScreenshot);
    
    await browser.close();
    console.log('\n截图完成！');
})();
