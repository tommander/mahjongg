import {MahjonggTileSymbol} from "./MahjonggCommon.js"

export type MahjonggHistoryTile = {
    x: number,
    y: number,
    z: number,
    s: MahjonggTileSymbol,
    prev: string,
}

export function isMahjonggHistoryItem(something: any): something is MahjonggHistoryItem {
    return (
        ('x' in something) &&
        ('y' in something) &&
        ('z' in something) &&
        ('s' in something) &&
        ('prev' in something)
    )
}

export type MahjonggHistoryItem = {
    i1: MahjonggHistoryTile,
    i2: MahjonggHistoryTile,
}

export class MahjonggHistory extends EventTarget {
    list: Array<MahjonggHistoryItem>
    ptr: number

    constructor() {
        super()

        this.list = []
        this.ptr = -1
    }

    static historyTile(elTile: HTMLElement): MahjonggHistoryTile {
        let prevId = ''
        const nodePrev = elTile.previousSibling
        if ((nodePrev instanceof HTMLElement) && nodePrev.classList.contains('tile')) {
            prevId = nodePrev.id
        }
        return {
            x: parseInt(elTile.dataset.x ?? '-1'),
            y: parseInt(elTile.dataset.y ?? '-1'),
            z: parseInt(elTile.dataset.z ?? '-1'),
            s: <MahjonggTileSymbol>elTile.innerText,
            prev: prevId,
        }
    }

    add(item: MahjonggHistoryItem) {
        if (this.ptr < (this.list.length - 1)) {
            this.list.splice(this.ptr + 1)
        }

        this.list.push(item)
        this.ptr = (this.list.length - 1)
    }

    undo() {
        if (this.ptr < 0 || this.ptr >= this.list.length) {
            return
        }

        this.ptr--
        this.dispatchEvent(new CustomEvent('restoreTiles', {detail: this.list[this.ptr]}))
        this.dispatchEvent(new CustomEvent('redraw'))
    }

    redo() {
        if (this.ptr < -1 || this.ptr >= (this.list.length - 1)) {
            return
        }

        this.ptr++
        const elTile1 = document.getElementById(`tile-${this.list[this.ptr].i1.x}-${this.list[this.ptr].i1.y}-${this.list[this.ptr].i1.z}`)
        const elTile2 = document.getElementById(`tile-${this.list[this.ptr].i2.x}-${this.list[this.ptr].i2.y}-${this.list[this.ptr].i2.z}`)
        if (!(elTile1 instanceof HTMLElement) || !(elTile2 instanceof HTMLElement)) {
            throw new Error('Broken history')
        }
        elTile1.remove()
        elTile2.remove()
        this.dispatchEvent(new CustomEvent('redraw'))
    }

    clear() {
        this.list = []
        this.ptr = -1
    }
}