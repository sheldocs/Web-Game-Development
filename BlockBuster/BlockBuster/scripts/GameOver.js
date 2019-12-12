/*Phaser Scene for Game Over screen */
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
        var button;
        var explosion;
        var platform;
    }

    preload(){

        //Load necessary assets for game over scene
        this.load.image('background', './assets/background.png');
        this.load.image('platform', './assets/platform.png');
        this.load.spritesheet('explosion', './assets/explosion_spritesheet.png', {frameWidth: 100, frameHeight: 100});
    }


    create(){

        //Add the background and platform (since it will explode)
        this.add.image(400, 300, 'background').setAlpha(.1);
        this.platform = this.physics.add.image(400,500, 'platform');

        //Add game over text
        this.add.text(400, 100, 'GAME OVER', {
            font: '64px monospace',
            fill: 'white'
        }).setOrigin(.5, .5);

        //Add a button to play again
        var button = this.add.text(400, 300, 'Click here to try again!', {
            font: '24px monospace',
            fill: '#00ff00'
        }).setInteractive().on('pointerdown', this.startGame, this).setOrigin(.5, .5);

        //Add the explosion sprite
        this.explosion = this.physics.add.sprite(400, 500, 'explosion');

        //Create the explosion animation using frames 0-36 of the spritesheet
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 36}),
            frameRate: 10
        })

        //Play explosion animation
        this.explosion.play('explode');
    }

    update(){
    }

    //Call main scene with game logic
    startGame(){
        this.scene.start('BlockBuster');
    }
}

