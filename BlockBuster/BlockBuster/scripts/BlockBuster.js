class BlockBuster extends Phaser.Scene {
    constructor() {

        //Call super to inherit methods
        super("BlockBuster");
        
        //Data members
        var ball;
        var platform;
        var bricks;
        var score;
        var lives;
        var livesText;
        var scoreText;
        var pressToLaunchText;
        var ballLaunched;
        var bricksRemaining;
        var bricksRemainingText;
    }

    preload(){
    
        //Load assets for game
        this.load.image('platform', './assets/platform.png');
        this.load.image('ball', './assets/ball.png');
        this.load.image('background', './assets/background.png');
        this.load.image('brick', './assets/brick.png');    
    }
    
    
    create(){
    
        //Initialize variables
        this.ballLaunched = false;
        this.score = 0;
        this.lives = 3;
        this.bricksRemaining = 32;

        //Background image
        this.add.image(400, 300, 'background').setAlpha(.1);
        
        //Add static group for bricks
        this.bricks = this.physics.add.staticGroup({
            key: 'brick'
        });
    
        //Add brick objects
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 4; j++){
                
                // if(i == 6 && j == 3){
                //     this.bricks.create(i*100 + 50, j*50 + 25, 'brick');
                // }
                this.bricks.create(i*100 + 50, j*50 + 25, 'brick');
            }
        }
    
        //Add platform ("paddle")
        this.platform = this.physics.add.image(400,500, 'platform');
        this.platform.body.setAllowGravity(false);
        this.platform.setImmovable(true);
        this.platform.setCollideWorldBounds(true);
        
        //Add ball
        this.ball = this.physics.add.sprite(400, 400, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1,1);
        
        //Enable arrow key input
        this.cursors = this.input.keyboard.createCursorKeys();
    
        //Enable mouse click input -- on click invoke launchBall callback function
        this.input.on('pointerup', this.launchBall, this);
    
        //Add collider for ball and bricks -- call destroyBrick function on collision
        this.physics.add.collider(this.ball, this.bricks, this.destroyBrick, null, this);
    
        //Add score text, lives, and bricks remaining text
        this.scoreText = this.add.text(700,550, 'Score: 0')
        this.livesText = this.add.text(700, 575, 'Lives: 0',)
        this.bricksRemainingText = this.add.text(100, 550, 'Bricks: 40');
    
        //Add reminder text to click to launch
        this.pressToLaunchText = this.add.text(400, 300, 'Click to launch!', {
            font: "64px monospace",
            fill: "#00ff00",
    
        }).setOrigin(.5);

    }
    


    update(){

        //Update stat texts
        this.scoreText.text = 'Score: ' + this.score;
        this.livesText.text = 'Lives: ' + this.lives;
        this.bricksRemainingText.text = 'Bricks: ' + this.bricksRemaining;
    
    
        //Handle keyboard input for platform
        if(this.cursors.left.isDown){

            //Move left
            this.platform.setVelocityX(-300);
        }
        else if(this.cursors.right.isDown){
            
            //Move right
            this.platform.setVelocityX(300);
        }
        else{

            //No key is pressed -- don't move
            this.platform.setVelocityX(0);
        }
    

        //If ball isn't caught, call reset function
        if(this.ball.y > 550){
            this.resetBall();
        }
    

        //If player loses their lives, initiate game over sequence 
        if(this.lives <= 0){
            this.gameOver();
        }
        

        //If player destroys all the bricks, initiate game won sequence
        if(this.bricksRemaining <= 0 ){
            this.gameWon();
        }


        //Check for ball + platform collisions
        this.physics.collide(this.ball, this.platform);
        
    }
    

    //Remove brick from level and update stats
    destroyBrick(ball, brick){
        brick.disableBody(true, true);
        this.score += 10;
        this.bricksRemaining--;
    }
    
    //Launch the ball at game start or on ball reset
    launchBall(){
        if(!this.ballLaunched){
            this.ball.setVelocityX(250);
            this.ball.setVelocityY(-200);
        }
        
        this.ballLaunched = true;
        this.pressToLaunchText.visible = false;
    }
    
    //Reset ball to initial position and subtract a life
    resetBall(){
        
        this.ball.setX(400);
        this.ball.setY(400);
        this.ball.setVelocity(0);
        this.ballLaunched = false;
        this.pressToLaunchText.visible = true;
        this.lives--;
        
    }
    
    //Call GameOver scene
    gameOver(){
    
        this.scene.start('GameOver');

    }

    //Call GameWon scene
    gameWon(){
        this.scene.start('GameWon');
    }
}

