export class MahjonggBeginner extends EventTarget {
    value: boolean = false

    enable() {
        this.value = true
        this.dispatchEvent(new CustomEvent(''))
    }

    disable() {
        this.value = false
        this.dispatchEvent(new CustomEvent(''))
    }

    toggle() {
        this.value = !this.value
        this.dispatchEvent(new CustomEvent(''))
    }
}