export class MahjonggUi {
    static elementId<T extends HTMLElement>(jab: new() => T, id: string): T {
        const el = document.getElementById(id)
        if (!(el instanceof jab)) {
            throw new Error('Cannot build UI')
        }
        return el
    }

    static elementName<T extends HTMLElement>(jab: new() => T, name: string, idx: number): T {
        const els = document.getElementsByTagName(name)
        if (els.length <= idx) {
            throw new Error('Cannot build UI')
        }
        if (!(els[idx] instanceof jab)) {
            throw new Error('Cannot build UI')
        }
        return els[idx]
    }

    static elementClass<T extends HTMLElement>(jab: new() => T, cls: string, idx: number): T {
        const els = document.getElementsByClassName(cls)
        if (els.length <= idx) {
            throw new Error('Cannot build UI')
        }
        if (!(els[idx] instanceof jab)) {
            throw new Error('Cannot build UI')
        }
        return els[idx]
    }

    static elementSelector<T extends HTMLElement>(jab: new() => T, selector: string, idx: number = 0, doc: Document|Element = document): T {
        const el = (idx === 0) ? doc.querySelector(selector) : doc.querySelectorAll(selector)[idx]
        if (!(el instanceof jab)) {
            throw new Error('Cannot build UI')
        }
        return el

    }

}