export class MahjonggTimer extends EventTarget {
    interval: NodeJS.Timeout|null = null
    timezero: number = 0

    constructor() {
        super()
    }

    start() {
        this.timezero = new Date().valueOf()
        this.interval = setInterval(() => {
    		const diff = Math.floor((new Date().valueOf() - this.timezero) / 1000);
	    	const diffM = Math.floor(diff / 60);
		    const diffS = diff % 60;
		    const diffS0 = diffS < 10 ? '0' : '';
            this.dispatchEvent(new CustomEvent('tick', {detail: this.diff()}))
        })
    }

    stop() {
        if (this.interval === null) {
            return
        }
        clearInterval(this.interval)
        this.interval = null
    }

    diff() {
        if (this.timezero === 0) {
            return '0:00'
        }
    	const diff = Math.floor((new Date().valueOf() - this.timezero) / 1000);
	    const diffM = Math.floor(diff / 60);
		const diffS = diff % 60;
		const diffS0 = diffS < 10 ? '0' : '';
        return `${diffM}:${diffS0}${diffS}`
    }
}