/************************************
 * Tetris
 ***********************************/
document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));  
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = [
    'purple',
    'green',
    'blue',
    'magenta'
  ]

  /************************************
   * Create and draw tetrominoes
  ***********************************/
  // L tetromino
  const lTetromino = [
    [1,width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width *2 + 1, width * 2 + 2]  
  ];

  // Z tetromino
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width *2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  // T tetromino
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]  
  ];

  // O tetromino
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  // I tetromino
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  // Random selection of tetromino at it's first rotation
  let random = Math.floor(Math.random() * tetrominoes.length);
  let current = tetrominoes[random][currentRotation];
  
  // Draw random tetromino a first rotation 
  function drawTetromino() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random] 
    });
  }

  // Remove current tetromino
  function removeTetromino() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    })
  }

  drawTetromino();

  /************************************
   *  Tetromino animation and control
   ***********************************/
  
  // Move tetromino
  // timerId = setInterval(moveTetromino, 500);

  function control(e) {
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotateTetromino();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      // speedUp();
    }
  }

  addEventListener('keyup', control);
  
  // Auto move tetrimino down
  function moveTetromino()
  {
    removeTetromino();
    currentPosition += width;
    drawTetromino();
    freezeTetromino();  
  }

  // Freeze tetromino
  function freezeTetromino() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));    
      // Draw next tetromino
      random = nextRandom;    
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      drawTetromino();
      displayNextTetromino();
      addScore();
      gameOver();
    }
  }

  // Move tetromino left
  function moveLeft() {
    removeTetromino();
    let isAtleftEdge = current.some(index => (currentPosition + index) % width === 0);
    if(!isAtleftEdge) {
      currentPosition -= 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    drawTetromino();
  }

  // Move tetromino right
  function moveRight() {
    removeTetromino();

    let isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) {
      currentPosition += 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;    
    }

    drawTetromino();
  }

  // Next tetromino rotation
  function rotateTetromino() {
    removeTetromino();    
    currentRotation ++; 
    if(currentRotation == current.length) {
      currentRotation = 0;    
    }
    current = tetrominoes[random][currentRotation];
    drawTetromino();
  }

  /************************************
   *  Display next tetromino on mini grid
   ***********************************/
  const miniGridSquares = document.querySelectorAll('.mini-grid div');
  const miniGridWidth = 4;
  let miniGridIndex = 0;

  const nextTetrominoes = [
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, 2], // L tertromino
    [0, miniGridWidth, miniGridWidth + 1, miniGridWidth * 2 + 1], // Z tetromino
    [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2], // T tetromino
    [1, 2, miniGridWidth + 1, miniGridWidth + 2], // O tetromino
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, miniGridWidth * 3 + 1] // I tetromino
  ]

  function displayNextTetromino() {
    miniGridSquares.forEach(square => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    })

    nextTetrominoes[nextRandom].forEach(index => {
      miniGridSquares[miniGridIndex + index].classList.add('tetromino');
      miniGridSquares[miniGridIndex + index].style.backgroundColor = colors[nextRandom];
    })
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      drawTetromino();
      timerId = setInterval(moveTetromino, 500);
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      displayNextTetromino();      
    }
  })

  /************************************
   *  Add score
   ***********************************/
   function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';

        });
        const squaresRemoved = squares.splice(i, width);
        console.log(squaresRemoved);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }

  // Game over
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end';
      clearInterval(timerId);
    }
  }


});