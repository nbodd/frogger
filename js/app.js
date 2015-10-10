var CANVAS_HEIGHT = 606;
var CANVAS_WIDTH = 505;

var COL_WIDTH = CANVAS_WIDTH / 5;
var ROW_HEIGHT = (CANVAS_HEIGHT - 70) / 6;

var random = function(min, max) {
    var delta = max-min;
    return (Math.random() * delta) + min;
}

var Sprite = function(image, xPos, yPos, xSpeed) {
    this.sprite = image;
    this.x = xPos;
    this.y = yPos;
    this.speed = xSpeed;
};

Sprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(xPos, yPos, xSpeed) {
    Sprite.call(this, 'images/enemy-bug.png', xPos, yPos, xSpeed);
};

Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var PLAYER_POSITIONS = [];
PLAYER_POSITIONS[0] = {x:0, y:-10};
PLAYER_POSITIONS[1] = {x:101, y:-10};
PLAYER_POSITIONS[2] = {x:202, y:-10}
PLAYER_POSITIONS[3] = {x:303, y:-10}
PLAYER_POSITIONS[4] = {x:404, y:-10}
PLAYER_POSITIONS[5] = {x:0, y:72}
PLAYER_POSITIONS[6] = {x:101, y:72}
PLAYER_POSITIONS[7] = {x:202, y:72}
PLAYER_POSITIONS[8] = {x:303, y:72}
PLAYER_POSITIONS[9] = {x:404, y:72}
PLAYER_POSITIONS[10] = {x:0, y:155}
PLAYER_POSITIONS[11] = {x:101, y:155}
PLAYER_POSITIONS[12] = {x:202, y:155}
PLAYER_POSITIONS[13] = {x:303, y:155}
PLAYER_POSITIONS[14] = {x:404, y:155}
PLAYER_POSITIONS[15] = {x:0, y:240}
PLAYER_POSITIONS[16] = {x:101, y:240}
PLAYER_POSITIONS[17] = {x:202, y:240}
PLAYER_POSITIONS[18] = {x:303, y:240}
PLAYER_POSITIONS[19] = {x:404, y:240}
PLAYER_POSITIONS[20] = {x:0, y:318}
PLAYER_POSITIONS[21] = {x:101, y:318}
PLAYER_POSITIONS[22] = {x:202, y:318}
PLAYER_POSITIONS[23] = {x:303, y:318}
PLAYER_POSITIONS[24] = {x:404, y:318}
PLAYER_POSITIONS[25] = {x:0, y:406}
PLAYER_POSITIONS[26] = {x:101, y:406}
PLAYER_POSITIONS[27] = {x:202, y:406}
PLAYER_POSITIONS[28] = {x:303, y:406}
PLAYER_POSITIONS[29] = {x:404, y:406}

var Player = function() {
    this.position = 27;
    Sprite.call(this, 'images/char-boy.png', 
            PLAYER_POSITIONS[this.position].x, 
            PLAYER_POSITIONS[this.position].y);
};

Player.prototype = Object.create(Sprite.prototype)
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    //do nothing
}

Player.prototype.handleInput = function(e) {
    if (e == 'left') {
        if ((player.position % 5) != 0) {
            player.position--;
            player.x = PLAYER_POSITIONS[player.position].x;    
        } else {
            console.log('Left border');
        }
    } else if (e == 'right') {
        if ((player.position % 5) != 4) {
            player.position++;
            player.x = PLAYER_POSITIONS[player.position].x;
        } else {
            console.log('Right border');
        }
    } else if (e == 'up') {
        if (player.position >= 5) {
            player.position -= 5;
            player.y = PLAYER_POSITIONS[player.position].y;
        } else {
            console.log('Top border');
        }        
    } else if (e == 'down') {
        if (player.position < 25) {
            player.position += 5;
            player.y = PLAYER_POSITIONS[player.position].y;            
        } else {
            console.log('Bottom border');
        }
    } else {
        console.log('Invalid direction')
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
allEnemies.push(new Enemy(0, ROW_HEIGHT * 1 - 20, random(50, 75)));


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
