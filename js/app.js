var CANVAS_HEIGHT = 606;
var CANVAS_WIDTH = 505;

var COL_WIDTH = CANVAS_WIDTH / 5;
var ROW_HEIGHT = (CANVAS_HEIGHT - 70) / 6;

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

    if (this.x >= CANVAS_WIDTH) {
        this.x = 0;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.position = 27;
    Sprite.call(this, 'images/char-boy.png', 
            PLAYER_POSITIONS[this.position].x, 
            PLAYER_POSITIONS[this.position].y);
    this.level = 1;
    this.score = 0;
};

Player.prototype = Object.create(Sprite.prototype)
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    //do nothing
}

Player.prototype.setPosition = function(pos) {
    this.position = pos;
    this.x = PLAYER_POSITIONS[this.position].x;
    this.y = PLAYER_POSITIONS[this.position].y;
}

Player.prototype.reset = function() {
    this.setPosition(27);
}

Player.prototype.updateLevel = function() {
    this.level++;
}

Player.prototype.updateScore = function() {
    this.score += 10;
}

Player.prototype.handleInput = function(e) {
    if (e == 'left') {
        if ((this.position % 5) != 0) {
            this.position--;
            this.setPosition(this.position)
        } else {
            console.log('Left border');
        }
    } else if (e == 'right') {
        if ((this.position % 5) != 4) {
            this.position++;
            this.setPosition(this.position);
        } else {
            console.log('Right border');
        }
    } else if (e == 'up') {
        if (this.position >= 5) {
            this.position -= 5;
            this.setPosition(this.position);
        } else {
            console.log('Top border');
        }
    } else if (e == 'down') {
        if (this.position < 25) {
            this.position += 5;
            this.setPosition(this.position);
        } else {
            console.log('Bottom border');
        }
    } else {
        console.log('Invalid direction')
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
});

var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if (Math.abs(player.x - enemy.x) <= COL_WIDTH/2 &&
            Math.abs(player.y - enemy.y) <= ROW_HEIGHT/2) {
            if (player.score > 0) {
                player.score = 0.90 * player.score;
            }
            gameReset();
        }
    })
}

var checkLevelComplete = function() {
    if (player.position < 5) {
        player.updateScore();
        player.updateLevel();
        gameReset();
    }
}

var displayStats = function() {
    var context = this.ctx;
    context.fillStyle = "white";
    context.font = "16px Consolas";
    var levelText = "Level : " + player.level;
    context.fillText(levelText, 10, 75);

    var scoreText = "Score: " + Math.floor(player.score);
    context.fillText(scoreText, 410, 75);
}

var gameInit = function() {
    this.player = new Player();
    this.allEnemies = [];
}

ENEMY_ROWS = [];
ENEMY_ROWS[0] = ROW_HEIGHT * 1 - 25;
ENEMY_ROWS[1] = ROW_HEIGHT * 2 - 35;
ENEMY_ROWS[2] = ROW_HEIGHT * 3 - 40;

var getRandomSpeed = function(level) {
    var speed = random(25, 50) * level;
    if (speed > 300) {
        speed = 300 - random(25, 75);
    }
    return speed;
}

var getRandomRow = function() {
    var row = random(0, 3);
    return Math.floor(row % 3);
}

var gameReset = function() {
    this.player.reset();
    this.allEnemies = [];

    var level = player.level;
    if (level > 5) {
        level = 5;
    }

    for (var i=0; i<level; ++i) {
        var row = getRandomRow();
        var speed = getRandomSpeed(player.level)
        console.log('Row : ' + row + ' speed : ' + speed + ' level : ' + player.level)
        this.allEnemies.push(new Enemy(random(-500, -0), ENEMY_ROWS[row], speed));
    };
}

gameInit();
gameReset();
