/************************************
 * Tetris
 ***********************************/
document.addEventListener('DOMContentLoaded', ()=> {

  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));  
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;

  /************************************
   * Create and draw tetrominoes
  ***********************************/
  // L tetromino
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
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
      console.log(squares[currentPosition + index]); 
    });
  }

  // Remove current tetromino
  function removeTetromino() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  drawTetromino();

  /************************************
   *  y-axis tetromino automatic move
   ***********************************/
  setInterval(moveTetromino, 1000);
  
  function moveTetromino()
  {
    removeTetromino();
    currentPosition += width;
    drawTetromino();  
  }

})
