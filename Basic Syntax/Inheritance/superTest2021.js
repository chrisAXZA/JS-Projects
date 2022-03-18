function Balloon(color, gasWeight) {
    this.color = color;
    this.gasWeight = gasWeight;
}

function PartyBalloon(color, gasWeight, ribbonColor, ribbonLength) {
    Balloon.call(this, color, gasWeight);
    // this.constructor.prototype.constructor.call(this, color, gasWeight);
    this.ribbonColor = ribbonColor;
    this.ribbonLength = ribbonLength;
}

PartyBalloon.prototype = Object.create(Balloon.prototype);
PartyBalloon.prototype.constructor = PartyBalloon;

let a = new PartyBalloon('red', 20, 'blue', 10);
console.log(a);

let b = { age: 12 };
// let c = Object.create(b); // creates reference link
let c = Object.assign({}, b); // creates copy of properties
console.log(c.age);