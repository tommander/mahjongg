export class MahjonggBeginner extends EventTarget {
    value: boolean = false

    enable() {
        this.value = true
    }

    disable() {
        this.value = false
    }

    toggle() {
        this.value = !this.value
    }
}