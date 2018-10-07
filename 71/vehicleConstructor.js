(function () {
    'use strict';

    function Vehicle(color) {
        this.color = color;
        this.speed = 0;
        this.go = function(speed) {
            this.speed = speed;
            console.log(`now going at speed ${this.speed}`);
        };
        // this.print = function () {
        //     console.log(`color: ${this.color} current speed: ${this.speed}`);
        // };
    }

    Vehicle.prototype.print = function () {
        console.log(`color: ${this.color} current speed: ${this.speed}`);
    };

    function Plane(color) {
        Vehicle.call(this, color);
        this.go = function(speed) {
            this.speed = speed;
            console.log(`now flying at speed ${this.speed}`);
        }; 
    }

    Plane.prototype = Object.create(Vehicle.prototype);

    const camry = new Vehicle('silver');
    camry.go(65);
    camry.print();
    const boeing = new Plane('white');
    boeing.go(450);
    boeing.print();

}());