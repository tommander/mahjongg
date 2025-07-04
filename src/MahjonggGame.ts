import {MahjonggLanguage,MahjonggLanguageCode} from './MahjonggLanguage.js'
import {MahjonggPanel} from './MahjonggPanel.js'
import {MahjonggBoard} from './MahjonggBoard.js'
import {MahjonggDialog} from './MahjonggDialog.js'
import {MahjonggTooltip} from './MahjonggTooltip.js'

export class MahjonggGame {
	language: MahjonggLanguage
	panel: MahjonggPanel
	board: MahjonggBoard
	winDialog: MahjonggDialog
	loseDialog: MahjonggDialog
	helpDialog: MahjonggDialog
	tooltip: MahjonggTooltip

	constructor() {
		this.language = new MahjonggLanguage()
		this.panel = new MahjonggPanel(this.language)
		this.board = new MahjonggBoard('turtle')
		this.winDialog = new MahjonggDialog(this.language, 'win')
		this.loseDialog = new MahjonggDialog(this.language, 'lose')
		this.helpDialog = new MahjonggDialog(this.language, 'help')
		this.tooltip = new MahjonggTooltip(this.language)

		this.winDialog.addEventListener('newgame', () => {
			this.newGame()
		})
		this.loseDialog.addEventListener('newgame', () => {
			this.newGame()
		})
		this.helpDialog.addEventListener('newgame', () => {
			this.newGame()
		})
		this.panel.addEventListener('newgame', () => {
			this.newGame()
		})
		this.panel.addEventListener('dialog', (evt: Event) => {
			this.dialog(evt)
		})
		this.panel.addEventListener('beginner', () => {
			this.board.beginner.toggle()
			this.board.refreshTiles()
		})
		this.board.addEventListener('showtooltip', (evt: Event) => {
			if (!(evt instanceof CustomEvent)) {
				return
			}
			this.tooltip.show(evt.detail)
		})
		this.board.addEventListener('closetooltip', () => {
			this.tooltip.close()
		})
		this.board.addEventListener('dialog', (evt: Event) => {
			this.dialog(evt)
		})
	}

	newGame() {
		window.location.reload()
	}

	dialog(evt: Event) {
		if (!(evt instanceof CustomEvent)) {
			return
		}
		if (evt.detail === 'help') {
			this.helpDialog.show()
		}
		if (evt.detail === 'win') {
			this.winDialog.show()
		}
		if (evt.detail === 'lose') {
			this.loseDialog.show()
		}
	}
}