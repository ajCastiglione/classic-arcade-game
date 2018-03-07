// Enemies object. Player must avoid them.
var Enemy = function(x, y, speed) {

  // Location of enemy
  this.x = x;
  this.y = y;

  // Making sure the speed isn't too slow
  this.speed = Math.floor(Math.random() * speed) * 2;
  if(this.speed < 200) {this.speed = 200;}

  // img of the bug
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game. Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // Once bugs are off screen, they show randomly with a new speed
  if (this.x > 510) {
    this.x = -50;
    this.speed = 100 + Math.floor(Math.random() * 222);
  }

  // Checks if bugs hit the player
  if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    60 + player.y > this.y) {
    player.x = 202;
    player.y = 405;
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
  this.x = x;
  this.y = y;
// Img for the player
  this.sprite = 'images/char-boy.png';
}

// Leaving the update function empty
Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function(keyPress) {

  // Enables user on left arrow key to move one block while checking to see if player is at edge
  if (keyPress == 'left' && this.x > 0) {
    this.x -= 102;
  };

  // Enables user on right arrow key to move one block while checking to see if player is at edge
  if (keyPress == 'right' && this.x < 404) {
    this.x += 102;
  };

  // Enables user on up arrow key to move one block while checking to see if player is at edge
  if (keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  };

  // Enables user on down arrow key to move one block while checking to see if player is at edge
  if (keyPress == 'down' && this.y < 404) {
    this.y += 83;
  };

  // Once the user reaches the top of the water, the user is instantly reset to the starting position
  if (this.y < 0) {
    setTimeout(() => {
      this.x = 200;
      this.y = 405;
    }, 700);
  };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

let enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 until randomly regenerated in the enemy update function above
enemyLocation.forEach(function(locY) {
  enemy = new Enemy(0, locY, 200);
  allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
let player = new Player(200, 405);


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
});
