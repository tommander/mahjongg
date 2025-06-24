import puppeteer from 'puppeteer';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'node:fs';

(async () => {
	const pageUrl = 'http://localhost:1592/';
	const delay = ms => new Promise(res => setTimeout(res, ms));
	const browsers = [
		{browser: 'firefox'},
		{browser: 'chrome'},
	];
	const resolutions = [
		{width: 1920, height: 964, text: '1920x1080'},
		{width: 760, height: 360, text: '760x360'},
	];
	const makescreenshot = async (page, browserName, resolutionSize, screenshotName) => {
		const screenshotFile = `${browserName}_${resolutionSize}_${screenshotName}`;
		const screenshotPath  = `visual-test-result/${screenshotFile}.png`;
		if (!fs.existsSync(screenshotPath)) {
			await page.screenshot({path: screenshotPath});
			return;
		}

		const screenshotNewPath  = `visual-test-result/${screenshotFile}_new.png`;
		const screenshotDiffPath  = `visual-test-result/${screenshotFile}_diff.png`;
		await page.screenshot({path: screenshotNewPath});

		const img1 = PNG.sync.read(fs.readFileSync(screenshotPath));
		const img2 = PNG.sync.read(fs.readFileSync(screenshotNewPath));
		const {width, height} = img1;
		const diff = new PNG({width, height});
		pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
		fs.writeFileSync(screenshotDiffPath, PNG.sync.write(diff));
	}

	for (const browserData of browsers) {
		console.log(`Testing browser ${browserData.browser}...`);
		const browser = await puppeteer.launch(browserData);

		for (const resolution of resolutions) {
			console.log(`  Testing resolution ${resolution.text}...`);

			const context = await browser.createBrowserContext();
			const page = await context.newPage();
			await page.setViewport({width: resolution.width, height: resolution.height});
			await page.goto(`${pageUrl}?deal=🀡🀝🀍🀇🀖🀌🀀🀚🀄︎🀀🀝🀘🀛🀒🀠🀕🀐🀛🀜🀒🀐🀘🀗🀌🀝🀂🀅🀋🀎🀃🀆🀟🀔🀌🀔🀏🀊🀚🀒🀅🀉🀜🀑🀙🀝🀏🀃🀅🀀🀠🀕🀧🀉🀡🀖🀃🀢🀋🀏🀍🀟🀖🀞🀕🀁🀄︎🀚🀗🀅🀞🀑🀇🀞🀐🀜🀔🀡🀍🀛🀍🀛🀠🀒🀠🀎🀘🀗🀔🀚🀟🀓🀊🀉🀈🀦🀓🀃🀟🀇🀓🀆🀣🀙🀥🀈🀁🀊🀘🀈🀋🀌🀙🀑🀀🀓🀂🀖🀞🀐🀋🀩🀕🀂🀊🀜🀆🀉🀑🀄︎🀄︎🀆🀗🀎🀂🀎🀈🀡🀤🀨🀁🀏🀇🀁🀙`, {waitUntil: 'networkidle2'});

			// Main page screenshot
			await makescreenshot(page, browserData.browser, resolution.text, 'main00-page');

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main01-time');
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main02-newgamebtn');

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main03-helpbtn');

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main04-beginnerbtn');

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main05-reshufflebtn');

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main06-undobtn');

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main07-redobtn');

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main08-csczbtn');

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main09-enusbtn');

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main10-toptile');

			// New game button click screenshot
			await page.locator('#toppanel .newGame').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main11-newgame');

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main12-help');
			await page.locator('#help .closeButton').click();

			// Beginner button click screenshot
			await page.locator('#beginnerButton').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main13-beginner');

			// Match tiles screenshot
			const tileSymbol = await page.$eval('.tile.notBlocked:not([data-t="season"]):not([data-t="flower"])', el => el.innerText);
			const twoTiles = await page.$$(`.tile.notBlocked::-p-text(${tileSymbol})`);
			let idx = 0;
			for (const aTile of twoTiles) {
				await aTile.click();
				idx++;
				if (idx >= 2) {
					break;
				}
			}
			await delay(500);
			await makescreenshot(page, browserData.browser, resolution.text, 'main14-match');

			// Undo button click screenshot
			await page.locator('#undoButton').click();
			await delay(500);
			await makescreenshot(page, browserData.browser, resolution.text, 'main15-undo');

			// Redo button click screenshot
			await page.locator('#redoButton').click();
			await delay(500);
			await makescreenshot(page, browserData.browser, resolution.text, 'main16-redo');

			// Reshuffle button click screenshot
			await page.locator('#reshuffleButton').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main17-reshuffle');

			// English language button click screenshot
			await page.locator('button[data-lang="en-US"]').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main18-enus');

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main19-time');
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main20-newgamebtn');

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main21-helpbtn');

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main22-beginnerbtn');

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main23-reshufflebtn');

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main24-undobtn');

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main25-redobtn');

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main26-csczbtn');

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main27-enusbtn');

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main28-toptile');

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main29-help');
			await page.locator('#help .closeButton').click();

			// Czech language button click screenshot
			await page.locator('button[data-lang="cs-CZ"]').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main30-csczbtn');

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main31-time');
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main32-newgamebtn');

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main33-helpbtn');

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main34-beginnerbtn');

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main35-reshufflebtn');

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main36-undobtn');

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main37-redobtn');

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main38-csczbtn');

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main39-enusbtn');

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main40-toptile');

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await makescreenshot(page, browserData.browser, resolution.text, 'main41-help');
			await page.locator('#help .closeButton').click();

			await context.close();
		}

		const context = await browser.createBrowserContext();
		const page = await context.newPage();

		// Win a game
		await page.goto(`${pageUrl}?test=win`, {waitUntil: 'networkidle2'});
		await page.locator('#win').click();
		await makescreenshot(page, browserData.browser, '', 'win');

		// Lose a game
		await page.goto(`${pageUrl}?test=lose`, {waitUntil: 'networkidle2'});
		await page.locator('#lose').click();
		await makescreenshot(page, browserData.browser, '', 'lose');

		await context.close();
		await browser.close();
	}

	console.log('Test finished.');
})();