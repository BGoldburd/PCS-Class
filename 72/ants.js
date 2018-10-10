(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const addAnts = document.getElementById('addAnts');
    const colorPicker = document.getElementById('colorPicker');


    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 2;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        
        constructor(color) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.color = color;
            this.counter = 100;
            this.initialCounter = 100;
            this.randomX = Ant.getRandomNumber(-1, 1);
            this.randomY = Ant.getRandomNumber(-1, 1);
        }

        move() {
            let amt = 1;

            if (this.initialCounter > 0) { 
                this.x += Ant.getRandomNumber(-amt, amt);
                this.y += Ant.getRandomNumber(-amt, amt);
                this.initialCounter--;
            } else {
                if (this.counter === 0) {
                    this.randomX = Ant.getRandomNumber(-amt, amt);
                    this.randomY = Ant.getRandomNumber(-amt, amt);
                    this.counter = Ant.getRandomNumber(1, 10);
                }
                this.x += this.randomX;
                this.y += this.randomY;
            }
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x > canvas.width) {
                this.x = canvas.width - 1;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y > canvas.height) {
                this.y = canvas.height - 1;
            }
            
            this.counter--;
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    const theAnts = [];
    for (let i = 0; i < 1000; i++) {
        theAnts.push(new Ant('black'));
    }

    //context.fillStyle = 'red';

    setInterval(() => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        theAnts.forEach(ant => {
            ant.move();
            context.fillStyle = ant.color;
            context.fillRect(ant.x, ant.y, 2, 2);
        });
    }, 100);//17);

    addAnts.addEventListener('click', () => {
        for (let i = 0; i < 1000; i++) {
            theAnts.push(new Ant(colorPicker.value));
        }
        //context.fillStyle = colorPicker.value;
    });

}());