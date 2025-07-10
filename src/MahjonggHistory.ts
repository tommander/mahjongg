import {MahjonggTile} from "./MahjonggTile.js"

export function isMahjonggHistoryItem(something: any): something is MahjonggHistoryItem {
    return (
        ('i1' in something) &&
        ('i2' in something) &&
        (something.i1 instanceof MahjonggTile) &&
        (something.i2 instanceof MahjonggTile)
    )
}

export type MahjonggHistoryItem = {
    i1: MahjonggTile,
    i2: MahjonggTile,
}

export class MahjonggHistory extends EventTarget {
    list: Array<MahjonggHistoryItem>
    ptr: number

    constructor() {
        super()

        this.list = []
        this.ptr = -1
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

        //this.list[this.ptr].i1
        this.dispatchEvent(new CustomEvent('restoreTiles', {detail: this.list[this.ptr]}))
        this.ptr--
    }

    redo() {
        if (this.ptr < -1 || this.ptr >= (this.list.length - 1)) {
            return
        }

        this.ptr++
        this.dispatchEvent(new CustomEvent('unrestoreTiles', {detail: this.list[this.ptr]}))
        // const elTile1 = document.getElementById(`tile-${this.list[this.ptr].i1.x}-${this.list[this.ptr].i1.y}-${this.list[this.ptr].i1.z}`)
        // const elTile2 = document.getElementById(`tile-${this.list[this.ptr].i2.x}-${this.list[this.ptr].i2.y}-${this.list[this.ptr].i2.z}`)
        // if (!(elTile1 instanceof HTMLElement) || !(elTile2 instanceof HTMLElement)) {
        //     throw new Error('Broken history')
        // }
        // elTile1.remove()
        // elTile2.remove()
        // this.dispatchEvent(new CustomEvent('redraw'))
    }

    clear() {
        this.list = []
        this.ptr = -1
    }
}