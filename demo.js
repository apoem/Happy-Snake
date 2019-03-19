// 显示startpage，进入游戏。实例化苹果和蛇。控制上下左右
var content = document.getElementsByClassName('content')[0];
//失败后的显示
var loser = document.getElementsByClassName('loser')[0];
var loserScore = document.getElementsByClassName('loserScore')[0];
var close = document.getElementsByClassName('close')[0];

var startPause = document.getElementsByClassName('startPause')[0];

var gameScore = document.getElementById('score');
//游戏开始或暂停的锁；
var key = true;
var timer;
init();
function init() {

    this.mapW = parseInt(window.getComputedStyle(content).width);
    this.mapH = parseInt(window.getComputedStyle(content).height);
    this.mapDiv = content;
    // 初始化食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //初始化蛇
    this.snakeBody = [[3, 0, 'head'], [2, 0, 'body'], [1, 0, 'body']];
    snakeW = 20;
    snakeH = 20;
    //初始化方向
    this.direc = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //分数
    this.score = 0;
   

    startGame();

}

function startGame() {
    gameScore.innerHTML = this.score;
    food();
    snake();
    snakeMove();

}
function food() {
    var food = document.createElement('div');
    food.style.position = 'absolute';
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.borderRadius = '50%';

    this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW));
    this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');

        snake.style.width = snakeW + 'px';
        snake.style.height = snakeH + 'px';
        snake.style.borderRadius = '50%';


        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';

        // this.mapDiv.appendChild(snake).classList.add(this.snakeBody[i][2]);
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direc) {
            case 'right': snake.style.transform = 'rotate(0deg)';
                break;
            case 'left': snake.style.transform = 'rotate(180deg)';
                break;
            case 'up': snake.style.transform = 'rotate(270deg)';
                break;
            case 'down': snake.style.transform = 'rotate(90deg)';
                break;
            default: break;
        }
    }
}
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];

    }
    switch (this.direc) {
        case 'right': this.snakeBody[0][0] += 1;
            break;
        case 'left': this.snakeBody[0][0] -= 1;
            break;
        case 'up': this.snakeBody[0][1] -= 1;
            break;
        case 'down': this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    //判断蛇吃到食物
    if ((this.snakeBody[0][0] == this.foodX) && (this.snakeBody[0][1] == this.foodY)) {
        //数组里的值可以任意，只要添加数组就行，因为蛇会根据数组的数量和折身体的倒数第二位重绘
        this.score += 1;
        gameScore.innerHTML = this.score;
        this.snakeBody.push([1, 1, 'body']);
        removeClass('food');
        food();
    }
    //蛇吃到自己或碰到边界也是失败
    if ((this.snakeBody[0][0] < 0) || (this.snakeBody[0][0] > this.mapW / 20)) {
        reloadGame();
    }
    if ((this.snakeBody[0][1] < 0) || (this.snakeBody[0][1] > this.mapH / 20)) {
        reloadGame();
    }
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        if ((this.snakeBody[0][0] == this.snakeBody[i][0]) && (this.snakeBody[0][1] == this.snakeBody[i][1])) {
            reloadGame();
        }
    }

}

//设置方向锁，防止按了某个方向后，又按n次
function setDirect(code) {
    switch (code) {
        case 37: if (this.left) {
            this.direc = 'left';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
            break;
        case 38: if (this.up) {
            this.direc = 'up';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
            break;
        case 39: if (this.right) {
            this.direc = 'right';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
            break;
        case 40: if (this.down) {
            this.direc = 'down';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
            break;
        default:
            break;
    }
}
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    //while会循环执行
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function snakeMove() {
    timer = setInterval(function () {
        move();
    }, 200);
    bindEvent();
}
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDirect(code);
    }
}
function reloadGame() {
    clearInterval(this.timer);
    removeClass('snake');
    removeClass('food');
    loserScore.innerHTML = this.score;
    loser.style.display = 'block';
    close.onclick = function () {
        loser.style.display = 'none';
        this.score = 0;
        gameScore.innerHTML = this.score;
    }
    startPause.onclick = function () {
        if (key) {
            if (key) {
                init();
                startPause.setAttribute('src', './img/pause.png');
                key = true;
            }
            
        }
        else {
            startPause.setAttribute('src', './img/start.png');
            removeClass(timer)
            
        }



    }
}
