
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload(){
    
    this.load.image('platform', './assets/platform.png');
    this.load.image('ball', './assets/ball.png');
    this.load.image('background', './assets/background.png');
    this.load.image('brick', './assets/brick.png');
    
}

var ball;
var platform;
var bricks;

var score;
var lives;
var livesText;
var scoreText;
var pressToLaunchText;
var gameOverText;

var ballLaunched;

var bricksRemaining;
var bricksRemainingText;

var debugText;

function create(){
    //game.physics.startSystem(Phaser.Physics.ARCADE)

    ballLaunched = false;

    this.add.image(400, 300, 'background').setAlpha(.1);
    
    bricks = this.physics.add.staticGroup({
        key: 'brick'
    });

    //Add brick objects
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 4; j++){
            
           bricks.create(i*100 + 50, j*50 + 25, 'brick');
        }
    }
    //this.add.image(100,100,'brick');

    platform = this.physics.add.image(400,500, 'platform');
    platform.body.setAllowGravity(false);
    platform.setImmovable(true);
    
    ball = this.physics.add.sprite(400, 400, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);

                    //this.physics.world.setBoundsCollision(true, true, true ,false);
    
    cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerup', launchBall);

    // ball.setVelocityY(200);
    // ball.setVelocityX(250);

    this.physics.add.collider(ball, bricks, destroyBrick,null, this);

    score = 0;
    lives = 3;

    scoreText = this.add.text(700,550, 'Score: 0',{

    })

    livesText = this.add.text(700, 575, 'Lives: 0', {

    })

    pressToLaunchText = this.add.text(400, 300, 'Press space to launch!', {
        font: "64px monospace",
        fill: "#00ff00",

    }).setOrigin(.5);

    gameOverText = this.add.text(400, 300, 'Game Over!', {
        font: "64px monospace",
        fill: "#ff0000",

    }).setOrigin(.5);

    debugText = this.add.text(700, 400, 'X: \n Y: ', {
        font: "12px monospace",
        fill: "#00ff00",
    }).setOrigin(.5);

    bricksRemainingText = this.add.text(100, 550, 'Bricks: 40');

    gameOverText.visible = false;

    bricksRemaining = 32;
    
    
}
function update(){


    scoreText.text = 'Score: ' + score;
    livesText.text = 'Lives: ' + lives;
    bricksRemainingText.text = 'Bricks: ' + bricksRemaining;

    debugText.text = 'X:' + ball.x + '\n Y: ' + ball.y;

    if(cursors.left.isDown){
        platform.setVelocityX(-300);
    }
    else if(cursors.right.isDown){
        platform.setVelocityX(300);
    }
    else{
        platform.setVelocityX(0);
    }

    if(ball.y > 550){
        resetBall();
    }

    if(lives <= 0){
        gameOver();
    }

    this.physics.collide(ball, platform);
    //this.physics.collide(bricks, ball);
}

function destroyBrick(ball, brick){
    brick.disableBody(true, true);
    score += 10;
    bricksRemaining--;
}

function launchBall(){
    if(!ballLaunched){
        ball.setVelocityX(250);
        ball.setVelocityY(-200);
    }
    
    ballLaunched = true;
    pressToLaunchText.visible = false;
}

function resetBall(){
    
    ball.setX(400);
    ball.setY(400);
    ball.setVelocity(0);
    ballLaunched = false;
    pressToLaunchText.visible = true;
    lives--;
}

function gameOver(){

    gameOverText.visible = true;
    pressToLaunchText.visible = false;
}