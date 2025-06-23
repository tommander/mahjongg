import puppeteer from 'puppeteer';

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

	for (const browserData of browsers) {
		console.log(`Testing browser ${browserData.browser}...`);
		const browser = await puppeteer.launch(browserData);

		for (const resolution of resolutions) {
			console.log(`  Testing resolution ${resolution.text}...`);

			const context = await browser.createBrowserContext();
			const page = await context.newPage();
			await page.setViewport({width: resolution.width, height: resolution.height});
			// page.on('console', (evt) => {
			// 	console.log('CONSOLE:', evt.text());
			// })
			await page.goto(`${pageUrl}?deal=🀡🀝🀍🀇🀖🀌🀀🀚🀄︎🀀🀝🀘🀛🀒🀠🀕🀐🀛🀜🀒🀐🀘🀗🀌🀝🀂🀅🀋🀎🀃🀆🀟🀔🀌🀔🀏🀊🀚🀒🀅🀉🀜🀑🀙🀝🀏🀃🀅🀀🀠🀕🀧🀉🀡🀖🀃🀢🀋🀏🀍🀟🀖🀞🀕🀁🀄︎🀚🀗🀅🀞🀑🀇🀞🀐🀜🀔🀡🀍🀛🀍🀛🀠🀒🀠🀎🀘🀗🀔🀚🀟🀓🀊🀉🀈🀦🀓🀃🀟🀇🀓🀆🀣🀙🀥🀈🀁🀊🀘🀈🀋🀌🀙🀑🀀🀓🀂🀖🀞🀐🀋🀩🀕🀂🀊🀜🀆🀉🀑🀄︎🀄︎🀆🀗🀎🀂🀎🀈🀡🀤🀨🀁🀏🀇🀁🀙`, {waitUntil: 'networkidle2'});

			// Main page screenshot
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main00-page.png`
			});

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main01-time.png`
			});
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main02-newgamebtn.png`
			});

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main03-helpbtn.png`
			});

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main04-beginnerbtn.png`
			});

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main05-reshufflebtn.png`
			});

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main06-undobtn.png`
			});

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main07-redobtn.png`
			});

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main08-csczbtn.png`
			});

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main09-enusbtn.png`
			});

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main10-toptile.png`
			});

			// New game button click screenshot
			await page.locator('#toppanel .newGame').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main11-newgame.png`
			});

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main12-help.png`
			});
			await page.locator('#help .closeButton').click();

			// Beginner button click screenshot
			await page.locator('#beginnerButton').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main13-beginner.png`
			});

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
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main14-match.png`
			});

			// Undo button click screenshot
			await page.locator('#undoButton').click();
			await delay(500);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main15-undo.png`
			});

			// Redo button click screenshot
			await page.locator('#redoButton').click();
			await delay(500);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main16-redo.png`
			});

			// Reshuffle button click screenshot
			await page.locator('#reshuffleButton').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main17-reshuffle.png`
			});

			// English language button click screenshot
			await page.locator('button[data-lang="en-US"]').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main18-enus.png`
			});

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main19-time.png`
			});
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main20-newgamebtn.png`
			});

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main21-helpbtn.png`
			});

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main22-beginnerbtn.png`
			});

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main23-reshufflebtn.png`
			});

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main24-undobtn.png`
			});

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main25-redobtn.png`
			});

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main26-csczbtn.png`
			});

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main27-enusbtn.png`
			});

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main28-toptile.png`
			});

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main29-help.png`
			});
			await page.locator('#help .closeButton').click();

			// Czech language button click screenshot
			await page.locator('button[data-lang="cs-CZ"]').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main30-csczbtn.png`
			});

			// Time click screenshot
			await page.locator('#time').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main31-time.png`
			});
			await page.locator('#time').click();

			// New game button hover screenshot
			await page.locator('#toppanel .newGame').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main32-newgamebtn.png`
			});

			// Help button hover screenshot
			await page.locator('#helpButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main33-helpbtn.png`
			});

			// Beginner button hover screenshot
			await page.locator('#beginnerButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main34-beginnerbtn.png`
			});

			// Reshuffle button hover screenshot
			await page.locator('#reshuffleButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main35-reshufflebtn.png`
			});

			// Undo button hover screenshot
			await page.locator('#undoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main36-undobtn.png`
			});

			// Redo button hover screenshot
			await page.locator('#redoButton').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main37-redobtn.png`
			});

			// Czech language button hover screenshot
			await page.locator('button[data-lang="cs-CZ"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main38-csczbtn.png`
			});

			// English language button hover screenshot
			await page.locator('button[data-lang="en-US"]').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main39-enusbtn.png`
			});

			// Top tile hover screenshot
			await page.locator('div.tile.z5').hover();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main40-toptile.png`
			});

			// Help button click screenshot
			await page.locator('#helpButton').click();
			await delay(100);
			await page.screenshot({
				path: `visual-test-result/test_${browserData.browser}_${resolution.text}_main41-help.png`
			});
			await page.locator('#help .closeButton').click();

			await context.close();
		}

		const context = await browser.createBrowserContext();
		const page = await context.newPage();

		// Win a game
		await page.goto(`${pageUrl}?test=win`, {waitUntil: 'networkidle2'});
		await page.locator('#win').click();
		await page.screenshot({
			path: `visual-test-result/test_${browserData.browser}_win.png`
		});

		// Lose a game
		await page.goto(`${pageUrl}?test=lose`, {waitUntil: 'networkidle2'});
		await page.locator('#lose').click();
		await page.screenshot({
			path: `visual-test-result/test_${browserData.browser}_lose.png`
		});

		await context.close();
		await browser.close();
	}

	console.log('Test finished.');
})();