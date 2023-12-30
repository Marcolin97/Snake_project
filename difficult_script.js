let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let scoreDisplay = document.getElementById('score');

let grid = 16;
let count = 0;
let score = 0;
let speed = 2.5;
let movingFood = true;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
};

let apple = {
    x: 320,
    y: 320,
};

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

function showGameOverPopUp(){
    alert('Game Over! Skill Issue, your score was: ' + score);
}

function loop(){
    requestAnimationFrame(loop);

    canvas.width *= shrinkRate;
    canvas.height *= shrinkRate;

    if (++count < gameDelay) {
        return;
    }

    count=0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x<0){
        snake.x = canvas.width - grid;
    } else if(snake.x>=canvas.width) {
        snake.x = 0
    }
    
    if(snake.y<0){
        snake.y = canvas.height - grid;
    } else if(snake.y>=canvas.height) {
        snake.y = 0
    }

    snake.cells.unshift({x: snake.x, y: snake.y})

    if(snake.cells.length>snake.maxCells){
        snake.cells.pop();
    }

    if (movingFood) {
        
        apple.x += getRandomInt(-1, 2) * grid;
        apple.y += getRandomInt(-1, 2) * grid;
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index){
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        
        if(cell.x === apple.x && cell.y === apple.y){
            snake.maxCells++;
            score++;
            scoreDisplay.textContent='Score: ' +score;
            apple.x=getRandomInt(0, 50)*grid;
            apple.y=getRandomInt(0, 50)*grid;
        }
        for(let i = index+1; i < snake.cells.length; i++){
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                showGameOverPopUp();
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                score = 0;
                scoreDisplay.textContent = 'Score: ' + score;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
});

requestAnimationFrame(loop);
