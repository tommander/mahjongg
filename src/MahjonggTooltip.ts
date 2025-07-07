import {MahjonggLanguage, MahjonggTextKey} from './MahjonggLanguage.js'
import {MahjonggUi} from './MahjonggUi.js'
import {MahjonggTileSymbol} from './MahjonggCommon.js';

export class MahjonggTooltip {
    ml: MahjonggLanguage;
    elTooltip: HTMLDivElement
    elImage: HTMLDivElement
    elName: HTMLDivElement
    elsName: Array<HTMLSpanElement>

    constructor(ml: MahjonggLanguage) {
        this.ml = ml
        this.ml.addEventListener('switch', () => {
            this.updateLanguage()
        })

        this.elTooltip = MahjonggUi.elementId(HTMLDivElement, 'current')
        this.elImage = MahjonggUi.elementId(HTMLDivElement, 'currentimg')
        this.elName = MahjonggUi.elementId(HTMLDivElement, 'currentname')
        this.elsName = Array.from(this.elName.querySelectorAll('span'))
    }

    updateLanguage() {
        for (const elSpan of this.elsName) {
            elSpan.innerText = this.ml._(<MahjonggTextKey>elSpan.id)
        }
    }

    show(sym: MahjonggTileSymbol) {
        this.close()
        this.elImage.innerText = sym
        const elSpan = MahjonggUi.elementId(HTMLSpanElement, sym)
        if (!elSpan.classList.contains('shown')) {
            elSpan.classList.add('shown')
        }
    }

    close() {
        this.elImage.innerText = ''
        for (const elSpan of this.elsName) {
            elSpan.classList.remove('shown')
        }
    }
}