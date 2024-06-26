document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');

  console.log(squares);
  const width = 10;
  currentPosition = 2;

  let current = [1, width + 1, width * 2 + 1];


  function draw() {
    current.forEach(element => squares[currentPosition + element].classList.add('tetromino'));
  }
  draw();

  function undraw() {
    current.forEach(element => squares[currentPosition + element].classList.remove('tetromino'))
  }

  setInterval(move, 1000);

  function move() {
    undraw();
    currentPosition += width;
    draw();
  }
})

freeze
