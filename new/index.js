const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBg = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "brown";
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize * 1, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

// Get references to the control buttons
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

// Add event listeners to the control buttons
upButton.addEventListener('click', () => {
    // Move the snake up
    changeDirection({ keyCode: 38 });
});
downButton.addEventListener('click', () => {
    // Move the snake down
    changeDirection({ keyCode: 40 });
});
leftButton.addEventListener('click', () => {
    // Move the snake left
    changeDirection({ keyCode: 37 });
});
rightButton.addEventListener('click', () => {
    // Move the snake right
    changeDirection({ keyCode: 39 });
});


window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 145);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBg;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;

    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    // console.log(foodX);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    snake.unshift(head); 
    // if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score+=1;
        scoreText.textContent = score;
        createFood();
    }     
    else{
        snake.pop();
    }     
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    // console.log(keyPressed);
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
        running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};



































