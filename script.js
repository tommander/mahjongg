document.addEventListener('DOMContentLoaded', () => {
	window.mahjongg = {
		start: new Date().valueOf(),
		points: 0,
	};

	const brickTypes = [
		'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
		'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
		'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
		'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
		'character1','character2','character3','character4','character5','character6','character7','character8','character9',
		'character1','character2','character3','character4','character5','character6','character7','character8','character9',
		'character1','character2','character3','character4','character5','character6','character7','character8','character9',
		'character1','character2','character3','character4','character5','character6','character7','character8','character9',
		'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
		'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
		'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
		'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
		'dragonB','dragonG','dragonR',
		'dragonB','dragonG','dragonR',
		'dragonB','dragonG','dragonR',
		'dragonB','dragonG','dragonR',
		'windE','windN','windS','windW',
		'windE','windN','windS','windW',
		'windE','windN','windS','windW',
		'windE','windN','windS','windW',
		'flowerB','flowerG','flowerO','flowerR',
		'seasonB','seasonG','seasonO','seasonY'
	];

	const nameMap = {
		bamboo1: "Jednička Bambus",
		bamboo2: "Dvojka Bambus",
		bamboo3: "Trojka Bambus",
		bamboo4: "Čtyřka Bambus",
		bamboo5: "Pětka Bambus",
		bamboo6: "Šestka Bambus",
		bamboo7: "Sedma Bambus",
		bamboo8: "Osma Bambus",
		bamboo9: "Devítka Bambus",
		character1: "Jednička Znak",
		character2: "Dvojka Znak",
		character3: "Trojka Znak",
		character4: "Čtyřka Znak",
		character5: "Pětka Znak",
		character6: "Šestka Znak",
		character7: "Sedma Znak",
		character8: "Osma Znak",
		character9: "Devítka Znak",
		circle1: "Jednička Kruh",
		circle2: "Dvojka Kruh",
		circle3: "Trojka Kruh",
		circle4: "Čtyřka Kruh",
		circle5: "Pětka Kruh",
		circle6: "Šestka Kruh",
		circle7: "Sedma Kruh",
		circle8: "Osma Kruh",
		circle9: "Devítka Kruh",
		dragonB: "Modrý Drak",
		dragonG: "Zelený Drak",
		dragonR: "Červený Drak",
		windE: "Východní Vítr",
		windN: "Severní Vítr",
		windS: "Jižní Vítr",
		windW: "Západní Vítr",
		flowerB: "Modrá Květina",
		flowerG: "Zelená Květina",
		flowerO: "Oranžová Květina",
		flowerR: "Červená Květina",
		seasonB: "Zimní Období",
		seasonG: "Jarní Období",
		seasonO: "Podzimní Období",
		seasonY: "Letní Období",
	};

	const symbolMap = {
		bamboo1: '🀐',
		bamboo2: '🀑',
		bamboo3: '🀒',
		bamboo4: '🀓',
		bamboo5: '🀔',
		bamboo6: '🀕',
		bamboo7: '🀖',
		bamboo8: '🀗',
		bamboo9: '🀘',
		character1: '🀇',
		character2: '🀈',
		character3: '🀉',
		character4: '🀊',
		character5: '🀋',
		character6: '🀌',
		character7: '🀍',
		character8: '🀎',
		character9: '🀏',
		circle1: '🀙',
		circle2: '🀚',
		circle3: '🀛',
		circle4: '🀜',
		circle5: '🀝',
		circle6: '🀞',
		circle7: '🀟',
		circle8: '🀠',
		circle9: '🀡',
		dragonB: '🀆',
		dragonG: '🀅',
		dragonR: '🀄︎',
		windE: '🀀',
		windN: '🀃',
		windS: '🀁',
		windW: '🀂',
		flowerB: '🀢',
		flowerG: '🀣',
		flowerO: '🀤',
		flowerR: '🀥',
		seasonB: '🀩',
		seasonG: '🀦',
		seasonO: '🀨',
		seasonY: '🀧',
	};

	const pointsMap = {
		character1: 2,
		character2: 2,
		character3: 2,
		character4: 2,
		character5: 2,
		character6: 2,
		character7: 2,
		character8: 2,
		character9: 2,
		circle1: 4,
		circle2: 4,
		circle3: 4,
		circle4: 4,
		circle5: 4,
		circle6: 4,
		circle7: 4,
		circle8: 4,
		circle9: 4,
		bamboo1: 6,
		bamboo2: 6,
		bamboo3: 6,
		bamboo4: 6,
		bamboo5: 6,
		bamboo6: 6,
		bamboo7: 6,
		bamboo8: 6,
		bamboo9: 6,
		windE: 8,
		windN: 8,
		windS: 8,
		windW: 8,
		dragonB: 10,
		dragonG: 10,
		dragonR: 10,
		flowerB: 12,
		flowerG: 12,
		flowerO: 12,
		flowerR: 12,
		seasonB: 14,
		seasonG: 14,
		seasonO: 14,
		seasonY: 14,
	};

	const checkLose = () => {
		const allTiles = document.querySelectorAll('div.tile');
		let notBlocked = [];
		for (const tile of allTiles) {
			if (isBlocked(tile) === false) {
				notBlocked.push(tile.dataset.t);
			}
		}
		notBlocked.sort();
		const notBlockedPairs = [];
		let prev = null;
		for (const one of notBlocked) {
			if (prev !== null && ((prev.startsWith('flower') && one.startsWith('flower')) || (prev.startsWith('season') && one.startsWith('season')) || prev === one) && notBlockedPairs.indexOf(one) === -1) {
				notBlockedPairs.push(one);
			}
			prev = one;
		}

		if (notBlockedPairs.length > 0) {
			return;
		}

		const elLose = document.getElementById('lose');
		if (!elLose) {
			return;
		}
		elLose.showModal();
	}

	const checkWin = () => {
		const anyTile = document.querySelector('div.tile');
		if (anyTile) {
			checkLose();
			return;
		}

		const elWin = document.getElementById('win');
		if (!elWin) {
			return;
		}
		clearInterval(timeInt);
		const elDlgDetail = document.querySelector('#win .dlgdetail');
		const elTime = document.getElementById('time');
		if ((elDlgDetail instanceof HTMLElement) && (elTime instanceof HTMLElement)) {
			elDlgDetail.innerText = elTime.innerText;
		}
		elWin.showModal();
	}

	const isBrick = (elem) => {
		return (
			(elem instanceof Element) &&
			elem.classList.contains('tile') &&
			('x' in elem.dataset) &&
			('y' in elem.dataset) &&
			('z' in elem.dataset)
		);
	}

	const isBlocked = (brick) => {
		if (!isBrick(brick)) {
			return null;
		}

		const myX = parseInt(brick.dataset.x);
		const myY = parseInt(brick.dataset.y);
		const myZ = parseInt(brick.dataset.z);

		if (
			(
				// Left blocked, partial or full
				document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY-1}"][data-z="${myZ}"]`) ||
				document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY}"][data-z="${myZ}"]`) ||
				document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY+1}"][data-z="${myZ}"]`)
			) && (
				// Right blocked, partial or full
				document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY-1}"][data-z="${myZ}"]`) ||
				document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY}"][data-z="${myZ}"]`) ||
				document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY+1}"][data-z="${myZ}"]`)
			)
		) {
			return true;
		}

		if (
			// Same column, partial or full cover
			document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
			// One half column above
			document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
			// One half column below
			document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY+1}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY+1}"][data-z="${myZ+1}"]`) ||
			document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY+1}"][data-z="${myZ+1}"]`)
		) {
			return true;
		}

		return false;
	}

	const onTileClick = (evt) => {
		if (isBlocked(evt.target) !== false) {
			return;
		}

		if (evt.target.dataset.s === "selected") {
			delete evt.target.dataset.s;
			return;
		}
		evt.target.dataset.s = "selected";

		const listSel = document.querySelectorAll(`div.tile[data-s="selected"]`);
		if (listSel.length !== 2) {
			return;
		}

		if (
			(listSel[0].dataset.t.startsWith('flower') && listSel[1].dataset.t.startsWith('flower')) ||
			(listSel[0].dataset.t.startsWith('season') && listSel[1].dataset.t.startsWith('season')) ||
			listSel[0].dataset.t === listSel[1].dataset.t
		) {
			window.mahjongg.points += (pointsMap[listSel[0].dataset.t] + pointsMap[listSel[1].dataset.t]);
			let strPoints = 'bodů';
			if (window.mahjongg.points === 1) {
				strPoints = 'bod';
			} else if (window.mahjongg.points > 1 && window.mahjongg.points <= 4) {
				strPoints = 'body';
			}
			const elPoints = document.getElementById('points');
			if (elPoints instanceof HTMLElement) {
				elPoints.innerText = `${window.mahjongg.points} ${strPoints}`;
			}
			listSel[0].remove();
			listSel[1].remove();
			checkWin();
			return;
		}

		delete evt.target.dataset.s;
	};

	const onTileMouseEnter = (evt) => {
		const elImg = document.getElementById('currentimg');
		const elText = document.getElementById('currentname');
		if (!(elImg instanceof HTMLImageElement) || !(elText instanceof HTMLElement)) {
			return;
		}
		elImg.src = 'tiles/tile_' + evt.target.dataset.t + '.svg';
		elText.innerText = nameMap[evt.target.dataset.t];
	};

	const onTileMouseLeave = (evt) => {
		const elImg = document.getElementById('currentimg');
		const elText = document.getElementById('currentname');
		if (!(elImg instanceof HTMLImageElement) || !(elText instanceof HTMLElement)) {
			return;
		}
		elImg.src = 'tiles/tile_empty.svg';
		elText.innerText = 'Nula Nic';
	};

	const initTiles = () => {
		const elGame = document.getElementById('game');
		if (!(elGame instanceof HTMLElement)) {
			return;
		}

		const shapeRatio = (window.mahjongg.shapeDim.w / window.mahjongg.shapeDim.h);
		const screenRatio = (elGame.clientWidth / elGame.clientHeight);

		let tileH = 0;
		let tileW = 0;
		let tileS = 0;

		if (shapeRatio > screenRatio) {
			tileW = ((2 * elGame.clientWidth) / window.mahjongg.shapeDim.w);
			tileH = ((tileW * 9) / 7);
			tileS = (tileW / 7);
		} else {
			tileH = ((2 * elGame.clientHeight) / window.mahjongg.shapeDim.h);
			tileW = ((tileH * 7) / 9);
			tileS = (tileH / 9);
		}

		const tiles = document.getElementsByClassName('tile');
		for (const tile of tiles) {
			if (!isBrick(tile)) {
				continue;
			}
			const tileX = parseInt(tile.dataset.x);
			const tileY = parseInt(tile.dataset.y);
			const tileZ = parseInt(tile.dataset.z);
			const tileLeft = Math.round(((tileX - 1) * ((tileW - tileS) / 2)) - ((tileZ - 1) * tileS));
			const tileTop = Math.round(((tileY - 1) * ((tileH - tileS) / 2)) - ((tileZ - 1) * (tileS * 3 / 4)));
			tile.style.width = `${Math.round(tileW)}px`;
			tile.style.height = `${Math.round(tileH)}px`;
			tile.style.left = `${tileLeft}px`;
			tile.style.top = `${tileTop}px`;
		}
	}

	const elWinClose = document.getElementById('winClose');
	if (elWinClose instanceof EventTarget) {
		elWinClose.addEventListener('click', () => {
			const elWin = document.getElementById('win');
			if (elWin instanceof HTMLDialogElement) {
				elWin.close();
			}
		});
	}

	const elLoseClose = document.getElementById('loseClose');
	if (elLoseClose instanceof EventTarget) {
		elLoseClose.addEventListener('click', () => {
			const elLose = document.getElementById('lose');
			if (elLose instanceof HTMLDialogElement) {
				elLose.close();
			}
		});
	}

	const elHelpClose = document.getElementById('helpClose');
	if (elHelpClose instanceof EventTarget) {
		elHelpClose.addEventListener('click', () => {
			const elHelp = document.getElementById('help');
			if (elHelp instanceof HTMLDialogElement) {
				elHelp.close();
			}
		});
	}

	const elsNewGame = document.getElementsByClassName('newGame');
	for (const elNewGame of elsNewGame) {
		if (!(elNewGame instanceof EventTarget)) {
			continue;
		}
		elNewGame.addEventListener('click', () => {
			window.location.reload();
		});
	}

	const elsHelpButton = document.getElementsByClassName('helpButton');
	for (const elHelpButton of elsHelpButton) {
		if (!(elHelpButton instanceof EventTarget)) {
			continue;
		}
		elHelpButton.addEventListener('click', () => {
			const dlgHelp = document.getElementById('help');
			if (dlgHelp instanceof HTMLDialogElement) {
				dlgHelp.showModal();
			}
		});
	}

	const timeProc = () => {
		const elTime = document.getElementById('time');
		if (!(elTime instanceof HTMLElement)) {
			return;
		}
		const diff = Math.floor((new Date().valueOf() - window.mahjongg.start) / 1000);
		const diffM = Math.floor(diff / 60);
		const diffS = diff % 60;
		elTime.innerText = `${diffM}m ${diffS}s`;
	};
	const timeInt = setInterval(timeProc, 1000);

	const drawGame = (shape) => {
		let shapeDef = [];
		window.mahjongg.shapeDim = {w: 0, h: 0};
		if (shape === 'turtle') {
			shapeDef = [
				{x: 3, y: 1, z: 1}, {x: 5, y: 1, z: 1}, {x: 7, y: 1, z: 1}, {x: 9, y: 1, z: 1},
				{x: 11, y: 1, z: 1}, {x: 13, y: 1, z: 1}, {x: 15, y: 1, z: 1}, {x: 17, y: 1, z: 1},
				{x: 19, y: 1, z: 1}, {x: 21, y: 1, z: 1}, {x: 23, y: 1, z: 1}, {x: 25, y: 1, z: 1},
				{x: 7, y: 3, z: 1}, {x: 9, y: 3, z: 1}, {x: 11, y: 3, z: 1}, {x: 13, y: 3, z: 1},
				{x: 15, y: 3, z: 1}, {x: 17, y: 3, z: 1}, {x: 19, y: 3, z: 1}, {x: 21, y: 3, z: 1},
				{x: 5, y: 5, z: 1}, {x: 7, y: 5, z: 1}, {x: 9, y: 5, z: 1}, {x: 11, y: 5, z: 1},
				{x: 13, y: 5, z: 1}, {x: 15, y: 5, z: 1}, {x: 17, y: 5, z: 1}, {x: 19, y: 5, z: 1},
				{x: 21, y: 5, z: 1}, {x: 23, y: 5, z: 1}, {x: 1, y: 8, z: 1}, {x: 3, y: 7, z: 1},
				{x: 5, y: 7, z: 1}, {x: 7, y: 7, z: 1}, {x: 9, y: 7, z: 1}, {x: 11, y: 7, z: 1},
				{x: 13, y: 7, z: 1}, {x: 15, y: 7, z: 1}, {x: 17, y: 7, z: 1}, {x: 19, y: 7, z: 1},
				{x: 21, y: 7, z: 1}, {x: 23, y: 7, z: 1}, {x: 25, y: 7, z: 1}, {x: 3, y: 9, z: 1},
				{x: 5, y: 9, z: 1}, {x: 7, y: 9, z: 1}, {x: 9, y: 9, z: 1}, {x: 11, y: 9, z: 1},
				{x: 13, y: 9, z: 1}, {x: 15, y: 9, z: 1}, {x: 17, y: 9, z: 1}, {x: 19, y: 9, z: 1},
				{x: 21, y: 9, z: 1}, {x: 23, y: 9, z: 1}, {x: 25, y: 9, z: 1}, {x: 27, y: 8, z: 1},
				{x: 29, y: 8, z: 1}, {x: 5, y: 11, z: 1}, {x: 7, y: 11, z: 1}, {x: 9, y: 11, z: 1},
				{x: 11, y: 11, z: 1}, {x: 13, y: 11, z: 1}, {x: 15, y: 11, z: 1}, {x: 17, y: 11, z: 1},
				{x: 19, y: 11, z: 1}, {x: 21, y: 11, z: 1}, {x: 23, y: 11, z: 1}, {x: 7, y: 13, z: 1},
				{x: 9, y: 13, z: 1}, {x: 11, y: 13, z: 1}, {x: 13, y: 13, z: 1}, {x: 15, y: 13, z: 1},
				{x: 17, y: 13, z: 1}, {x: 19, y: 13, z: 1}, {x: 21, y: 13, z: 1}, {x: 3, y: 15, z: 1},
				{x: 5, y: 15, z: 1}, {x: 7, y: 15, z: 1}, {x: 9, y: 15, z: 1}, {x: 11, y: 15, z: 1},
				{x: 13, y: 15, z: 1}, {x: 15, y: 15, z: 1}, {x: 17, y: 15, z: 1}, {x: 19, y: 15, z: 1},
				{x: 21, y: 15, z: 1}, {x: 23, y: 15, z: 1}, {x: 25, y: 15, z: 1}, {x: 9, y: 3, z: 2},
				{x: 11, y: 3, z: 2}, {x: 13, y: 3, z: 2}, {x: 15, y: 3, z: 2}, {x: 17, y: 3, z: 2},
				{x: 19, y: 3, z: 2}, {x: 9, y: 5, z: 2}, {x: 11, y: 5, z: 2}, {x: 13, y: 5, z: 2},
				{x: 15, y: 5, z: 2}, {x: 17, y: 5, z: 2}, {x: 19, y: 5, z: 2}, {x: 9, y: 7, z: 2},
				{x: 11, y: 7, z: 2}, {x: 13, y: 7, z: 2}, {x: 15, y: 7, z: 2}, {x: 17, y: 7, z: 2},
				{x: 19, y: 7, z: 2}, {x: 9, y: 9, z: 2}, {x: 11, y: 9, z: 2}, {x: 13, y: 9, z: 2},
				{x: 15, y: 9, z: 2}, {x: 17, y: 9, z: 2}, {x: 19, y: 9, z: 2}, {x: 9, y: 11, z: 2},
				{x: 11, y: 11, z: 2}, {x: 13, y: 11, z: 2}, {x: 15, y: 11, z: 2}, {x: 17, y: 11, z: 2},
				{x: 19, y: 11, z: 2}, {x: 9, y: 13, z: 2}, {x: 11, y: 13, z: 2}, {x: 13, y: 13, z: 2},
				{x: 15, y: 13, z: 2}, {x: 17, y: 13, z: 2}, {x: 19, y: 13, z: 2}, {x: 11, y: 5, z: 3},
				{x: 13, y: 5, z: 3}, {x: 15, y: 5, z: 3}, {x: 17, y: 5, z: 3}, {x: 11, y: 7, z: 3},
				{x: 13, y: 7, z: 3}, {x: 15, y: 7, z: 3}, {x: 17, y: 7, z: 3}, {x: 11, y: 9, z: 3},
				{x: 13, y: 9, z: 3}, {x: 15, y: 9, z: 3}, {x: 17, y: 9, z: 3}, {x: 11, y: 11, z: 3},
				{x: 13, y: 11, z: 3}, {x: 15, y: 11, z: 3}, {x: 17, y: 11, z: 3}, {x: 13, y: 7, z: 4},
				{x: 15, y: 7, z: 4}, {x: 13, y: 9, z: 4}, {x: 15, y: 9, z: 4}, {x: 14, y: 8, z: 5}
			];
			window.mahjongg.shapeDim.w = 29;
			window.mahjongg.shapeDim.h = 15;
		}

		const elGame = document.getElementById('game');
		if (!(elGame instanceof Element)) {
			return;
		}
		let counter = 0;
		for (const tileShape of shapeDef) {
			const elTile = document.createElement('div');
			elTile.id = `t${counter++}`;
			elTile.classList.add('tile');
			elTile.dataset.x = tileShape.x;
			elTile.dataset.y = tileShape.y;
			elTile.dataset.z = tileShape.z;
			elTile.addEventListener('click', onTileClick);
			elTile.addEventListener('mouseenter', onTileMouseEnter);
			elTile.addEventListener('mouseleave', onTileMouseLeave);
			const randomType = Math.floor(Math.random() * brickTypes.length);
			elTile.dataset.t = brickTypes[randomType];
			brickTypes.splice(randomType, 1);
			elGame.insertAdjacentElement('beforeend', elTile);
		}
	}

	drawGame('turtle');
	initTiles();

	var resizeTimeout = false;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(initTiles, 250);
	});
});