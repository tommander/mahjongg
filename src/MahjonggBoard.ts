import {MahjonggUi} from "./MahjonggUi.js"
import {mahjonggTileCharacters,mahjonggTileSticks,mahjonggTileCircles,mahjonggTileDragons,mahjonggTileWinds,mahjonggTileFlowers,mahjonggTileSeasons,MahjonggTileSymbol} from "./MahjonggCommon.js"
import {MahjonggShape, MahjonggShapeName, mahjonggShapeMap} from "./MahjonggShape.js"
import {isMahjonggHistoryItem, MahjonggHistory, MahjonggHistoryItem} from "./MahjonggHistory.js"
import {MahjonggBeginner} from "./MahjonggBeginner.js"

export class MahjonggBoard extends EventTarget {
	elBoard: HTMLDivElement
	shape: MahjonggShape
	history: MahjonggHistory
	beginner: MahjonggBeginner

	constructor(shapeName: MahjonggShapeName, customDealString: string|null = null) {
		super()

		this.elBoard = MahjonggUi.elementId(HTMLDivElement, 'game')
		this.shape = mahjonggShapeMap[shapeName]
		this.resizeBoard()
		this.history = new MahjonggHistory()
		this.beginner = new MahjonggBeginner()

		this.history.addEventListener('restoreTiles', (evt: Event) => {
			if (!(evt instanceof CustomEvent) || !isMahjonggHistoryItem(evt.detail)) {
				return
			}
			this.updateTile(evt.detail.i1.x, evt.detail.i1.y, evt.detail.i1.z, evt.detail.i1.s, evt.detail.i1.prev)
			this.updateTile(evt.detail.i2.x, evt.detail.i2.y, evt.detail.i2.z, evt.detail.i2.s, evt.detail.i2.prev)

		})
		this.history.addEventListener('redraw', (evt: Event) => {
			this.refreshTiles()
		})

		this.dealTiles(customDealString)
		this.refreshTiles()
	}

	dealTiles(customDealString: string|null = null) {
		let dealString = customDealString
		if (dealString === null || !dealString.match(/^[🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘🀆🀅🀄︎🀀🀃🀁🀂🀢🀣🀤🀥🀩🀦🀨🀧]{292}$/)) {
			let dealArray = ['🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘','🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘','🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘','🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗','🀘','🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏','🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏','🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏','🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏','🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡','🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡','🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡','🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡','🀆','🀅','🀄︎','🀆','🀅','🀄︎','🀆','🀅','🀄︎','🀆','🀅','🀄︎','🀀','🀃','🀁','🀂','🀀','🀃','🀁','🀂','🀀','🀃','🀁','🀂','🀀','🀃','🀁','🀂','🀢','🀣','🀤','🀥','🀩','🀦','🀨','🀧']
			this.shuffle(dealArray)
			dealString = dealArray.toString().replaceAll(',','')
		}
		
		for (const oneDef of this.shape.shapeDefinition) {
			let sym = [...dealString][0];
			if (sym === '🀄') {
				sym += [...dealString][1];
				dealString = dealString.slice(1);
			}
			dealString = dealString.slice(2);
			this.updateTile(oneDef.x, oneDef.y, oneDef.z, <MahjonggTileSymbol>sym)
		}
	}

