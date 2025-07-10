import {MahjonggUi} from "./MahjonggUi.js"
import {mahjonggTileFlowers,mahjonggTileSeasons,MahjonggTileSymbol} from "./MahjonggCommon.js"
import {MahjonggShape, MahjonggShapeName, mahjonggShapeMap} from "./MahjonggShape.js"
import {isMahjonggHistoryItem, MahjonggHistory} from "./MahjonggHistory.js"
import {MahjonggBeginner} from "./MahjonggBeginner.js"
import {MahjonggTile} from "./MahjonggTile.js"

export type MahjonggTileList = {
	[k: string]: MahjonggTile
}

export class MahjonggBoard extends EventTarget {
	elBoard: HTMLDivElement
	shape: MahjonggShape
	history: MahjonggHistory
	beginner: MahjonggBeginner
	tiles: MahjonggTileList

	constructor(shapeName: MahjonggShapeName, customDealString: string|null = null) {
		super()

		this.elBoard = MahjonggUi.elementId(HTMLDivElement, 'game')
		this.shape = mahjonggShapeMap[shapeName]
		this.resizeBoard()
		this.history = new MahjonggHistory()
		this.beginner = new MahjonggBeginner()
		this.tiles = {}

		this.history.addEventListener('restoreTiles', (evt: Event) => {
			if (!(evt instanceof CustomEvent) || !isMahjonggHistoryItem(evt.detail)) {
				console.error('Wrong RestoreTiles event', evt)
				return
			}
			this.findTile(evt.detail.i1.x, evt.detail.i1.y, evt.detail.i1.z).show()
			this.findTile(evt.detail.i2.x, evt.detail.i2.y, evt.detail.i2.z).show()
			this.refreshTiles()
		})
		this.history.addEventListener('unrestoreTiles', (evt: Event) => {
			if (!(evt instanceof CustomEvent) || !isMahjonggHistoryItem(evt.detail)) {
				console.error('Wrong UnrestoreTiles event', evt)
				return
			}
			this.findTile(evt.detail.i1.x, evt.detail.i1.y, evt.detail.i1.z).hide()
			this.findTile(evt.detail.i2.x, evt.detail.i2.y, evt.detail.i2.z).hide()
			this.refreshTiles()
		})

		let lastId = ''
		for (const oneDef of this.shape.shapeDefinition) {
			const tile = new MahjonggTile(oneDef.x, oneDef.y, oneDef.z)
			tile.prev = lastId
			tile.addEventListener('tileclick', (evt: Event) => {
				if (!(evt instanceof CustomEvent) || !(evt.detail instanceof MahjonggTile)) {
					return
				}
				if (!(evt.detail.el instanceof HTMLElement)) {
					return
				}
				if (evt.detail.blocked().blocked !== false) {
					return;
				}

				if (evt.detail.el.dataset.s === "selected") {
					delete evt.detail.el.dataset.s;
					return;
				}
				evt.detail.el.dataset.s = "selected";

				const listSel = []
				for (const tileIdx of Object.getOwnPropertyNames(this.tiles)) {
					if (this.tiles[tileIdx].el?.dataset.s !== 'selected') {
						continue;
					}
					listSel.push(tileIdx)
				}
				if (listSel.length !== 2) {
					return;
				}

				if (
					this.tiles[listSel[0]].s === this.tiles[listSel[1]].s ||
					(mahjonggTileFlowers.indexOf(this.tiles[listSel[0]].s) > -1 && mahjonggTileFlowers.indexOf(this.tiles[listSel[1]].s) > -1) ||
					(mahjonggTileSeasons.indexOf(this.tiles[listSel[0]].s) > -1 && mahjonggTileSeasons.indexOf(this.tiles[listSel[1]].s) > -1)
				) {
					this.history.add({i1: this.tiles[listSel[0]], i2: this.tiles[listSel[1]]});
					this.tiles[listSel[0]].hide()
					this.tiles[listSel[1]].hide()
					this.refreshTiles();
					this.checkGameStatus();
					return;
				}

				delete evt.detail.el.dataset.s;				
			})
			tile.addEventListener('showtooltip', (evt: Event) => {
				if (!(evt instanceof CustomEvent)) {
					return
				}
				this.dispatchEvent(new CustomEvent('showtooltip', {detail: evt.detail}))
			})
			tile.addEventListener('closetooltip', () => {
				this.dispatchEvent(new CustomEvent('closetooltip'))
			})
			this.tiles[tile.id] = tile
			lastId = tile.id
		}

		this.dealTiles(customDealString)
	}

