'use strict'
class Cow {
    constructor (lungCapacity) {
        this.lungCapacity = lungCapacity
        this.airInLungs = 0
    }
    breathe () {
        this.airInLungs = this.lungCapacity
    }
    moo () {
        let output = 'm'
        let air = this.airInLungs
        while (air --> 0) { // The 'goes to' operator
            output += 'o'
        }
        this.airInLungs = air
        return output
    }
}
const herd = []
for (let i = 0; i < 30000; i++) {
    const cow = new Cow(i)
    cow.index = i
    herd.push(cow)
}
console.log(process.memoryUsage())
const start = Date.now()
herd.map(cow => {
    cow.breathe()
    cow.moo()
})

console.log('Finish mooing in ' + (Date.now() - start) / 1000 + ' seconds')
