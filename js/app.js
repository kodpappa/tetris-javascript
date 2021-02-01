document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const displaySquares = document.querySelectorAll(".mini-grid div");
    
    let displayIndex = 0;
    let nextRandom = 0;
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    let timerId = null;

    function draw() {
        current.forEach((index) =>
            squares[currentPosition + index].classList.add("tetromino")
        );
    }

    function unDraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        }
        else if(e.keyCode === 39) {
            moveRight();
        }
        else if(e.keyCode === 38) {
            rotate();
        }
        else if(e.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener("keyup", control)
    
    function moveDown() {
        unDraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    function moveLeft() {
        unDraw();
        
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isLeftEdge) {
            currentPosition -= 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        unDraw();
        
        const isRightEdge = current.some(index => (currentPosition + index) % width === 9);

        if(!isRightEdge) {
            currentPosition += 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition -= 1;
        }

        draw();
    }

    function rotate() {
        unDraw();

        currentRotation += 1;
        
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        
        current = theTetrominoes[random][currentRotation];

        draw();
    }

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove("tetromino");
        });

        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add("tetromino");
        })
    }

    startBtn.addEventListener("click", () => {
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw()
            timerId = setInterval(moveDown, 500);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            displayShape();
        }
    })
});