	shuffle(aDealArray: Array<string>) {
		let currentIndex = aDealArray.length;
		let tmp = null;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			tmp = aDealArray[currentIndex];
			aDealArray[currentIndex] = aDealArray[randomIndex];
			aDealArray[randomIndex] = tmp;
		}
	}

	reshuffle() {
		const elsTile = document.getElementsByClassName('tile');
		let currentIndex = elsTile.length;
		while (currentIndex != 0) {
			const randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			const elTile1 = elsTile[currentIndex]
			const elTile2 = elsTile[randomIndex]
			if (!(elTile1 instanceof HTMLElement) || !(elTile2 instanceof HTMLElement)) {
				continue;
			}
			const tmpText = elTile1.innerText;
			const tmpType = elTile1.dataset.t;
			elTile1.innerText = elTile2.innerText;
			elTile1.dataset.t = elTile2.dataset.t;
			elTile2.innerText = tmpText;
			elTile2.dataset.t = tmpType;
		}

		this.refreshTiles()
	}

	refreshTiles() {
		const markPairs: {[k: string]: Array<HTMLElement>} = {};
		const elsTile = document.getElementsByClassName('tile');
		for (const elTile of elsTile) {
			if (!(elTile instanceof HTMLElement)) {
				return;
			}

			if (elTile.classList.contains('freeTop')) {
				elTile.classList.remove('freeTop');
			}
			if (elTile.classList.contains('freeBottom')) {
				elTile.classList.remove('freeBottom');
			}
			if (elTile.classList.contains('freeLeft')) {
				elTile.classList.remove('freeLeft');
			}
			if (elTile.classList.contains('freeRight')) {
				elTile.classList.remove('freeRight');
			}
			if (elTile.classList.contains('notBlocked')) {
				elTile.classList.remove('notBlocked');
			}

			const block = this.tileBlocked(elTile)

			if (!block.l) {
				elTile.classList.add('freeLeft');
			}
			if (!block.r) {
				elTile.classList.add('freeRight');
			}
			if (!block.t) {
				elTile.classList.add('freeTop');
			}
			if (!block.b) {
				elTile.classList.add('freeBottom');
			}
			if (this.beginner.value && !block.blocked) {
				let markSymbol = elTile.innerText;
				if (mahjonggTileFlowers.indexOf(markSymbol) > -1) {
					markSymbol = 'f';
				}
				if (mahjonggTileSeasons.indexOf(markSymbol) > -1) {
					markSymbol = 's';
				}
				if (markPairs[markSymbol] === undefined) {
					markPairs[markSymbol] = [];
				}
				markPairs[markSymbol].push(elTile);
			}
		}
		for (const markPair of Object.getOwnPropertyNames(markPairs)) {
			if (markPairs[markPair].length < 2) {
				continue;
			}
			for (const markTile of markPairs[markPair]) {
				markTile.classList.add('notBlocked');
			}
		}

	}

	checkGameStatus() {
		// const anyTile = document.querySelector('.tile');
		// if (anyTile) {
		// 	const allTiles = document.querySelectorAll('.tile');
		// 	let notBlocked = [];
		// 	for (const tile of allTiles) {
		// 		if (isBlocked(tile) === false) {
		// 			notBlocked.push(tile.innerText);
		// 		}
		// 	}
		// 	notBlocked.sort();
		// 	const notBlockedPairs = [];
		// 	let prev = null;
		// 	for (const one of notBlocked) {
		// 		if (prev !== null && (prev === one || (flowers.indexOf(prev) > -1 && flowers.indexOf(one) > -1) || (seasons.indexOf(prev) > -1 && seasons.indexOf(one) > -1)) && notBlockedPairs.indexOf(one) === -1) {
		// 			notBlockedPairs.push(one);
		// 		}
		// 		prev = one;
		// 	}

		// 	if (notBlockedPairs.length > 0) {
		// 		return;
		// 	}

		// 	const elLose = document.getElementById('lose');
		// 	if (!elLose) {
		// 		return;
		// 	}
		// 	elLose.showModal();
		// 	return;
		// }

		// const elWin = document.getElementById('win');
		// if (!elWin) {
		// 	return;
		// }
		// clearInterval(timeInt);
		// const elDlgDetail = document.querySelector('#win .dlgdetail');
		// const elTime = document.getElementById('time');
		// if ((elDlgDetail instanceof HTMLElement) && (elTime instanceof HTMLElement)) {
		// 	elDlgDetail.innerText = elDlgDetail.innerText.replace('%s', elTime.innerText);
		// }
		// elWin.showModal();
	}

	resizeBoard() {
		const shapeRatio = (this.shape.width / this.shape.height) * (6.9/9);
		const screenRatio = (this.elBoard.clientWidth / this.elBoard.clientHeight);

		let tileH = 0;
		let tileW = 0;

		if (shapeRatio > screenRatio) {
			tileW = ((2 * this.elBoard.clientWidth) / (this.shape.width + 1));
			tileH = ((tileW * 9) / 7);
		} else {
			tileH = ((2 * this.elBoard.clientHeight) / (this.shape.height + 1));
			tileW = ((tileH * 7) / 9);
		}

		this.elBoard.style.gridTemplateColumns = `repeat(${this.shape.width + 1}, ${Math.round(tileW / 2)}px)`;
		this.elBoard.style.gridTemplateRows = `repeat(${this.shape.height + 1}, ${Math.round(tileH / 2)}px)`;
		this.elBoard.style.fontSize = `${Math.round(tileH * 0.625)}px`;
	}

	tileBlocked(tile: HTMLElement): {l: boolean, r: boolean, t: boolean, b: boolean, u: boolean, blocked: boolean} {
		const myX = parseInt(tile.style.gridColumn);
		const myY = parseInt(tile.style.gridRow);
		const myZ = parseInt(tile.style.zIndex);

		const selectorL = `#tile-${myX-2}-${myY-1}-${myZ},` +
						  `#tile-${myX-2}-${myY}-${myZ},` +
						  `#tile-${myX-2}-${myY+1}-${myZ}`;
		const selectorR = `#tile-${myX+2}-${myY-1}-${myZ},` + 
						  `#tile-${myX+2}-${myY}-${myZ},` + 
						  `#tile-${myX+2}-${myY+1}-${myZ}`;
		const selectorT = `#tile-${myX-1}-${myY-2}-${myZ},` + 
						  `#tile-${myX}-${myY-2}-${myZ},` + 
						  `#tile-${myX+1}-${myY-2}-${myZ}`;
		const selectorB = `#tile-${myX-1}-${myY+2}-${myZ},` + 
						  `#tile-${myX}-${myY+2}-${myZ},` + 
						  `#tile-${myX+1}-${myY+2}-${myZ}`;
		const selectorU = `#tile-${myX-1}-${myY}-${myZ+1},` + 
						  `#tile-${myX}-${myY}-${myZ+1},` +
						  `#tile-${myX+1}-${myY}-${myZ+1},` +
						  `#tile-${myX-1}-${myY-1}-${myZ+1},` +
						  `#tile-${myX}-${myY-1}-${myZ+1},` +
						  `#tile-${myX+1}-${myY-1}-${myZ+1},` +
						  `#tile-${myX-1}-${myY+1}-${myZ+1},` +
						  `#tile-${myX}-${myY+1}-${myZ+1},` +
						  `#tile-${myX+1}-${myY+1}-${myZ+1}`;
		const res = {
			l: (document.querySelector(selectorL) !== null),
			r: (document.querySelector(selectorR) !== null),
			t: (document.querySelector(selectorT) !== null),
			b: (document.querySelector(selectorB) !== null),
			u: (document.querySelector(selectorU) !== null),
		};
		return {...res, blocked: (res.u || (res.l && res.r))}
	}

	updateTile(x: number, y: number, z: number, s: MahjonggTileSymbol, prev: string = '') {
		const tileExists = document.getElementById(`tile-${x}-${y}-${z}`)
		const elTile: HTMLElement = (tileExists instanceof HTMLElement) ? tileExists : document.createElement('div')
		
		elTile.id = `tile-${x}-${y}-${z}`
		if (!elTile.classList.contains('tile')) {
			elTile.classList.add('tile');
		}
		if (!elTile.classList.contains(`z${z}`)) {
			elTile.classList.add(`z${z}`);
		}
		elTile.role = 'button';
		elTile.tabIndex = 0;
		elTile.style.gridColumn = `${x} / ${x + 2}`;
		elTile.style.gridRow = `${y} / ${y + 2}`;
		elTile.style.zIndex = z.toString();
		if (z > 1) {
			elTile.style.left = `${Math.round((z-1) * -4)}px`;
			elTile.style.top = `${Math.round((z-1) * -4)}px`;
		}
		elTile.dataset.x = x.toString();
		elTile.dataset.y = y.toString();
		elTile.dataset.z = z.toString();

		if (tileExists === null) {
			elTile.addEventListener('click', (evt) => {
				if (!(evt.target instanceof HTMLElement)) {
					return
				}
				if (this.tileBlocked(evt.target).blocked !== false) {
					return;
				}

				if (evt.target.dataset.s === "selected") {
					delete evt.target.dataset.s;
					return;
				}
				evt.target.dataset.s = "selected";

				const listSel = document.querySelectorAll(`.tile[data-s="selected"]`);
				if (listSel.length !== 2 || !(listSel[0] instanceof HTMLElement) || !(listSel[1] instanceof HTMLElement)) {
					return;
				}

				if (
					listSel[0].innerText === listSel[1].innerText ||
					(mahjonggTileFlowers.indexOf(listSel[0].innerText) > -1 && mahjonggTileFlowers.indexOf(listSel[1].innerText) > -1) ||
					(mahjonggTileSeasons.indexOf(listSel[0].innerText) > -1 && mahjonggTileSeasons.indexOf(listSel[1].innerText) > -1)
				) {
					this.history.add({i1: MahjonggHistory.historyTile(listSel[0]), i2: MahjonggHistory.historyTile(listSel[1])});
					listSel[0].remove();
					listSel[1].remove();
					this.refreshTiles();
					this.checkGameStatus();
					return;
				}

				delete evt.target.dataset.s;
			});
			elTile.addEventListener('keyup', (evt: KeyboardEvent) => {
				if (evt.key !== 'Enter' && evt.key !== ' ') {
					return;
				}
				if (!(evt.target instanceof EventTarget)) {
					return;
				}
				evt.target.dispatchEvent(new MouseEvent('click'))
			});
			elTile.addEventListener('mouseenter', (evt) => {
				if (!(evt.target instanceof HTMLElement)) {
					return
				}
				this.dispatchEvent(new CustomEvent('showtooltip', {detail: evt.target.innerText}))
			});
			elTile.addEventListener('mouseleave', () => {
				this.dispatchEvent(new CustomEvent('closetooltip'))
			});
		}
		
		elTile.innerText = s
		if (mahjonggTileCharacters.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'character';
		}
		if (mahjonggTileSticks.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'stick';
		}
		if (mahjonggTileCircles.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'circle';
		}
		if (mahjonggTileDragons.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'dragon';
		}
		if (mahjonggTileWinds.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'wind';
		}
		if (mahjonggTileFlowers.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'flower';
		}
		if (mahjonggTileSeasons.indexOf(elTile.innerText) > -1) {
			elTile.dataset.t = 'season';
		}

		if (tileExists === null) {
			if (prev !== '') {
				const elPrev = document.getElementById(prev)
				if ((elPrev instanceof HTMLElement)) {
					elPrev.insertAdjacentElement('afterend', elTile)
					return
				}
			}
			this.elBoard.insertAdjacentElement('beforeend', elTile);
		}
	}
}