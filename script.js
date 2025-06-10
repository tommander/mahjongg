document.addEventListener('DOMContentLoaded', () => {
    window.mahjongg = {
        start: new Date().valueOf(),
        points: 0,
    };

    const brickTypes = [
        'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
        'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
        'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
        'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
        'character1','character2','character3','character4','character5','character6','character7','character8','character9',
        'character1','character2','character3','character4','character5','character6','character7','character8','character9',
        'character1','character2','character3','character4','character5','character6','character7','character8','character9',
        'character1','character2','character3','character4','character5','character6','character7','character8','character9',
        'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
        'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
        'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
        'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9',
        'dragonB','dragonG','dragonR',
        'dragonB','dragonG','dragonR',
        'dragonB','dragonG','dragonR',
        'dragonB','dragonG','dragonR',
        'windE','windN','windS','windW',
        'windE','windN','windS','windW',
        'windE','windN','windS','windW',
        'windE','windN','windS','windW',
        'flowerB','flowerG','flowerO','flowerR',
        'seasonB','seasonG','seasonO','seasonY'
    ];

    const nameMap = {
        bamboo1: "Jednička Bambus",
        bamboo2: "Dvojka Bambus",
        bamboo3: "Trojka Bambus",
        bamboo4: "Čtyřka Bambus",
        bamboo5: "Pětka Bambus",
        bamboo6: "Šestka Bambus",
        bamboo7: "Sedma Bambus",
        bamboo8: "Osma Bambus",
        bamboo9: "Devítka Bambus",
        character1: "Jednička Znak",
        character2: "Dvojka Znak",
        character3: "Trojka Znak",
        character4: "Čtyřka Znak",
        character5: "Pětka Znak",
        character6: "Šestka Znak",
        character7: "Sedma Znak",
        character8: "Osma Znak",
        character9: "Devítka Znak",
        circle1: "Jednička Kruh",
        circle2: "Dvojka Kruh",
        circle3: "Trojka Kruh",
        circle4: "Čtyřka Kruh",
        circle5: "Pětka Kruh",
        circle6: "Šestka Kruh",
        circle7: "Sedma Kruh",
        circle8: "Osma Kruh",
        circle9: "Devítka Kruh",
        dragonB: "Modrý Drak",
        dragonG: "Zelený Drak",
        dragonR: "Červený Drak",
        windE: "Východní Vítr",
        windN: "Severní Vítr",
        windS: "Jižní Vítr",
        windW: "Západní Vítr",
        flowerB: "Modrá Květina",
        flowerG: "Zelená Květina",
        flowerO: "Oranžová Květina",
        flowerR: "Červená Květina",
        seasonB: "Zimní Období",
        seasonG: "Jarní Období",
        seasonO: "Podzimní Období",
        seasonY: "Letní Období",
    };

    const pointsMap = {
        bamboo1: 6,
        bamboo2: 6,
        bamboo3: 6,
        bamboo4: 6,
        bamboo5: 6,
        bamboo6: 6,
        bamboo7: 6,
        bamboo8: 6,
        bamboo9: 6,
        character1: 2,
        character2: 2,
        character3: 2,
        character4: 2,
        character5: 2,
        character6: 2,
        character7: 2,
        character8: 2,
        character9: 2,
        circle1: 4,
        circle2: 4,
        circle3: 4,
        circle4: 4,
        circle5: 4,
        circle6: 4,
        circle7: 4,
        circle8: 4,
        circle9: 4,
        dragonB: 10,
        dragonG: 10,
        dragonR: 10,
        windE: 8,
        windN: 8,
        windS: 8,
        windW: 8,
        flowerB: 12,
        flowerG: 12,
        flowerO: 12,
        flowerR: 12,
        seasonB: 14,
        seasonG: 14,
        seasonO: 14,
        seasonY: 14,
    };

    const checkLose = () => {
        const allTiles = document.querySelectorAll('div.tile');
        let notBlocked = [];
        for (const tile of allTiles) {
            if (isBlocked(tile) === false) {
                notBlocked.push(tile.dataset.t);
            }
        }
        notBlocked.sort();
        const notBlockedPairs = [];
        let prev = null;
        for (const one of notBlocked) {
            if (prev !== null && ((prev.startsWith('flower') && one.startsWith('flower')) || (prev.startsWith('season') && one.startsWith('season')) || prev === one) && notBlockedPairs.indexOf(one) === -1) {
                notBlockedPairs.push(one);
            }
            prev = one;
        }

        if (notBlockedPairs.length > 0) {
            return;
        }

        const elLose = document.getElementById('lose');
        if (!elLose) {
            return;
        }
        elLose.showModal();
    }

    const checkWin = () => {
        const anyTile = document.querySelector('div.tile');
        if (anyTile) {
            checkLose();
            return;
        }

        const elWin = document.getElementById('win');
        if (!elWin) {
            return;
        }
        clearInterval(timeInt);
        const elDlgDetail = document.querySelector('#win .dlgdetail');
        const elTime = document.getElementById('time');
        if ((elDlgDetail instanceof HTMLElement) && (elTime instanceof HTMLElement)) {
            elDlgDetail.innerText = elTime.innerText;
        }
        elWin.showModal();
    }

    const isBrick = (elem) => {
        return (
            (elem instanceof HTMLDivElement) &&
            elem.classList.contains('tile') &&
            ('x' in elem.dataset) &&
            ('y' in elem.dataset) &&
            ('z' in elem.dataset)
        );
    }

    const isBlocked = (brick) => {
        if (!isBrick(brick)) {
            console.log('Not a brick');
            return null;
        }

        const myX = parseInt(brick.dataset.x);
        const myY = parseInt(brick.dataset.y);
        const myZ = parseInt(brick.dataset.z);

        if (
            (
                // Left blocked, partial or full
                document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY-1}"][data-z="${myZ}"]`) ||
                document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY}"][data-z="${myZ}"]`) ||
                document.querySelector(`div.tile[data-x="${myX-2}"][data-y="${myY+1}"][data-z="${myZ}"]`)
            ) && (
                // Right blocked, partial or full
                document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY-1}"][data-z="${myZ}"]`) ||
                document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY}"][data-z="${myZ}"]`) ||
                document.querySelector(`div.tile[data-x="${myX+2}"][data-y="${myY+1}"][data-z="${myZ}"]`)
            )
        ) {
            return true;
        }

        if (
            // Same column, partial or full cover
            document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY}"][data-z="${myZ+1}"]`) ||
            // One half column above
            document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY-1}"][data-z="${myZ+1}"]`) ||
            // One half column below
            document.querySelector(`div.tile[data-x="${myX-1}"][data-y="${myY+1}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX}"][data-y="${myY+1}"][data-z="${myZ+1}"]`) ||
            document.querySelector(`div.tile[data-x="${myX+1}"][data-y="${myY+1}"][data-z="${myZ+1}"]`)
        ) {
            return true;
        }

        return false;
    }

    const onTileClick = (evt) => {
        if (isBlocked(evt.target) !== false) {
            return;
        }

        if (evt.target.dataset.s === "selected") {
            delete evt.target.dataset.s;
            return;
        }
        evt.target.dataset.s = "selected";

        const listSel = document.querySelectorAll(`div.tile[data-s="selected"]`);
        if (listSel.length !== 2) {
            return;
        }

        if (
            (listSel[0].dataset.t.startsWith('flower') && listSel[1].dataset.t.startsWith('flower')) ||
            (listSel[0].dataset.t.startsWith('season') && listSel[1].dataset.t.startsWith('season')) ||
            listSel[0].dataset.t === listSel[1].dataset.t
        ) {
            window.mahjongg.points += (pointsMap[listSel[0].dataset.t] + pointsMap[listSel[1].dataset.t]);
            let strPoints = 'bodů';
            if (window.mahjongg.points === 1) {
                strPoints = 'bod';
            } else if (window.mahjongg.points > 1 && window.mahjongg.points <= 4) {
                strPoints = 'body';
            }
            const elPoints = document.getElementById('points');
            if (elPoints instanceof HTMLElement) {
                elPoints.innerText = `${window.mahjongg.points} ${strPoints}`;
            }
            listSel[0].remove();
            listSel[1].remove();
            checkWin();
            return;
        }

        delete evt.target.dataset.s;
    };

    const onTileMouseEnter = (evt) => {
        const elImg = document.getElementById('currentimg');
        const elDiv = document.getElementById('currentname');
        if (!(elImg instanceof HTMLImageElement) || !(elDiv instanceof HTMLDivElement)) {
            return;
        }
        elImg.src = 'tiles/tile_' + evt.target.dataset.t + '.svg';
        elDiv.innerText = nameMap[evt.target.dataset.t];
    };

    const onTileMouseLeave = (evt) => {
        const elImg = document.getElementById('currentimg');
        const elDiv = document.getElementById('currentname');
        if (!(elImg instanceof HTMLImageElement) || !(elDiv instanceof HTMLDivElement)) {
            return;
        }
        elImg.src = 'tiles/tile_empty.svg';
        elDiv.innerText = 'Nula Nic';
    };

    const tiles = document.getElementsByClassName('tile');
    let maxX = 0;
    let maxY = 0;
    const tileW = 70;
    const tileH = 90;
    const tileS = 10;
    for (const tile of tiles) {
        if (!isBrick(tile)) {
            continue;
        }
        const tileX = parseInt(tile.dataset.x);
        const tileY = parseInt(tile.dataset.y);
        const tileZ = parseInt(tile.dataset.z);
        const tileLeft = Math.round(((tileX - 1) * (tileW / 2)) - ((tileZ - 1)*tileS));
        const tileTop = Math.round(((tileY - 1) * (tileH / 2)) - ((tileZ - 1)*tileS));
        if (tileLeft > maxX) {
            maxX = tileLeft;
        }
        if (tileTop > maxY) {
            maxY = tileTop;
        }
        tile.style.left = `${tileLeft}px`;
        tile.style.top = `${tileTop}px`;
        tile.addEventListener('click', onTileClick);
        tile.addEventListener('mouseenter', onTileMouseEnter);
        tile.addEventListener('mouseleave', onTileMouseLeave);
        const randomType = Math.floor(Math.random() * brickTypes.length)
        tile.dataset.t = brickTypes[randomType]
        brickTypes.splice(randomType, 1);
    }
    const elGame = document.getElementById('game');
    if (elGame instanceof HTMLDivElement) {
        elGame.style.width = `${maxX+tileW}px`;
        elGame.style.height = `${maxY+tileH}px`;
    }

    const elWinClose = document.getElementById('winClose');
    if (elWinClose instanceof HTMLButtonElement) {
        elWinClose.addEventListener('click', () => {
            document.getElementById('win').close();
        });
    }

    const elLoseClose = document.getElementById('loseClose');
    if (elLoseClose instanceof HTMLButtonElement) {
        elLoseClose.addEventListener('click', () => {
            document.getElementById('lose').close();
        });
    }

    const elHelpClose = document.getElementById('helpClose');
    if (elHelpClose instanceof HTMLButtonElement) {
        elHelpClose.addEventListener('click', () => {
            document.getElementById('help').close();
        });
    }

    const elAboutClose = document.getElementById('aboutClose');
    if (elAboutClose instanceof HTMLButtonElement) {
        elAboutClose.addEventListener('click', () => {
            document.getElementById('about').close();
        });
    }

    const elsNewGame = document.getElementsByClassName('newGame');
    for (const elNewGame of elsNewGame) {
        if (!(elNewGame instanceof HTMLButtonElement)) {
            continue;
        }
        elNewGame.addEventListener('click', () => {
            window.location.reload();
        });
    }

    const elsHelpButton = document.getElementsByClassName('helpButton');
    for (const elHelpButton of elsHelpButton) {
        if (!(elHelpButton instanceof HTMLButtonElement)) {
            continue;
        }
        elHelpButton.addEventListener('click', () => {
            const dlgHelp = document.getElementById('help');
            if (dlgHelp instanceof HTMLDialogElement) {
                dlgHelp.showModal();
            }
        });
    }

    const elsAboutButton = document.getElementsByClassName('aboutButton');
    for (const elAboutButton of elsAboutButton) {
        if (!(elAboutButton instanceof HTMLButtonElement)) {
            continue;
        }
        elAboutButton.addEventListener('click', () => {
            const dlgAbout = document.getElementById('about');
            if (dlgAbout instanceof HTMLDialogElement) {
                dlgAbout.showModal();
            }
        });
    }

    const timeProc = () => {
        const elTime = document.getElementById('time');
        if (!(elTime instanceof HTMLElement)) {
            return;
        }
        const diff = Math.floor((new Date().valueOf() - window.mahjongg.start) / 1000);
        const diffM = Math.floor(diff / 60);
        const diffS = diff % 60;
        elTime.innerText = `${diffM}m ${diffS}s`;
    };
    const timeInt = setInterval(timeProc, 1000);
});