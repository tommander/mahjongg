import {MahjonggLanguage} from './MahjonggLanguage.js'
import { MahjonggTimer } from './MahjonggTimer.js';
import {MahjonggUi} from './MahjonggUi.js'

export class MahjonggPanel extends EventTarget {
    ml: MahjonggLanguage;
    mt: MahjonggTimer
    elDivPanel: HTMLDivElement
    elDtlTime: HTMLDetailsElement
    elSmrTime: HTMLElement
    elTimTime: HTMLTimeElement
    elSpnTime: HTMLSpanElement
    elBtnNewGame: HTMLButtonElement
    elSpnNewGameIcon: HTMLSpanElement
    elSpnNewGameText: HTMLSpanElement
    elBtnHelp: HTMLButtonElement
    elSpnHelpIcon: HTMLSpanElement
    elSpnHelpText: HTMLSpanElement
    elBtnBeginner: HTMLButtonElement
    elSpnBeginnerIcon: HTMLSpanElement
    elSpnBeginnerText: HTMLSpanElement
    elBtnReshuffle: HTMLButtonElement
    elSpnReshuffleIcon: HTMLSpanElement
    elSpnReshuffleText: HTMLSpanElement
    elBtnUndo: HTMLButtonElement
    elSpnUndoIcon: HTMLSpanElement
    elSpnUndoText: HTMLSpanElement
    elBtnRedo: HTMLButtonElement
    elSpnRedoIcon: HTMLSpanElement
    elSpnRedoText: HTMLSpanElement

    constructor(ml: MahjonggLanguage) {
        super()

        this.ml = ml
        this.elDivPanel = MahjonggUi.elementId(HTMLDivElement, 'toppanel')
        this.elDtlTime = MahjonggUi.elementId(HTMLDetailsElement, 'time')
        this.elTimTime = MahjonggUi.elementId(HTMLTimeElement, 'timeValue')
        this.elSpnTime = MahjonggUi.elementId(HTMLSpanElement, 'timeLabel')
        this.elSmrTime = MahjonggUi.elementSelector(HTMLElement, 'summary', 0, this.elDtlTime)

        this.elBtnNewGame = MahjonggUi.elementId(HTMLButtonElement, 'newGameButton')
        this.elSpnNewGameIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnNewGame)
        this.elSpnNewGameText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnNewGame)
        this.elBtnNewGame.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('newgame'))
        })

        this.elBtnHelp = MahjonggUi.elementId(HTMLButtonElement, 'helpButton')
        this.elSpnHelpIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnHelp)
        this.elSpnHelpText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnHelp)
        this.elBtnHelp.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('dialog', {detail: 'help'}))
        })

        this.elBtnBeginner = MahjonggUi.elementId(HTMLButtonElement, 'beginnerButton')
        this.elSpnBeginnerIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnBeginner)
        this.elSpnBeginnerText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnBeginner)
        this.elBtnBeginner.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('beginner'))
        })

        this.elBtnReshuffle = MahjonggUi.elementId(HTMLButtonElement, 'reshuffleButton')
        this.elSpnReshuffleIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnReshuffle)
        this.elSpnReshuffleText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnReshuffle)
        this.elBtnReshuffle.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('reshuffle'))
        })

        this.elBtnUndo = MahjonggUi.elementId(HTMLButtonElement, 'undoButton')
        this.elSpnUndoIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnUndo)
        this.elSpnUndoText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnUndo)
        this.elBtnUndo.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('undo'))
        })

        this.elBtnRedo = MahjonggUi.elementId(HTMLButtonElement, 'redoButton')
        this.elSpnRedoIcon = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 0, this.elBtnRedo)
        this.elSpnRedoText = MahjonggUi.elementSelector(HTMLSpanElement, 'span', 1, this.elBtnRedo)
        this.elBtnRedo.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('redo'))
        })

        this.ml.appendLangButtons(this.elDivPanel)
        this.ml.addEventListener('switch', () => {
            this.updateLanguage()
        })

        this.mt = new MahjonggTimer()
        this.mt.addEventListener('tick', (evt: Event) => {
            if (!(evt instanceof CustomEvent)) {
                return
            }
            this.elTimTime.innerText = evt.detail
        })
        this.mt.start()
    }

    updateLanguage() {
        this.elSpnTime.innerText = this.ml._('txttime', '')
        this.elSpnNewGameText.innerText = this.ml._('btnnewgame', '')
        this.elSpnHelpText.innerText = this.ml._('btnhelp', '')
        this.elSpnBeginnerText.innerText = this.ml._('btnhighlight', '')
        this.elSpnReshuffleText.innerText = this.ml._('btnreshuffle', '')
        this.elSpnUndoText.innerText = this.ml._('btnundo', '')
        this.elSpnRedoText.innerText = this.ml._('btnredo', '')
    }
}