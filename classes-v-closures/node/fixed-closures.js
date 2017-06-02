'use strict'
function Cow (lungCapacity) {
    let airInLungs = 0
    function breathe () {
        airInLungs = lungCapacity
    }
    function getAirInLungs () {
        return airInLungs
    }
    function moo () {
        let output = 'm'
        let air = getAirInLungs()
        while (air --> 0) { // The 'goes to' operator.df
            output += 'o'
        }
        airInLungs = air
        return output
    }
    return {breathe:breathe, moo:moo}
}
const herd = []
for (var i = 0; i < 30000; i++) {
    const cow = Cow(i)
    cow.index = i
    herd.push(cow)
}
console.log(process.memoryUsage())
const start = Date.now()
herd.map(function(cow) {
    cow.breathe()
    cow.moo()
})
console.log('Finish mooing in ' + (Date.now() - start) / 1000 + ' seconds')
