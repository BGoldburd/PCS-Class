(function () {
    'use strict';

    class Vehicle {
        constructor(color) {
            this.color = color;
            this.speed = 0;
        }

        go(speed) {
            this.speed = speed;
            console.log(`now going at speed ${this.speed}`);
        }

        print() {
            console.log(`color: ${this.color} current speed: ${this.speed}`);
        }
    }

    class Plane extends Vehicle {
        go(speed) {
            this.speed = speed;
            console.log(`now flying at speed ${this.speed}`);
        }
    }

    const camry = new Vehicle('silver');
    camry.go(65);
    camry.print();
    const boeing = new Plane('white');
    boeing.go(450);
    boeing.print();
    
}());