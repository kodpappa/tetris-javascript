const width = 10;
const displayWidth = 4;
const colors = ["#E38885", "#F1A784", "#F5D67C", "#F6F485", "#9FFB8C", "#6DE0DD", "#9B91F2"];

const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const zTetromino = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1]
];

const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
];

const oTetromino = [
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2]
];

const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
];

const mlTetromino = [
    [2, width + 2, width * 2 + 1, width * 2 + 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2]
];

const mzTetromino = [
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [2, width + 1, width + 2, width * 2 + 1]
];

const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    mlTetromino,
    mzTetromino
];

const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [
        displayWidth + 1,
        displayWidth + 2,
        displayWidth * 2,
        displayWidth * 2 + 1,
    ],
    [
        displayWidth + 1,
        displayWidth * 2,
        displayWidth * 2 + 1,
        displayWidth * 2 + 2,
    ],
    [
        displayWidth + 1,
        displayWidth + 2,
        displayWidth * 2 + 1,
        displayWidth * 2 + 2,
    ],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [2, displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
    [displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
];
