'use strict'
function Cow (lungCapacity) {
    var airInLungs = 0
    function breathe () {
        airInLungs = lungCapacity
    }
    function getAirInLungs () {
        return airInLungs
    }
    function moo () {
        var output = 'm'
        var air = getAirInLungs()
        while (air --> 0) { // The 'goes to' operator
            output += 'o'
        }
        airInLungs = air
        return output
    }
    return {breathe:breathe, moo:moo}
}
var herd = []
for (var i = 0; i < 30000; i++) {
    var cow = Cow(i)
    cow.index = i
    herd.push(cow)
}
console.log(process.memoryUsage())
var start = Date.now()
herd.map(function(cow) {
    cow.breathe()
    cow.moo()
})
console.log('Finish mooing in ' + (Date.now() - start) / 1000 + ' seconds')
