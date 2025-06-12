document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Definition of translatable texts.
	 * 
	 * @constant {Object.<string, Object.<string, (string|Object.<string,string>)>>}
	 */
	const languages = {
		'en-US': {
			name: 'English',
			language: 'Language',
			txtpoints: 'Points',
			txttime: 'Elapsed time',
			btnnewgame: 'New game',
			btnhelp: 'Help',
			btnclose: 'Close',
			hdgwin: 'You won!',
			hdglose: 'You lost!',
			txtlose: 'I should have dealt the cards better.',
			hdghelp: 'Help',
			txthelp: 'Your goal is to collect all 144 tiles. You can pick tiles by pairs that are “open” (at least one long edge is unoccupied and there is no adjacent tile) and have either the same symbol or are both either a Season or a Flower. Note that dealing is random; your particular game might not have a way to be won!',
			txtcopy: '%1s by %2s is marked %3s',
			cards: {
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
			},
		},
		'cs-CZ': {
			name: 'Čeština',
			language: 'Jazyk',
			txtpoints: 'Body',
			txttime: 'Uběhlý čas',
			btnnewgame: 'Nová hra',
			btnhelp: 'Nápověda',
			btnclose: 'Zavřít',
			hdgwin: 'Vyhráli jste!',
			hdglose: 'Prohráli jste.',
			txtlose: 'Asi jsem to špatně rozdal.',
			hdghelp: 'Nápověda',
			txthelp: 'Vaším cílem je posbírat všech 144 kostek. Sbírat můžete kostky se stejnými symboly, které nemají jinou kostku nad sebou či z obou delších stran. Kostky typu Období a Květina mohou být v páru v odlišných barvách. Ale pozor - hra nemusí být nutně rozdána tak, že určitě lze vyhrát!',
			txtcopy: '%1s autora %2s je označen jako %3s',
			cards: {
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
		},
	};

	/**
	 * Handler for language switcher's "change" event.
	 *
	 * @param {Event} evt 
	 */
	const switchLanguage = (evt) => {
		if ((evt.target instanceof HTMLSelectElement) && evt.target.value in languages) {
			const newUrl = new URL(location.href);
			newUrl.searchParams.set('lang', evt.target.value);
			location.href = newUrl;
		}
	};

	// Set the current language ("cs-CZ" by default).
	let lang = 'cs-CZ';
	const sp = new URL(location.href).searchParams;
	const urllang = sp.get('lang');
	if (urllang in languages) {
		lang = urllang;
	}

	// Build language switcher contents.
	const elLanguageSwitcher = document.getElementById('language-switcher');
	if (elLanguageSwitcher instanceof HTMLSelectElement) {
		elLanguageSwitcher.addEventListener('change', switchLanguage);
		for (const languageCode in languages) {
			const elLanguage = document.createElement('option');
			elLanguage.value = languageCode;
			elLanguage.innerText = languages[languageCode].name;
			elLanguage.selected = (languageCode === lang);
			elLanguageSwitcher.insertAdjacentElement('beforeend', elLanguage);
		}
	}

	// From here on until the end: setting translatable texts.

	// <html> element language.
	document.documentElement.lang = lang;

	// Language switcher label (top panel).
	const elLanguageSwitcherLabel = document.getElementById('language-switcher-label');
	if (elLanguageSwitcherLabel instanceof HTMLElement) {
		elLanguageSwitcherLabel.innerText = `${languages[lang].language}:`;
	}

	// Points label (top panel).
	const elPoints = document.getElementById('points');
	if (elPoints instanceof HTMLElement) {
		elPoints.ariaLabel = languages[lang].txtpoints;
	}

	// Elapsed time label (top panel).
	const elTime = document.getElementById('time');
	if (elTime instanceof HTMLElement) {
		elTime.ariaLabel = languages[lang].txttime;
	}

	// New game button (top panel, all dialogs).
	const elsNewGame = document.getElementsByClassName('newGame');
	for (const elNewGame of elsNewGame) {
		elNewGame.innerText = languages[lang].btnnewgame;
	}

	// Help button (top panel).
	const elsHelpButton = document.getElementsByClassName('helpButton');
	for (const elHelpButton of elsHelpButton) {
		elHelpButton.innerText = languages[lang].btnhelp;
	}

	// Close button (help dialog).
	const elHelpClose = document.getElementById('helpClose');
	if (elHelpClose instanceof HTMLElement) {
		elHelpClose.innerText = languages[lang].btnclose;
	}


	// Close button (lose dialog).
	const elLoseClose = document.getElementById('loseClose');
	if (elLoseClose instanceof HTMLElement) {
		elLoseClose.innerText = languages[lang].btnclose;
	}

	// Close button (win dialog).
	const elWinClose = document.getElementById('winClose');
	if (elWinClose instanceof HTMLElement) {
		elWinClose.innerText = languages[lang].btnclose;
	}

	// Heading (win dialog).
	const elWinHeading = document.getElementById('winHeading');
	if (elWinHeading instanceof HTMLElement) {
		elWinHeading.innerText = languages[lang].hdgwin;
	}

	// Heading (lose dialog).
	const elLoseHeading = document.getElementById('loseHeading');
	if (elLoseHeading instanceof HTMLElement) {
		elLoseHeading.innerText = languages[lang].hdglose;
	}

	// Text (lose dialog).
	const elLoseText = document.getElementById('loseText');
	if (elLoseText instanceof HTMLElement) {
		elLoseText.innerText = languages[lang].hdglose;
	}

	// Heading (help dialog).
	const elHelpHeading = document.getElementById('helpHeading');
	if (elHelpHeading instanceof HTMLElement) {
		elHelpHeading.innerText = languages[lang].hdghelp;
	}

	// Text (help dialog).
	const elHelpText = document.getElementById('helpText');
	if (elHelpText instanceof HTMLElement) {
		elHelpText.innerText = languages[lang].txthelp;
	}

	// License info (help dialog).
	const elHelpCopy = document.getElementById('helpCopy');
	if (elHelpCopy instanceof HTMLElement) {
		elHelpCopy.innerHTML = languages[lang].txtcopy
			.replace('%1s', '<a href="https://github.com/tommander/mahjongg">Mahjongg Solitaire</a>')
			.replace('%2s', '<a href="https://tommander.cz">Tomáš Rajnoha</a>')
			.replace('%3s', '<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>');
	}

	// Cards (bottom-right panel).
	for (const cardSymbol in languages[lang].cards) {
		elCard = document.getElementById(cardSymbol);
		if (elCard instanceof HTMLElement) {
			elCard.innerText = languages[lang].cards[cardSymbol];
		}
	}
});