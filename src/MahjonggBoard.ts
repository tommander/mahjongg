import {MahjonggUi} from "./MahjonggUi.js"
import {mahjonggTileCharacters,mahjonggTileSticks,mahjonggTileCircles,mahjonggTileDragons,mahjonggTileWinds,mahjonggTileFlowers,mahjonggTileSeasons,MahjonggTileSymbol} from "./MahjonggCommon.js"
import {MahjonggShape, MahjonggShapeName, mahjonggShapeMap} from "./MahjonggShape.js"

export class MahjonggBoard extends EventTarget {
    elBoard: HTMLDivElement
    shape: MahjonggShape
    //dealString: string

    constructor(shapeName: MahjonggShapeName, customDealString: string|null = null) {
        super()

        this.elBoard = MahjonggUi.elementId(HTMLDivElement, 'game')
        this.shape = mahjonggShapeMap[shapeName]
        this.resizeBoard()

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

    updateTile(x: number, y: number, z: number, s: MahjonggTileSymbol) {
			const elTile = document.createElement('div');
			elTile.classList.add('tile');
			elTile.classList.add(`z${z}`);
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
			elTile.addEventListener('click', () => {
                
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
			this.elBoard.insertAdjacentElement('beforeend', elTile);
    }
}