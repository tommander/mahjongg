import {mahjonggTileCharacters, mahjonggTileCircles, mahjonggTileDragons, mahjonggTileFlowers, mahjonggTileSeasons, mahjonggTileSticks, MahjonggTileSymbol, mahjonggTileWinds} from "./MahjonggCommon.js"

export class MahjonggTile extends EventTarget {
    id: string
    x: number
    y: number
    z: number
    s: MahjonggTileSymbol|''
    prev: string
    hidden: boolean = false
    el: HTMLElement|null = null

	static createId(x: number, y: number, z: number): string {
		return `tile-${x}-${y}-${z}`
	}

    constructor(x: number, y: number, z: number, s: MahjonggTileSymbol|'' = '', prev: string = '') {
        super()
        this.x = x
        this.y = y
        this.z = z
        this.s = s
        this.id = MahjonggTile.createId(x, y, z)
        this.prev = prev
    }

    hide() {
        this.hidden = true
    }

    show() {
        this.hidden = false
    }

	blocked(): {l: boolean, r: boolean, t: boolean, b: boolean, u: boolean, blocked: boolean} {
        if (this.el === null) {
            return {l: false, r: false, t: false, b: false, u: false, blocked: false}
        }
		const myX = parseInt(this.el.style.gridColumn);
		const myY = parseInt(this.el.style.gridRow);
		const myZ = parseInt(this.el.style.zIndex);

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

	updateTile() {
		const tileExists = (this.el !== null)
		const elTile: HTMLElement = (this.el ?? document.createElement('div'))

		elTile.id = this.id
		if (!elTile.classList.contains('tile')) {
			elTile.classList.add('tile');
		}
		if (!elTile.classList.contains(`z${this.z}`)) {
			elTile.classList.add(`z${this.z}`);
		}
		elTile.role = 'button';
		elTile.tabIndex = 0;
		elTile.style.gridColumn = `${this.x} / ${this.x + 2}`;
		elTile.style.gridRow = `${this.y} / ${this.y + 2}`;
		elTile.style.zIndex = this.z.toString();
		if (this.z > 1) {
			elTile.style.left = `${Math.round((this.z-1) * -4)}px`;
			elTile.style.top = `${Math.round((this.z-1) * -4)}px`;
		}
		elTile.dataset.x = this.x.toString();
		elTile.dataset.y = this.y.toString();
		elTile.dataset.z = this.z.toString();

		if (tileExists === null) {
			elTile.addEventListener('click', (evt: Event) => {
				this.dispatchEvent(new CustomEvent('tileclick', {detail: this}))
			});
			elTile.addEventListener('keyup', (evt: KeyboardEvent) => {
				if (evt.key !== 'Enter' && evt.key !== ' ') {
					return;
				}
				this.dispatchEvent(new CustomEvent('tileclick', {detail: this}))
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
		
		elTile.innerText = this.s
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
			if (this.prev !== '') {
				const elPrev = document.getElementById(this.prev)
				if ((elPrev instanceof HTMLElement)) {
					elPrev.insertAdjacentElement('afterend', elTile)
					return
				}
			}
			const elBoard = document.getElementById('game')
			if ((elBoard instanceof HTMLElement)) {
				elBoard.insertAdjacentElement('beforeend', elTile);
			}
		}
	}
}