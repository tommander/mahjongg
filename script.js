document.addEventListener('DOMContentLoaded', () => {
	window.mahjongg = {
		start: new Date().valueOf(),
		points: 0,
	};

	const brickTypes = [
		'🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘',
		'🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘',
		'🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘',
		'🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘',
		'🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏',
		'🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏',
		'🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏',
		'🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏',
		'🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡',
		'🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡',
		'🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡',
		'🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡',
		'🀆','🀅','🀄︎',
		'🀆','🀅','🀄︎',
		'🀆','🀅','🀄︎',
		'🀆','🀅','🀄︎',
		'🀀','🀃','🀁','🀂',
		'🀀','🀃','🀁','🀂',
		'🀀','🀃','🀁','🀂',
		'🀀','🀃','🀁','🀂',
		'🀢', '🀣', '🀤', '🀥',
		'🀩', '🀦', '🀨', '🀧'
	];

	const characters = ['🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏'];
	const circles = ['🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡'];
	const sticks = ['🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘'];
	const dragons = ['🀆','🀅','🀄︎'];
	const winds = ['🀀','🀃','🀁','🀂'];
	const flowers = ['🀢', '🀣', '🀤', '🀥'];
	const seasons = ['🀩', '🀦', '🀨', '🀧'];

	const nameMap = {
		'🀐': "Vrabec",
		'🀑': "Dvě tyčky",
		'🀒': "Tři tyčky",
		'🀓': "Čtyři tyčky",
		'🀔': "Pět tyček",
		'🀕': "Šest tyček",
		'🀖': "Sedm tyček",
		'🀗': "Osm tyček",
		'🀘': "Devět tyček",
		'🀇': "Deset tisíc",
		'🀈': "Dvacet tisíc",
		'🀉': "Třicet tisíc",
		'🀊': "Čtyřicet tisíc",
		'🀋': "Padesát tisíc",
		'🀌': "Šedesát tisíc",
		'🀍': "Sedmdesát tisíc",
		'🀎': "Osmdesát tisíc",
		'🀏': "Devadesát tisíc",
		'🀙': "Jedna mince",
		'🀚': "Dvě mince",
		'🀛': "Tři mince",
		'🀜': "Čtyři mince",
		'🀝': "Pět mincí",
		'🀞': "Šest mincí",
		'🀟': "Sedm mincí",
		'🀠': "Osm mincí",
		'🀡': "Devět mincí",
		'🀆': "Bílý drak",
		'🀅': "Zelený drak",
		'🀄︎': "Červený drak",
		'🀀': "Východní vítr",
		'🀃': "Severní vítr",
		'🀁': "Jižní vítr",
		'🀂': "Západní vítr",
		'🀢': "Švestka",
		'🀣': "Orchidej",
		'🀤': "Bambus",
		'🀥': "Chryzantéma",
		'🀩': "Zima",
		'🀦': "Jaro",
		'🀨': "Podzim",
		'🀧': "Léto",
	};

	const pointsMap = {
		'🀇': 2, '🀈': 2, '🀉': 2, '🀊': 2, '🀋': 2, '🀌': 2, '🀍': 2, '🀎': 2, '🀏': 2,
		'🀙': 4, '🀚': 4, '🀛': 4, '🀜': 4, '🀝': 4, '🀞': 4, '🀟': 4, '🀠': 4, '🀡': 4,
		'🀐': 6, '🀑': 6, '🀒': 6, '🀓': 6, '🀔': 6, '🀕': 6, '🀖': 6, '🀗': 6, '🀘': 6,
		'🀀': 8, '🀃': 8, '🀁': 8, '🀂': 8,
		'🀆': 10, '🀅': 10, '🀄︎': 10,
		'🀢': 12, '🀣': 12, '🀤': 12, '🀥': 12,
		'🀩': 14, '🀦': 14, '🀨': 14, '🀧': 14,
	};

	const checkLose = () => {
		const allTiles = document.querySelectorAll('div.tile');
		let notBlocked = [];
		for (const tile of allTiles) {
			if (isBlocked(tile) === false) {
				notBlocked.push(tile.innerText);
			}
		}
		notBlocked.sort();
		const notBlockedPairs = [];
		let prev = null;
		for (const one of notBlocked) {
			if (prev !== null && (prev === one || (flowers.indexOf(prev) > -1 && flowers.indexOf(one) > -1) || (seasons.indexOf(prev) > -1 && seasons.indexOf(one) > -1)) && notBlockedPairs.indexOf(one) === -1) {
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
			elem.classList.contains('tile')
		);
	}

	const isBlocked = (brick) => {
		if (!isBrick(brick)) {
			return null;
		}

		const myX = parseInt(brick.style.gridColumn);
		const myY = parseInt(brick.style.gridRow);
		const myZ = parseInt(brick.style.zIndex);

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
			listSel[0].innerText === listSel[1].innerText ||
			(flowers.indexOf(listSel[0].innerText) > -1 && flowers.indexOf(listSel[1].innerText) > -1) ||
			(seasons.indexOf(listSel[0].innerText) > -1 && seasons.indexOf(listSel[1].innerText) > -1)
		) {
			window.mahjongg.points += (pointsMap[listSel[0].innerText] + pointsMap[listSel[1].innerText]);
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
		if (!(elImg instanceof HTMLElement) || !(elText instanceof HTMLElement)) {
			return;
		}
		elImg.innerText = evt.target.innerText;
		elText.innerText = nameMap[evt.target.innerText];
	};

	const onTileMouseLeave = (evt) => {
		const elImg = document.getElementById('currentimg');
		const elText = document.getElementById('currentname');
		if (!(elImg instanceof HTMLElement) || !(elText instanceof HTMLElement)) {
			return;
		}
		elImg.innerText = '';
		elText.innerText = '';
	};

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
		let shapeDim = {w: 0, h: 0};
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
			shapeDim.w = 29;
			shapeDim.h = 15;
		}

		const elGame = document.getElementById('game');
		const elPanel = document.getElementById('toppanel');
		if (!(elGame instanceof Element) || !(elPanel instanceof Element)) {
			return;
		}

		const screenWidth = visualViewport.width;
		const screenHeight = (visualViewport.height - elPanel.clientHeight); 

		const shapeRatio = (shapeDim.w / shapeDim.h);
		const screenRatio = (screenWidth / screenHeight);

		let tileH = 0;
		let tileW = 0;
		let tileS = 0;

		if (shapeRatio > screenRatio) {
			tileW = ((2 * screenWidth) / shapeDim.w);
			tileH = ((tileW * 9) / 7);
			tileS = (tileW / 7);
		} else {
			tileH = ((2 * screenHeight) / shapeDim.h);
			tileW = ((tileH * 7) / 9);
			tileS = (tileH / 9);
		}

		elGame.style.gridTemplateColumns = `repeat(${shapeDim.w + 1}, ${Math.round(tileW / 2)}px)`;
		elGame.style.gridTemplateRows = `repeat(${shapeDim.h + 1}, ${Math.round(tileH / 2)}px)`;
		let counter = 0;
		for (const tileShape of shapeDef) {
			const elTile = document.createElement('div');
			elTile.id = `t${counter++}`;
			elTile.classList.add('tile');
			elTile.style.gridColumn = `${tileShape.x} / ${tileShape.x + 2}`;
			elTile.style.gridRow = `${tileShape.y} / ${tileShape.y + 2}`;
			elTile.style.zIndex = tileShape.z;
			elTile.style.left = `${Math.round(((tileShape.x/2-1) + (tileShape.z-1)) * (-tileS))}px`;
			elTile.style.top = `${Math.round(((tileShape.y/2-1) + ((tileShape.z-1) * 3/4)) * (-tileS))}px`;
			elTile.style.width = `${Math.round(tileW)}px`;
			elTile.style.height = `${Math.round(tileH)}px`;
			elTile.style.fontSize = `${Math.round(tileW * 1.1)}px`;
			elTile.dataset.x = tileShape.x;
			elTile.dataset.y = tileShape.y;
			elTile.dataset.z = tileShape.z;
			elTile.addEventListener('click', onTileClick);
			elTile.addEventListener('mouseenter', onTileMouseEnter);
			elTile.addEventListener('mouseleave', onTileMouseLeave);
			const randomType = Math.floor(Math.random() * brickTypes.length);
			elTile.innerText = brickTypes[randomType];
			if (characters.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#BD0000';
			}
			if (sticks.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#3E6800';
			}
			if (circles.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#3A3AFF';
			}
			if (dragons.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#7B5700';
			}
			if (winds.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#A600A6';
			}
			if (flowers.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#006868';
			}
			if (seasons.indexOf(elTile.innerText) > -1) {
				elTile.style.color = '#000000';
			}
			brickTypes.splice(randomType, 1);
			elGame.insertAdjacentElement('beforeend', elTile);
		}
	}

	drawGame('turtle');
});