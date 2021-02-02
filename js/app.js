document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const linesDisplay = document.querySelector("#lines");
    const startBtn = document.querySelector("#start-button");
    const displaySquares = document.querySelectorAll(".tetro-grid div");
    const displayIndex = 0;

    let nextRandom = 0;
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    let timerId;
    let score = 0;
    let lines = 0;


    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
    }

    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
            squares[currentPosition + index].style.backgroundColor = "";
        });
    }

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }

    function moveDown() {
        unDraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {

        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach((index) => {
                squares[currentPosition + index].classList.add("taken")
            });

            addScore();
            
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            
            gameOver();
        }
    }

    function moveLeft() {
        unDraw();

        const isLeftEdge = current.some(
            (index) => (currentPosition + index) % width === 0
        );

        if (!isLeftEdge) {
            currentPosition -= 1;
        }

        if (
            current.some((index) =>
                squares[currentPosition + index].classList.contains("taken")
            )
        ) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        unDraw();

        const isRightEdge = current.some((index) => (currentPosition + index) % width === 9);

        if (!isRightEdge) {
            currentPosition += 1;
        }

        if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition -= 1;
        }

        draw();
    }

    function rotate() {
        unDraw();

        currentRotation += 1;

        if (currentRotation === current.length) {
            currentRotation = 0;
        }

        current = theTetrominoes[random][currentRotation];

        draw();
    }

    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove("tetromino");
            square.style.backgroundColor = "";
        });

        upNextTetrominoes[nextRandom].forEach((index) => {
            displaySquares[displayIndex + index].classList.add("tetromino");
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        });
    }

    startBtn.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            document.addEventListener("keydown", control);
            draw();
            timerId = setInterval(moveDown, 500);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });

    function addScore() {
        let linesCleared = 0;
        
        for (let i = 0; i < 199; i += width) {
            const row = [ i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9 ];

            if (row.every((index) => squares[index].classList.contains("taken"))) {
                linesCleared += 1;

                row.forEach((index) => {
                    squares[index].classList.remove("taken");
                    squares[index].classList.remove("tetromino");
                    squares[index].style.backgroundColor = "";
                });
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }

        if(linesCleared === 1) {
            score += 40;
        } else if(linesCleared === 2) {
            score += 100;
        } else if(linesCleared === 3) {
            score += 300;
        } else if(linesCleared === 4) {
            score += 1200;
        }
        
        scoreDisplay.innerHTML = score;
        lines += linesCleared;
        linesDisplay.innerHTML = lines;
    }

    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            scoreDisplay.innerHTML = "Game over";
            clearInterval(timerId);
            document.removeEventListener("keydown", control);
        }
    }
});
