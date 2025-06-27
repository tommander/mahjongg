import type {MahjonggTileSymbol} from './MahjonggCommon.js'

export type MahjonggTextKey = 'name'|'flag'|'language'|'txttime'|'btnnewgame'|'btnhelp'|'btnclose'|'btnhighlight'|'btnreshuffle'|'btnundo'|'btnredo'|'hdgwin'|'hdglose'|'txtwin'|'txtlose'|'txthelp'|MahjonggTileSymbol
export type MahjonggLanguageCode = 'cs-CZ'|'en-US'

export type MahjonggTexts = {
	[s in MahjonggTextKey]: string
}

export type MahjonggTranslations = {
	[k in MahjonggLanguageCode]: MahjonggTexts
}

export class MahjonggLanguage extends EventTarget {
	translations: MahjonggTranslations = {
		'cs-CZ': {
			name: 'Čeština',
			flag: '🇨🇿',
			language: 'Jazyk',
			txttime: 'Uběhlý čas',
			btnnewgame: 'Nová hra',
			btnhelp: 'Nápověda',
			btnclose: 'Zavřít',
			btnhighlight: 'Zvýraznění',
			btnreshuffle: 'Zamíchat',
			btnundo: 'Zpět',
			btnredo: 'Vpřed',
			hdgwin: 'Vyhráli jste!',
			hdglose: 'Prohráli jste.',
			txtwin: 'Čas vaší hry byl %s. Gratulace!',
			txtlose: 'Asi jsem to špatně rozdal.',
			txthelp: 'Vaším cílem je posbírat všech 144 kostek. Sbírat můžete kostky se stejnými symboly, které nemají jinou kostku nad sebou či z obou delších stran. Kostky typu Období a Květina mohou být v páru v odlišných barvách. Ale pozor - hra nemusí být nutně rozdána tak, že určitě lze vyhrát!<br>%1s autora %2s je označen jako %3s',
			'🀐': 'Vrabec',
			'🀑': 'Dvě tyčky',
			'🀒': 'Tři tyčky',
			'🀓': 'Čtyři tyčky',
			'🀔': 'Pět tyček',
			'🀕': 'Šest tyček',
			'🀖': 'Sedm tyček',
			'🀗': 'Osm tyček',
			'🀘': 'Devět tyček',
			'🀇': 'Deset tisíc',
			'🀈': 'Dvacet tisíc',
			'🀉': 'Třicet tisíc',
			'🀊': 'Čtyřicet tisíc',
			'🀋': 'Padesát tisíc',
			'🀌': 'Šedesát tisíc',
			'🀍': 'Sedmdesát tisíc',
			'🀎': 'Osmdesát tisíc',
			'🀏': 'Devadesát tisíc',
			'🀙': 'Jedna mince',
			'🀚': 'Dvě mince',
			'🀛': 'Tři mince',
			'🀜': 'Čtyři mince',
			'🀝': 'Pět mincí',
			'🀞': 'Šest mincí',
			'🀟': 'Sedm mincí',
			'🀠': 'Osm mincí',
			'🀡': 'Devět mincí',
			'🀆': 'Bílý drak',
			'🀅': 'Zelený drak',
			'🀄︎': 'Červený drak',
			'🀀': 'Východní vítr',
			'🀃': 'Severní vítr',
			'🀁': 'Jižní vítr',
			'🀂': 'Západní vítr',
			'🀢': 'Švestka',
			'🀣': 'Orchidej',
			'🀤': 'Bambus',
			'🀥': 'Chryzantéma',
			'🀩': 'Zima',
			'🀦': 'Jaro',
			'🀨': 'Podzim',
			'🀧': 'Léto',
		},
		'en-US': {
			name: 'English',
			flag: '🇺🇸',
			language: 'Language',
			txttime: 'Elapsed time',
			btnnewgame: 'New game',
			btnhelp: 'Help',
			btnclose: 'Close',
			btnhighlight: 'Highlight',
			btnreshuffle: 'Reshuffle',
			btnundo: 'Undo',
			btnredo: 'Redo',
			hdgwin: 'You won!',
			hdglose: 'You lost!',
			txtwin: 'Your game time was %s. Congratulations!',
			txtlose: 'I should have dealt the cards better.',
			txthelp: 'Your goal is to collect all 144 tiles. You can pick tiles by pairs that are “open” (at least one long edge is unoccupied and there is no adjacent tile) and have either the same symbol or are both either a Season or a Flower. Note that dealing is random; your particular game might not have a way to be won!<br>%1s by %2s is marked %3s',
			'🀐': 'Sparrow',
			'🀑': 'Two of Bamboos',
			'🀒': 'Three of Bamboos',
			'🀓': 'Four of Bamboos',
			'🀔': 'Five of Bamboos',
			'🀕': 'Six of Bamboos',
			'🀖': 'Seven of Bamboos',
			'🀗': 'Eight of Bamboos',
			'🀘': 'Nine of Bamboos',
	 		'🀇': 'One of Characters',
			'🀈': 'Two of Characters',
			'🀉': 'Three of Characters',
	 		'🀊': 'Four of Characters',
			'🀋': 'Five of Characters',
			'🀌': 'Six of Characters',
			'🀍': 'Seven of Characters',
			'🀎': 'Eight of Characters',
			'🀏': 'Nine of Characters',
			'🀙': 'Jedna of Circles',
			'🀚': 'Two of Circles',
			'🀛': 'Three of Circles',
			'🀜': 'Four of Circles',
			'🀝': 'Five of Circles',
			'🀞': 'Six of Circles',
			'🀟': 'Seven of Circles',
			'🀠': 'Eight of Circles',
			'🀡': 'Nine of Circles',
			'🀆': 'White Dragon',
			'🀅': 'Green Dragon',
			'🀄︎': 'Red Dragon',
			'🀀': 'East Wind',
			'🀃': 'North Wind',
			'🀁': 'South Wind',
			'🀂': 'West Wind',
			'🀢': 'Plum',
			'🀣': 'Orchid',
			'🀤': 'Bamboo',
			'🀥': 'Chrysanthemum',
			'🀩': 'Winter',
			'🀦': 'Spring',
			'🀨': 'Autumn',
			'🀧': 'Summer',
		}
	}
	current: MahjonggLanguageCode = 'cs-CZ'

