// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.speed * dt + this.x;

    if(this.x > 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//update the player's position
Player.prototype.update = function() {
    if(this.x < 5){
        this.x = 5;
    } else if(this.x > 400){
        this.x = 400;
    } else if(this.y < 0){
        this.reset();
    } else if(this.y > 400){
        this.y = 400;
    }
};


//render the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//handle the input from the user
Player.prototype.handleInput = function(input) {
    if(input === "left"){
        this.x -= 50;
    } else if(input === "up"){
        this.y -= 85;
    } else if(input === "right"){
        this.x += 50;
    } else if(input === "down"){
        this.y += 85;
    }
};

//reset the player's position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemy array
const allEnemies = [];

//Array for 3 Y positions
const positionY = [60, 140, 225];


for(let i = 0; i < 5; i++){
    //get the random speed
    let randomSpeed = Math.random() * (150 - 40) + 40;
    //get the random Y position
    let randomY = positionY[Math.floor(Math.random() * positionY.length)];
    
    allEnemies.push(new Enemy(0, randomY, randomSpeed));
}


let player = new Player(200, 400);


function checkForCollision(location1, location2) {
    if(location1[0] === location2[0] && location1[1] === location2[1]){
        player.reset();
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(e.keyCode);
});
