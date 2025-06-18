# Mahjongg Solitaire Development

Here you can find some additional information that should help you with onboarding to this
rather small project.

The top-level info is that there is the main HTML file `dev.html` that uses `style.css` for style
definitions and `script.js` for game logic and features and `language.js` for translatable texts and
related functionality.

Basically, I describe below some more-or-less high-level concepts of the project. If you want to
tweak something in the code, inline comments or basic knowledge of HTML, CSS and JS should be enough
to get the hang of how this works. Hint for JS coders: start from the `drawShape` function.

Really. I'm not a good coder myself, so there is nothing really quite complicated and the flow of
the code is maybe even too simple. I believe that most of you will just WTF through the code wishing
that I followed at least *some* basic principles that coders nowadays do.

OK, maybe I owe you an explanation: this project shows (almost) a minimal working implementation of
Mahjongg Solitaire and I expect that people way more skillful than me can use it as an inspiration
or a base implementation. And the second reason is that I'm a simple person and I like simple
things.

## Translations

Firstly, you might find it strange (once and if you stumble upon it) that the default language is
Czech and not English. The explanation is super simple - this game was originally developed as a
potential replacement for my mom's favourite Mahjongg Alchemy game written in Flash, and I wanted to
make it easier for her in case the game has some issue deducting the correct language. That's it.

Now let's go to how the translations are defined and how to add a new one.

Go to [language.js](language.js) and at the top there is the `languages` constant, which is an
object whose keys are language codes (e.g. "en-US") and values are an object that has the same set
of keys for every language and the difference is only in the string values.

To add a new language, just copy an existing language (or the part quoted below), change the key and
translate the string values. There are some comments to help you a little bit.

Hint: keys starting with "btn" are texts on buttons, "hdg" marks a heading text.

You do not need to do anything else; the language is automatically added to language switcher and
recognised by the app once user switches to it.

```js
'en-US': {
    name: 'English',
    language: 'Language',
    txtpoints: 'Points',
    txttime: 'Elapsed time',
    btnnewgame: 'New game',
    btnhelp: 'Help',
    btnclose: 'Close',
    btnhighlight: 'Highlight',
    btnundo: 'Undo',
    btnredo: 'Redo',
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
```

## Deal shapes

The game comes with the definition of the `turtle` deal shape, which is kind of a classic deal.

An important aspect of the shape is how the grid of the board works. Since tiles can be placed or
stacked so that they "touch" only partially, each tile practically takes up two horizontal and two
vertical cells. Each row consists of either odd or even x positions, and each column consists of
either odd or even y positions. Example: if the first tile in a row has `x = 1`, the next tile to
the right will have `x = 3`. If it had `x = 2`, they would overlap. Similarly, if a tile has
`y = 2`, the next tile to the bottom will have `y = 4`.

I would recommend to examine how the default turtle shape is defined to fully understand and be able
to create your own shapes.

If you want to add your own, check the beginning of the `drawGame` function. There you can add a new
condition e.g. under the "turtle condition". You need to define:

- `shapeDef` content - it's an array of objects, each object being a 3D position of a tile. Start
from the left-top at the lowest level. First define the first row, then go vertically to the last
row. Then you can jump to the next level (pun?).
- `sessionStorage.shape*` - there you define, how many cells (`w` for width and `h` for height)
the game board will have.

## HTML file

The `dev.html` itself just contains the structure and by itself is not really interesting. All
"user-facing" texts there are in Czech - I explained this in the section "Translations".

## Main design

The screen has three main parts - top panel, game board and current tile.

*Top panel* is a single-row panel that shows player's points and elapsed time. It also contains
several buttons for game navigation and features:

- "New Game" that reloads the page and effectively starts a new game,
- "Help" for some basic game rules and license information,
- "Highlight" to highlight open tiles,
- "Undo" to go one step back in the tile-matching history, and
- "Redo" to go one step forward in the tile-matching history.

The last part is a language switcher in a form of a select (combobox).

*Game board* takes up the rest of the screen and contains the tiles that the player plays with.

*Current tile* is a small panel in the bottom right corner of the screen (shown only for devices
that have a fine pointer). When the player hovers over a tile, it shows the tile and its name.

## Dialogs

There are three different dialogs - help, winner and loser. All of these dialogs consist of
an emoji, a heading, a text and a button panel with two buttons - "New Game" that reloads the page,
and "Close" that closes the dialog.

The width of a dialog is restricted to 50% of the screen width and is always centered on the
viewport with a dark backdrop. A dialog has simply a white backround with black rounded border.

*Help* shows some basic rules and license information. It is shown when user clicks on "Help"
button.

*Winner* is shown automatically when all tiles are matched and it tells the user that they won and
their final elapsed time.

*Loser* is shown automatically when there are still tiles on the board, but none of them can be
matched. It tells the user that they lost and that it might just be the apps fault (which is true).

## Stylesheets

There isn't much to be said. You can check the stylesheets directly; they have inline comments for
some basic separation of related elements' styling.

I tried to keep styling away from both the main HTML file and the JS scripts, but there are some
exceptions in [script.js](script.js):

- Game board
    - Grid template columns/rows (because it depends on the deal shape we choose in the script)
    - Font size (because it's based on the dynamically computed tile size)
- Tile
    - Position in the grid (because tiles are generated dynamically since we can change deal shapes)
    - Z-index (because it depends on the definition of the deal shape)
    - Relative position (due to simulation of tile stacking based on their z-index)

## Scripts

Both of the JavaScript files contain a code that executes when "DOMContentLoaded" event fires.

The `script.js` creates sessionStorage items to keep some information for the whole duration of the
game. These items are:

- `start` ... timestamp when the page was loaded (start of the game)
- `points` ... player's collected points from matching tiles
- `shapew` ... number of cells in the shape's grid horizontally
- `shapeh` ... number of cells in the shape's grid vertically
- `shapez` ... number of stacked cells in the shape
- `history` ... list of tile-matching steps
- `historyPointer` ... pointing to the latest tile-matching step

The `script.js` is basically a collection of functions saved in constants. The execution of the game
is at the end of the script, when the `drawGame` function is called and `resize` event handler is
defined with some timeout for performance reasons.

The `language.js` goes like this:

1. Define the constant `languages` with translated texts for each language.
2. Check the URL query variable "lang". If it exists and it's a known language, use it, otherwise use
Czech.
3. Create the language switcher content.
4. Replace all texts in the DOM with translated texts.

## Releases

Releases are done via a GitHub Workflow that is manually triggered and takes semver string as a
parameter. The steps are:

1. Checkout master branch
2. Create `index.html` from `dev.html` by adding "integrity" attribute to "script" and "link" tags
3. Create `.tar.xz` and `.zip` archives with files "background.webp", "index.html", "language.js",
"LICENSE", "script.js" and "style.css".
4. Create a new tag and release with generated release notes and the two archives as assets

## Fun

Originally, this project used SVG tiles, but I'm a terrible designer and it also bloated the code
with plenty of preload and CSS background definitions while making the game look absolutely
horrible. Luckily, I stumbled upon Mahjongg tiles in the Unicode characters list, so I decided to
use those instead.

The design is still quite horrible, but now I can at least use the excuse of simplicity :innocent: