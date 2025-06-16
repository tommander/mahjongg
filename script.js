document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Some information that is kept for the entire duration of the game.
	 * 
	 * @type {object}
	 * @property {Date} start - Start timestamp of the game
	 * @property {number} points - Player's collected points
	 * @property {object} shapeDim - Width, height and maximum z-index of the current deal shape
	 */
	const initSession = () => {
		sessionStorage.setItem('start', new Date().valueOf());
		sessionStorage.setItem('points', 0);
		sessionStorage.setItem('shapew', 0);
		sessionStorage.setItem('shapeh', 0);
		sessionStorage.setItem('shapez', 0);

	};

	/**
	 * Set of 144 tiles.
	 * 
	 * The code uses this when it's dealing tiles. It repeatedly takes a random tile and removes it
	 * from this array, so, ideally, there is none left at the end of dealing.
	 * 
	 * @constant {string[]}
	 */
	const tileTypes = [
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

	/**
	 * Suited tiles 1-9 of Characters.
	 * 
	 * @constant {string[]}
	 */
	const characters = ['🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏'];
	/**
	 * Suited tiles 1-9 of Circles.
	 * 
	 * @constant {string[]}
	 */
	const circles = ['🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡'];
	/**
	 * Suited tiles 1-9 of Sticks (Bamboos).
	 * 
	 * @constant {string[]}
	 */
	const sticks = ['🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘'];
	/**
	 * Honors tiles Red/White/Green Dragon.
	 * 
	 * @constant {string[]}
	 */
	const dragons = ['🀆','🀅','🀄︎'];
	/**
	 * Honors tiles North/West/South/East Wind.
	 * 
	 * @constant {string[]}
	 */
	const winds = ['🀀','🀃','🀁','🀂'];
	/**
	 * Bonus tiles of Flowers - Plum/Chrysanthemum/Orchid/Bamboo.
	 * 
	 * @constant {string[]}
	 */
	const flowers = ['🀢', '🀣', '🀤', '🀥'];
	/**
	 * Bonus tiles of Seasons - Spring, Summer, Autumn, Winter.
	 * 
	 * @constant {string[]}
	 */
	const seasons = ['🀩', '🀦', '🀨', '🀧'];

	/**
	 * Mapping of each Mahjongg tile to its points.
	 * 
	 * @constant {Object.<string,number>}
	 */
	const pointsMap = {
		'🀇': 2, '🀈': 2, '🀉': 2, '🀊': 2, '🀋': 2, '🀌': 2, '🀍': 2, '🀎': 2, '🀏': 2,
		'🀙': 4, '🀚': 4, '🀛': 4, '🀜': 4, '🀝': 4, '🀞': 4, '🀟': 4, '🀠': 4, '🀡': 4,
		'🀐': 6, '🀑': 6, '🀒': 6, '🀓': 6, '🀔': 6, '🀕': 6, '🀖': 6, '🀗': 6, '🀘': 6,
		'🀀': 8, '🀃': 8, '🀁': 8, '🀂': 8,
		'🀆': 10, '🀅': 10, '🀄︎': 10,
		'🀢': 12, '🀣': 12, '🀤': 12, '🀥': 12,
		'🀩': 14, '🀦': 14, '🀨': 14, '🀧': 14,
	};

	/**
	 * Checks whether the player still has some tiles to match. If not, it does not let them suffer
	 * anymore and closes the game right away, showing the "You lost" dialog.
	 * 
	 * @returns {void}
	 */
	const checkLose = () => {
		const allTiles = document.querySelectorAll('.tile');
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

	/**
	 * Checks whether there is at least one tile left in game. If not, it closes the game and shows
	 * the "You won" dialog.
	 *
	 * @returns {void}
	 */
	const checkWin = () => {
		const anyTile = document.querySelector('.tile');
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

	/**
	 * Verifies that the given "something" is an element with class "tile".
	 *
	 * @param {*} elem Anything that needs to be checked.
	 * @returns {boolean}
	 */
	const isTile = (elem) => {
		return (
			(elem instanceof Element) &&
			elem.classList.contains('tile')
		);
	}

	/**
	 * Checks whether the given tile is blocked.
	 * 
	 * A blocked tile has either:
	 *
	 * - Tiles partially or fully covering both its left and right long edge, or
	 * - A tile partially or fully covering it on the top.
	 *
	 * @param {*} tile 
	 * @returns {(null|boolean)}
	 */
	const isBlocked = (tile) => {
		if (!isTile(tile)) {
			return null;
		}

		const myX = parseInt(tile.style.gridColumn);
		const myY = parseInt(tile.style.gridRow);
		const myZ = parseInt(tile.style.zIndex);

		const selectorL = `.tile[data-x="${myX-2}"][data-y="${myY-1}"][data-z="${myZ}"],` +
						  `.tile[data-x="${myX-2}"][data-y="${myY}"][data-z="${myZ}"],` +
						  `.tile[data-x="${myX-2}"][data-y="${myY+1}"][data-z="${myZ}"]`;
		const selectorR = `.tile[data-x="${myX+2}"][data-y="${myY-1}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+2}"][data-y="${myY}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+2}"][data-y="${myY+1}"][data-z="${myZ}"]`;
		const selectorA = `.tile[data-x="${myX-1}"][data-y="${myY}"][data-z="${myZ+1}"],` + 
						  `.tile[data-x="${myX}"][data-y="${myY}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX+1}"][data-y="${myY}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX-1}"][data-y="${myY-1}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX}"][data-y="${myY-1}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX+1}"][data-y="${myY-1}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX-1}"][data-y="${myY+1}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX}"][data-y="${myY+1}"][data-z="${myZ+1}"],` +
						  `.tile[data-x="${myX+1}"][data-y="${myY+1}"][data-z="${myZ+1}"]`;

		return (
			(document.querySelector(selectorL) !== null &&
			document.querySelector(selectorR) !== null) ||
			document.querySelector(selectorA) !== null
		);
	}

	const isBeginner = () => {
		return (localStorage.getItem('beginner') === 'true');
	}
	const enableBeginner = () => {
		localStorage.setItem('beginner', 'true');
		markFreeSidesForAll();
	}
	const disableBeginner = () => {
		localStorage.setItem('beginner', 'false');
		markFreeSidesForAll();
	}
	const toggleBeginner = () => {
		if (isBeginner()) {
			disableBeginner();
		} else {
			enableBeginner();
		}
	}

	const markFreeSides = (tile) => {
		if (!isTile(tile)) {
			return;
		}

		if (tile.classList.contains('freeTop')) {
			tile.classList.remove('freeTop');
		}
		if (tile.classList.contains('freeBottom')) {
			tile.classList.remove('freeBottom');
		}
		if (tile.classList.contains('freeLeft')) {
			tile.classList.remove('freeLeft');
		}
		if (tile.classList.contains('freeRight')) {
			tile.classList.remove('freeRight');
		}
		if (tile.classList.contains('notBlocked')) {
			tile.classList.remove('notBlocked');
		}

		const myX = parseInt(tile.style.gridColumn);
		const myY = parseInt(tile.style.gridRow);
		const myZ = parseInt(tile.style.zIndex);

		const selectorL = `.tile[data-x="${myX-2}"][data-y="${myY-1}"][data-z="${myZ}"],` +
						  `.tile[data-x="${myX-2}"][data-y="${myY}"][data-z="${myZ}"],` +
						  `.tile[data-x="${myX-2}"][data-y="${myY+1}"][data-z="${myZ}"]`;
		const selectorR = `.tile[data-x="${myX+2}"][data-y="${myY-1}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+2}"][data-y="${myY}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+2}"][data-y="${myY+1}"][data-z="${myZ}"]`;
		const selectorT = `.tile[data-x="${myX-1}"][data-y="${myY-2}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX}"][data-y="${myY-2}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+1}"][data-y="${myY-2}"][data-z="${myZ}"]`;
		const selectorB = `.tile[data-x="${myX-1}"][data-y="${myY+2}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX}"][data-y="${myY+2}"][data-z="${myZ}"],` + 
						  `.tile[data-x="${myX+1}"][data-y="${myY+2}"][data-z="${myZ}"]`;

		if (!document.querySelector(selectorL)) {
			tile.classList.add('freeLeft');
		}
		if (!document.querySelector(selectorR)) {
			tile.classList.add('freeRight');
		}
		if (!document.querySelector(selectorT)) {
			tile.classList.add('freeTop');
		}
		if (!document.querySelector(selectorB)) {
			tile.classList.add('freeBottom');
		}
		if (isBeginner() && !isBlocked(tile)) {
			tile.classList.add('notBlocked');
		}
	}

	/**
	 * Mark free sides of all tiles by `free*` classes.
	 *
	 * @return {void}
	 */
	const markFreeSidesForAll = () => {
		const elsTile = document.getElementsByClassName('tile');
		for (const elTile of elsTile) {
			markFreeSides(elTile);
		}
	}

	/**
	 * Handler for a tile's "click" event.
	 * 
	 * This toggles the selection of the tile, if it's not blocked and it's the first selected tile.
	 * 
	 * If there is already another selected tile, it checks whether these two are a match. If not,
	 * nothing happens, otherwise the two tiles are removed and the player is happy.
	 *
	 * @param {MouseEvent} evt Event object
	 * @returns {void}
	 */
	const onTileClick = (evt) => {
		if (isBlocked(evt.target) !== false) {
			return;
		}

		if (evt.target.dataset.s === "selected") {
			delete evt.target.dataset.s;
			return;
		}
		evt.target.dataset.s = "selected";

		const listSel = document.querySelectorAll(`.tile[data-s="selected"]`);
		if (listSel.length !== 2) {
			return;
		}

		if (
			listSel[0].innerText === listSel[1].innerText ||
			(flowers.indexOf(listSel[0].innerText) > -1 && flowers.indexOf(listSel[1].innerText) > -1) ||
			(seasons.indexOf(listSel[0].innerText) > -1 && seasons.indexOf(listSel[1].innerText) > -1)
		) {
			sessionStorage.setItem('points', parseInt(sessionStorage.getItem('points')) + (pointsMap[listSel[0].innerText] + pointsMap[listSel[1].innerText]));
			const elPoints = document.getElementById('points');
			if (elPoints instanceof HTMLElement) {
				elPoints.innerText = sessionStorage.getItem('points');
			}
			listSel[0].remove();
			listSel[1].remove();
			markFreeSidesForAll();
			checkWin();
			return;
		}

		delete evt.target.dataset.s;
	};

	/**
	 * Handler for a tile's "keyup" event.
	 * 
	 * If the key is different from *Enter* or *Spacebar*, nothing happens, otherwise the click
	 * handler is called and default action is prevented.
	 *
	 * @param {KeyboardEvent} evt Event object
	 * @returns {void}
	 */
	const onTileKeyUp = (evt) => {
		if (evt.key !== 'Enter' && evt.key !== ' ') {
			return;
		}
		evt.preventDefault();
		onTileClick(evt);
	};

	/**
	 * Handler for a tile's "mouseenter" event.
	 * 
	 * This updates the bottom-right panel showing the tile's symbol and name.
	 * 
	 * @param {MouseEvent} evt Event object
	 * @returns {void}
	 */
	const onTileMouseEnter = (evt) => {
		const elsShown = document.getElementsByClassName('shown');
		for (const elShown of elsShown) {
			elShown.classList.remove('shown');
		}
		const elImg = document.getElementById('currentimg');
		const elText = document.getElementById(evt.target.innerText);
		if (!(elImg instanceof HTMLElement) || !(elText instanceof HTMLElement)) {
			return;
		}
		elImg.innerText = evt.target.innerText;
		if (elText.classList.contains('shown')) {
			return;
		}
		elText.classList.add('shown');
	};

	/**
	 * Handler for a tile's "mouseleave" event.
	 * 
	 * Resets the bottom-right panel to show nothing.
	 * 
	 * @param {MouseEvent} evt 
	 * @returns {void}
	 */
	const onTileMouseLeave = (evt) => {
		const elsShown = document.getElementsByClassName('shown');
		for (const elShown of elsShown) {
			elShown.classList.remove('shown');
		}
		const elImg = document.getElementById('currentimg');
		if (!(elImg instanceof HTMLElement)) {
			return;
		}
		elImg.innerText = '';
	};

	/**
	 * Adds events to all buttons.
	 */
	const initEvents = () => {
		const elsNewGame = document.getElementsByClassName('newGame');
		for (const elNewGame of elsNewGame) {
			if (!(elNewGame instanceof EventTarget)) {
				continue;
			}
			elNewGame.addEventListener('click', () => {
				window.location.reload();
			});
		}

		const elHelpButton = document.getElementById('helpButton');
		if (elHelpButton instanceof EventTarget) {
			elHelpButton.addEventListener('click', () => {
				const dlgHelp = document.getElementById('help');
				if (dlgHelp instanceof HTMLDialogElement) {
					dlgHelp.showModal();
				}
			});
		}

		const elBeginnerButton = document.getElementById('beginnerButton');
		if (elBeginnerButton instanceof EventTarget) {
			elBeginnerButton.addEventListener('click', () => {
				toggleBeginner();
			});
		}
	}

	/**
	 * Updates elapsed time based on the difference between now and game start.
	 *
	 * @returns {void}
	 */
	const timeProc = () => {
		const elTime = document.getElementById('time');
		if (!(elTime instanceof HTMLElement)) {
			return;
		}
		const diff = Math.floor((new Date().valueOf() - parseInt(sessionStorage.getItem('start'))) / 1000);
		const diffM = Math.floor(diff / 60);
		const diffS = diff % 60;
		const diffS0 = diffS < 10 ? '0' : '';
		elTime.innerText = `${diffM}:${diffS0}${diffS}`;
	};

	/**
	 * Computes an ideal tile size so that the deal shape would fit the screen.
	 * 
	 * It takes into consideration the aspect ratio of the shape and of the screen to decide,
	 * whether the tile has to fit to the screen's width or height.
	 * 
	 * Tile aspect ratio is 7:9 (width:height) and font size is 62.5% of tile height.
	 * 
	 * With that, it updates the game board's grid template columns and rows.
	 *
	 * @returns {void}
	 */
	const resizeBoard = () => {
		const elGame = document.getElementById('game');
		const elPanel = document.getElementById('toppanel');
		if (!(elGame instanceof Element) || !(elPanel instanceof Element)) {
			return;
		}

		const screenWidth = visualViewport.width;
		const screenHeight = (visualViewport.height - elPanel.clientHeight); 

		const shapeRatio = (parseInt(sessionStorage.getItem('shapew')) / parseInt(sessionStorage.getItem('shapeh')));
		const screenRatio = (screenWidth / screenHeight);

		let tileH = 0;
		let tileW = 0;

		if (shapeRatio > screenRatio) {
			tileW = ((2 * screenWidth) / (parseInt(sessionStorage.getItem('shapew')) + 1));
			tileH = ((tileW * 9) / 7);
		} else {
			tileH = ((2 * screenHeight) / (parseInt(sessionStorage.getItem('shapeh')) + 1));
			tileW = ((tileH * 7) / 9);
		}

		elGame.style.gridTemplateColumns = `repeat(${parseInt(sessionStorage.getItem('shapew')) + 1}, ${Math.round(tileW / 2)}px)`;
		elGame.style.gridTemplateRows = `repeat(${parseInt(sessionStorage.getItem('shapeh')) + 1}, ${Math.round(tileH / 2)}px)`;
		elGame.style.fontSize = `${Math.round(tileH * 0.625)}px`;
	}

	/**
	 * Deals tiles according to the given shape, computes tile/board size and creates all tiles.
	 *
	 * @param {string} shape 
	 * @returns {void}
	 */
	const drawGame = (shape) => {
		let shapeDef = [];
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
			sessionStorage.setItem('shapew', 29);
			sessionStorage.setItem('shapeh', 15);
			sessionStorage.setItem('shapez', 5);
		}

		resizeBoard();

		const elGame = document.getElementById('game');
		if (!(elGame instanceof Element)) {
			return;
		}

		for (const tileShape of shapeDef) {
			const elTile = document.createElement('div');
			elTile.classList.add('tile');
			elTile.role = 'button';
			elTile.tabIndex = 0;
			elTile.style.gridColumn = `${tileShape.x} / ${tileShape.x + 2}`;
			elTile.style.gridRow = `${tileShape.y} / ${tileShape.y + 2}`;
			elTile.style.zIndex = tileShape.z;
			if (tileShape.z > 1) {
				elTile.style.left = `${Math.round((tileShape.z-1) * -4)}px`;
				elTile.style.top = `${Math.round((tileShape.z-1) * -4)}px`;
			}
			elTile.dataset.x = tileShape.x;
			elTile.dataset.y = tileShape.y;
			elTile.dataset.z = tileShape.z;
			elTile.classList.add(`z${tileShape.z}`);
			elTile.addEventListener('click', onTileClick);
			elTile.addEventListener('keyup', onTileKeyUp);
			elTile.addEventListener('mouseenter', onTileMouseEnter);
			elTile.addEventListener('mouseleave', onTileMouseLeave);
			const randomType = Math.floor(Math.random() * tileTypes.length);
			elTile.innerText = tileTypes[randomType];
			tileTypes.splice(randomType, 1);
			if (characters.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'character';
			}
			if (sticks.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'stick';
			}
			if (circles.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'circle';
			}
			if (dragons.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'dragon';
			}
			if (winds.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'wind';
			}
			if (flowers.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'flower';
			}
			if (seasons.indexOf(elTile.innerText) > -1) {
				elTile.dataset.t = 'season';
			}
			elGame.insertAdjacentElement('beforeend', elTile);
		}

		markFreeSidesForAll();
	}

	// Here is the end of definitions and start of the actual program flow. Finally :)
	initSession();

	// Start game time updating
	const timeInt = setInterval(timeProc, 1000);

	// Prepare UI
	initEvents();
	drawGame('turtle');

	// React to resizing with a 250ms timeout, so that we don't break the browser if the user gets
	// crazy.
	var resizeTimeout = false;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(resizeBoard, 250);
	});
});