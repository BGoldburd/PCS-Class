(function () {
    'use strict';
    
    const replayButton = document.getElementById('replay');
    const scoreSpan = document.getElementById('scoreSpan');

    function playGame() {
        const canvas = document.getElementById('theCanvas');
        const context = canvas.getContext('2d');
        const LEFT = 37,
            UP = 38,
            RIGHT = 39,
            DOWN = 40;
        const snakeSize = 64;
        const crunchSound = document.getElementById('crunch');
        const gameOver = document.getElementById('gameOver');
        const scoreDiv = document.getElementById('scoreDiv');
        const snakeTail = document.createElement('img');
        snakeTail.src = 'images/snakeTail.png';

        let head = {x: 0, y: 0};
        let tailPieces = [];
        let apple = {x: -1, y: 0};
        let direction = RIGHT;
        let directionApplied;
        let score = 0;
        let speed = 600;

        function resizeCanvas() {
            let initialHeight = window.innerHeight - parseInt(getComputedStyle(scoreDiv).height);
            canvas.width = window.innerWidth % snakeSize <= 2 ? window.innerWidth - 2 : window.innerWidth - window.innerWidth % snakeSize;
            canvas.height = initialHeight % snakeSize <= 2 ? initialHeight - 2 : initialHeight - (initialHeight % snakeSize);
            canvas.style.marginLeft = (window.innerWidth % snakeSize)/2 + 'px';

            // in case apple is now off the screen - obviously we could check first
            context.clearRect(apple.x, apple.y, snakeSize, snakeSize);
            if (apple.x + 1) { // if apple not placed yet will be 0
                placeApple();
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const snakeHead = document.createElement('img');
        snakeHead.src = 'images/snakeHead.png';

        snakeHead.onload = render;

        let intervalId;

        function render() {
            intervalId =  setInterval(() => {
                context.clearRect(head.x, head.y, snakeSize, snakeSize);

                if (tailPieces.length) {
                    context.clearRect(tailPieces[tailPieces.length - 1].x, tailPieces[tailPieces.length - 1].y, snakeSize, snakeSize);
                    tailPieces.forEach(tailPiece => {
                        tailPiece.prevLocation = {x: tailPiece.x, y: tailPiece.y};
                    });
                    tailPieces[0].x = head.x;
                    tailPieces[0].y = head.y;
                    for (let i = 1; i < tailPieces.length; i++) {
                        tailPieces[i].x = tailPieces[i - 1].prevLocation.x;
                        tailPieces[i].y = tailPieces[i - 1].prevLocation.y;
                    }
                }

                switch (direction) {
                    case LEFT:
                        head.x -= snakeSize;
                        break;
                    case UP:
                        head.y -= snakeSize;
                        break;
                    case RIGHT:
                        head.x += snakeSize;
                        break;
                    case DOWN:
                        head.y += snakeSize;
                        break;
                }

                if (tailPieces.length) {
                    tailPieces.forEach(tailPiece => {
                        context.drawImage(snakeTail, tailPiece.x, tailPiece.y, snakeSize, snakeSize); 
                    });
                }

                if (head.x === apple.x && head.y === apple.y) {
                    crunchSound.currentTime = 0;
                    crunchSound.play();
                    score++;
                    scoreSpan.innerHTML = score;
                    placeApple();
                    speed /= 1.1;
                    clearInterval(intervalId);
                    tailPieces.push({});
                    render();
                }

                if (head.x < 0 || head.y < 0 || head.x + snakeSize > canvas.width || head.y + snakeSize > canvas.height) {
                    clearInterval(intervalId);
                    gameOver.play();
                    replayButton.style.display = 'inline-block';
                }

                tailPieces.forEach(tailPiece => {
                    if (head.x === tailPiece.x && head.y === tailPiece.y) {
                        clearInterval(intervalId);
                        gameOver.play();
                        replayButton.style.display = 'inline-block';
                    }
                });

                context.drawImage(snakeHead, head.x, head.y, snakeSize, snakeSize);
                tailPieces.forEach( tailPiece => {
                    context.drawImage(snakeTail, tailPiece.x, tailPiece.y, snakeSize, snakeSize);             
                });

                directionApplied = direction;
            }, speed);
        }

        const appleImg = document.createElement('img');
        appleImg.src = 'images/apple.png';
        appleImg.onload = placeApple;

        function placeApple() {
            apple.x = getRandomNumber(0, canvas.width - snakeSize);
            apple.y = getRandomNumber(0, canvas.height - snakeSize);
            apple.x = apple.x - apple.x % snakeSize;
            apple.y = apple.y - apple.y % snakeSize;

            let underTail = false;
            tailPieces.forEach(tailPiece => {
                if (tailPiece.x === apple.x && tailPiece.y === apple.y) {
                    underTail = true;
                }
            });

            if (head.x === apple.x && head.y === apple.y) {
                placeApple();
            } else if (underTail) {
                placeApple();
            } else {
                context.drawImage(appleImg, apple.x, apple.y, snakeSize, snakeSize);
            }
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        document.addEventListener('keydown', event => {
            if ((event.keyCode === LEFT && directionApplied === RIGHT) ||
                (event.keyCode === UP && directionApplied === DOWN) ||
                (event.keyCode === RIGHT && directionApplied === LEFT) ||
                (event.keyCode === DOWN && directionApplied === UP)) {
                return;
            }

            switch (event.keyCode) // note keyCode is DEPRECATED
            {
                case LEFT:
                case UP:
                case RIGHT:
                case DOWN:
                    direction = event.keyCode;
            }
        });
    }

    playGame();

    replayButton.addEventListener('click', () => {
        replayButton.style.display = 'none';
        scoreSpan.innerHTML = 0;
        playGame();
    });
}());