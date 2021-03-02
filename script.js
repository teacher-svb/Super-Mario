let player = null;
let playerGravity = 0.4;
let playerFallSpeed = 0;
let playerIsOnFloor = false;
let playerFloorSensor = null;
let playerJumpCount = 0;

let playerScore = 0;


let walls = null;
let floors = null;

let enemies = null;

let coins = null;

function setup() { 
    createCanvas(500, 400);

    player = createSprite(300, 300, 50, 50);
    player.shapeColor = color('red');
    player.draw = DrawPlayer;

    playerFloorSensor = createSprite(player.position.x, player.position.y, 40, 10);
    playerFloorSensor.shapeColor = color('blue');
    playerFloorSensor.draw = DrawPlayerFloorSensor;
    
    floors = new Group();

    let floor = createSprite(250, height, 500, 50);
    floor.shapeColor = color('brown');
    floors.add(floor);

    floor = createSprite(850, height, 500, 50);
    floor.shapeColor = color('brown');
    floors.add(floor);

    floor = createSprite(1550, height, 500, 50);
    floor.shapeColor = color('brown');
    floors.add(floor);

    walls = new Group();

    let wall = createSprite(500, 200, 100, 50);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    wall = createSprite(475, 325, 50, 100);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    wall = createSprite(1525, 200, 100, 50);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    wall = createSprite(1500, 325, 50, 100);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    wall = createSprite(1025, 200, 100, 50);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    wall = createSprite(1000, 325, 50, 100);
    wall.shapeColor = color('FireBrick');
    walls.add(wall);

    enemies = new Group();

    let enemy = createSprite(750, 350, 50, 50);
    enemy.shapeColor = color('black');
    enemy["turnpointLeft"] = createVector(650, 350);
    enemy["turnpointRight"] = createVector(950, 350);
    enemy.setSpeed(1, 180);
    enemy.draw = DrawEnemy;
    enemies.add(enemy);

    coins = new Group();

    let coin = createSprite(400, 350, 25, 25);
    coin.shapeColor = color('gold');
    coin.draw = DrawCoin;
    coins.add(coin);
}

function DrawCoin() { 
    stroke('black');
    fill(this.shapeColor);
    circle(0, 0, this.width);
    
}

function DrawEnemy() { 
fill(this.shapeColor);

    rect(0, 0, this.width, this.height);

    let distanceToLeftTurnpoint = p5.Vector.dist(this.position, this.turnpointLeft);
    if (distanceToLeftTurnpoint < 5) { 
        this.setSpeed(1, 0);
            }

let distanceToRightTurnpoint = p5.Vector.dist(this.position, this.turnpointRight);
if (distanceToRightTurnpoint < 5) { 
this.setSpeed(1, 180);
}
}

for (let i = 0; i < 5; ++i) { 
    if (5 + 2 === 7) { 
        console.log("Hello World!");
    }
}

function DrawPlayerFloorSensor() {}

function DrawPlayer() { 
    fill(this.shapeColor);
    rect(0, 0, this.width, this.height);
    playerFloorSensor.position.x = this.position.x;
    playerFloorSensor.position.y = this.position.y + this.height / 2;
    
    
    playerFloorSensor.collide(enemies, RemoveEnemy);
    player.collide(enemies, GameOver);
    player.collide(coins, CollectCoin);
}

function CollectCoin(player, coin) { 
    coin.remove();
    playerScore++;
}

function RemoveEnemy(player, enemy) { 
    enemy.remove();
    playerFallSpeed = -5;
}

function GameOver() { 
    player.remove();
}

function draw() { 
    background('lightblue');

    textSize(32);
    text(playerScore, 10, 30);

    MoveCamera();

    DrawBackground();

    MovePlayer();

    drawSprites();
}

function DrawBackground() { 
    noStroke();
    DrawBackgroundTree(200, 150);
    DrawBackgroundTree(340, 180);
}

function DrawBackgroundTree(x, y) { 
    fill('brown');
    rect(x, y, 50, 1000);
    fill('green');
    circle(x, y, 50);
    circle(x + 50, y, 100);
}

function keyPressed() { 
    if (keyCode === UP_ARROW &&
        (playerIsOnFloor === true || playerJumpCount < 1)) {
        playerFallSpeed = -10;
        playerJumpCount++;
    }
}

function MoveCamera() { 
    let cameraPosition = createVector();
    cameraPosition.x = (player.position.x * -1) + (width / 2);
    cameraPosition.y = 0;
    translate(cameraPosition.x, cameraPosition.y);
}

function MovePlayer() { 
    playerIsOnFloor = false;
    player.collide(floors);
    player.collide(walls);

    playerFloorSensor.overlap(floors, LandedOnFloor);
    playerFloorSensor.overlap(walls, LandedOnFloor);

    playerFallSpeed += playerGravity;

    player.setSpeed(playerFallSpeed, 90);

    if (keyIsDown(LEFT_ARROW)) { 
        player.addSpeed(5, 180);
    }
    if (keyIsDown(RIGHT_ARROW)) { 
        player.addSpeed(5, 0);
    }
}

function LandedOnFloor() { 
    playerIsOnFloor = true;
    playerJumpCount = 0;
    if (playerFallSpeed > 0) { 
        playerFallSpeed = 0;
    }
}