	findTile(x: number, y: number, z: number): MahjonggTile {
		const tile = this.tiles[MahjonggTile.createId(x, y, z)]
		if (!(tile instanceof MahjonggTile)) {
			throw new Error('Tile not initialized')
		}
		return tile
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
			const tile = this.tiles[MahjonggTile.createId(oneDef.x, oneDef.y, oneDef.z)]
			if (!(tile instanceof MahjonggTile)) {
				throw new Error('Tile not initialized')
			}
			tile.s = <MahjonggTileSymbol>sym
			tile.updateTile()
		}
		this.refreshTiles()
		this.history.clear()
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
		for (const tileId of Object.getOwnPropertyNames(this.tiles)) {
			const tile = this.tiles[tileId]
			if (tile.el === null) {
				throw new Error('Tile has no element')
			}

			if (tile.el.classList.contains('freeTop')) {
				tile.el.classList.remove('freeTop');
			}
			if (tile.el.classList.contains('freeBottom')) {
				tile.el.classList.remove('freeBottom');
			}
			if (tile.el.classList.contains('freeLeft')) {
				tile.el.classList.remove('freeLeft');
			}
			if (tile.el.classList.contains('freeRight')) {
				tile.el.classList.remove('freeRight');
			}
			if (tile.el.classList.contains('notBlocked')) {
				tile.el.classList.remove('notBlocked');
			}

			const tileBlocked = tile.blocked()

			if (!tileBlocked.l) {
				tile.el.classList.add('freeLeft');
			}
			if (!tileBlocked.r) {
				tile.el.classList.add('freeRight');
			}
			if (!tileBlocked.t) {
				tile.el.classList.add('freeTop');
			}
			if (!tileBlocked.b) {
				tile.el.classList.add('freeBottom');
			}
			if (this.beginner.value && !tileBlocked.blocked) {
				let markSymbol = tile.el.innerText;
				if (mahjonggTileFlowers.indexOf(markSymbol) > -1) {
					markSymbol = 'f';
				}
				if (mahjonggTileSeasons.indexOf(markSymbol) > -1) {
					markSymbol = 's';
				}
				if (markPairs[markSymbol] === undefined) {
					markPairs[markSymbol] = [];
				}
				markPairs[markSymbol].push(tile.el);
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

	hasShownTile(): boolean {
		let cnt = 0
		for (const tileIdx of Object.getOwnPropertyNames(this.tiles)) {
			if (this.tiles[tileIdx].hidden) {
				continue
			}
			return true
		}
		return false
	}

	checkGameStatus() {
		if (this.hasShownTile()) {
			let notBlocked = [];
			for (const tileIdx of Object.getOwnPropertyNames(this.tiles)) {
				if (this.tiles[tileIdx].blocked().blocked === false) {
					notBlocked.push(this.tiles[tileIdx].s);
				}
			}
			notBlocked.sort();
			const notBlockedPairs = [];
			let prev = null;
			for (const one of notBlocked) {
				if (prev !== null && (prev === one || (mahjonggTileFlowers.indexOf(prev) > -1 && mahjonggTileFlowers.indexOf(one) > -1) || (mahjonggTileSeasons.indexOf(prev) > -1 && mahjonggTileSeasons.indexOf(one) > -1)) && notBlockedPairs.indexOf(one) === -1) {
					notBlockedPairs.push(one);
				}
				prev = one;
			}

			if (notBlockedPairs.length === 0) {
				this.dispatchEvent(new CustomEvent('stopTimer'))
				this.dispatchEvent(new CustomEvent('dialog', {detail: 'lose'}))
			}

			return
		}

		this.dispatchEvent(new CustomEvent('stopTimer'))
		this.dispatchEvent(new CustomEvent('dialog', {detail: 'win'}))
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
}