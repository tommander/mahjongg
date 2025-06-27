import {MahjonggLanguage} from './MahjonggLanguage.js'
import {MahjonggUi} from './MahjonggUi.js'

export type MahjonggDialogType = 'win'|'lose'|'help'

export class MahjonggDialog extends EventTarget {
    ml: MahjonggLanguage
    type: MahjonggDialogType

    elDialog: HTMLDialogElement
    elMessage: HTMLDivElement
    elSmiley: HTMLDivElement
    elHeading: HTMLDivElement
    elText: HTMLDivElement
    elForm: HTMLFormElement
    elButtonNewGame: HTMLButtonElement
    elButtonClose: HTMLButtonElement

    constructor(ml: MahjonggLanguage, type: MahjonggDialogType) {
        super()

        this.ml = ml
        this.ml.addEventListener('switch', () => {
            this.updateLanguage()
        })
        this.type = type

        this.elDialog = MahjonggUi.elementId(HTMLDialogElement, type)
        this.elMessage = MahjonggUi.elementSelector(HTMLDivElement, '.dlgmessage', 0, this.elDialog)
        this.elSmiley = MahjonggUi.elementSelector(HTMLDivElement, '.dlgsmiley', 0, this.elMessage)
        this.elHeading = MahjonggUi.elementSelector(HTMLDivElement, '.dlgheading', 0, this.elMessage)
        this.elText = MahjonggUi.elementSelector(HTMLDivElement, '.dlgtext', 0, this.elMessage)
        this.elForm = MahjonggUi.elementSelector(HTMLFormElement, '.dlgbuttons', 0, this.elDialog)
        this.elButtonNewGame = MahjonggUi.elementSelector(HTMLButtonElement, '.newGame', 0, this.elForm)
        this.elButtonClose = MahjonggUi.elementSelector(HTMLButtonElement, '.closeButton', 0, this.elForm)

        this.elButtonNewGame.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('newgame'))
        })

    }

    updateLanguage() {
        if (this.type === 'win') {
            this.elHeading.innerText = this.ml._('hdgwin', '')
            this.elText.innerText = this.ml._('txtwin', '')
        } else if (this.type === 'lose') {
            this.elHeading.innerText = this.ml._('hdglose', '')
            this.elText.innerText = this.ml._('txtlose', '')
        } else if (this.type === 'help') {
            this.elText.innerHTML = this.ml._('txthelp', '')
    			.replace('%1s', '<a href="https://github.com/tommander/mahjongg">Mahjongg Solitaire</a>')
	        	.replace('%2s', '<a href="https://tommander.cz">Tomáš Rajnoha</a>')
			    .replace('%3s', '<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>');
        }

        this.elButtonNewGame.innerText = this.ml._('btnnewgame', '')
        this.elButtonClose.innerText = this.ml._('btnclose', '')
    }

    show() {
        this.elDialog.showModal()
    }
}