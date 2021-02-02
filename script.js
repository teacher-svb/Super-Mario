let floor = null;

let player = null;
let playerGravity = 0.1;
let playerFallSpeed = 0;

let walls = null;

function setup() { 
    createCanvas(800, 400);

    player = createSprite(300, 300, 50, 50);
    player.shapeColor = color('red');

    floor = createSprite(width/2, height, width, 50);
    floor.shapeColor = color('brown');

    walls = new Group();

    let wall = createSprite(200, 200, 50, 50);
    wall.shapeColor = color('gold');
    walls.add(wall);

    wall = createSprite(250, 200, 50, 50);
    wall.shapeColor = color('gold');
    walls.add(wall);

    wall = createSprite(200, 300, 50, 50);
    wall.shapeColor = color('gold');
    walls.add(wall);

    wall = createSprite(200, 350, 50, 50);
    wall.shapeColor = color('gold');
    walls.add(wall);
}

function draw() { 
    background('lightblue');

    player.collide(floor);
    player.collide(walls, ResetFallSpeed);

    MovePlayer();

    drawSprites();
}

function ResetFallSpeed() { 
    playerFallSpeed = 0;
}

function MovePlayer() { 
    playerFallSpeed += playerGravity;

    player.setSpeed(playerFallSpeed, 90);

    if (keyIsDown(LEFT_ARROW)) { 
        player.addSpeed(5, 180);
    }
    if (keyIsDown(RIGHT_ARROW)) { 
        player.addSpeed(5, 0);
    }
    if (keyIsDown(UP_ARROW)) { 
        playerFallSpeed = -5;
    }
}