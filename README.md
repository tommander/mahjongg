# Mahjongg Solitaire

A simple Mahjongg Solitaire game, using HTML + CSS + JS with a timer and points.

Main advantages:

- No external dependencies or assets
- Should work on most devices and browsers (auto-resize)
- Fast even on slower devices
- No personal data collection, analytics etc.
- No frameworks, composers, npms etc.
- SVG graphics

> [!WARNING]
> The game is translated to Czech only.
> Other languages (esp. English) will be added later.

## Installation

1. Clone this repo somewhere inside your webserver root.
2. Check and (if needed) change relative URLs/paths.
3. That's it.

It could work without a webserver (by opening the HTML file directly) if modern browsers didn't have [CSP rules](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) for `file` protocol that block CSS and/or JS files (and inline styles/scripts, too).

## Game Rules

You have 144 tiles that are placed in a predefined "turtle" shape.

Your goal is to pick pairs of tiles with identical symbol (or any two Flower/Season) until there is no block left.

You can only pick a block that:

- Is not blocked by another block above it, and
- Has at least one long edge free.

Types of tiles:

- Suited tiles
   - Character (9 ranks, 4x each)
   - Circle (9 ranks, 4x each)
   - Stick (9 ranks, 4x each)
- Honors tiles
   - Wind (4 kinds, 4x each)
   - Dragon (3 kinds, 4x each)
- Bonus tiles
   - Flower (4 tiles)
   - Season (4 tiles)

By clearing a pair of tiles, you get points according to their type:

- Character = 2 pts
- Circle = 4 pts
- Bamboo = 6 pts
- Wind = 8 pts
- Dragon = 10 pts
- Flower = 12 pts
- Season = 14 pts

There is no time restriction for the game.

## Development

There is plenty of room for improvements, bug fixes, and new features.

I'll be very thankful if you:

- share your work via PR,
- raise an Issue if you do not plan to have a look at it yourself,
- help in any other way with this tiny little project,
- help some people that really need it.

## License

[Mahjongg Solitaire](https://github.com/tommander/mahjongg) by [Tomáš Rajnoha](https://tommander.cz) is marked [CC0 1.0](LICENSE).

[Background photo](https://get.pxhere.com/photo/architecture-bridge-river-jungle-garden-waterway-rainforest-china-rural-area-arch-bridge-leshan-1166576.jpg) comes from [Pxhere](https://pxhere.com/ko/photo/1166576).