	appendLangButtons(elRoot: HTMLElement) {
		for (const languageCodeString in this.translations) {
			const languageCode = <MahjonggLanguageCode>languageCodeString
			const elLanguage = document.createElement('button');
			elLanguage.type = 'button';
			elLanguage.dataset.lang = languageCode;
			elLanguage.addEventListener('click', (evt: Event) => {
				if (evt.target instanceof HTMLButtonElement) {
					this.current = <MahjonggLanguageCode>evt.target.dataset.lang
				} else if (evt.target instanceof Node && evt.target.parentNode instanceof HTMLButtonElement) {
					this.current = <MahjonggLanguageCode>evt.target.parentNode.dataset.lang
				}
				this.dispatchEvent(new CustomEvent('switch', {detail: this.current}))
			});
			elLanguage.addEventListener('keyup', (evt: KeyboardEvent) => {
				if (evt.key !== 'Enter' && evt.key !== ' ') {
					return;
				}
				if (!(evt.target instanceof EventTarget)) {
					return;
				}
				evt.target.dispatchEvent(new MouseEvent('click'))
			});

			const elLanguageFlag = document.createElement('span');
			elLanguageFlag.ariaHidden = 'true';
			elLanguageFlag.innerText = this._l(languageCode, 'flag');
			elLanguage.insertAdjacentElement('beforeend', elLanguageFlag);

			const elLanguageName = document.createElement('span');
			elLanguageName.classList.add('visually-hidden');
			elLanguageName.innerText = this._l(languageCode, 'name');
			elLanguage.insertAdjacentElement('beforeend', elLanguageName);

			elRoot.insertAdjacentElement('beforeend', elLanguage);
		}
	}

	_(key: MahjonggTextKey, def: string = ''): string {
		return this._l(this.current, key, def)
	}

	_l(lang: MahjonggLanguageCode, key: MahjonggTextKey, def: string = ''): string {
		return this.translations[lang][key] ?? def
	}
}