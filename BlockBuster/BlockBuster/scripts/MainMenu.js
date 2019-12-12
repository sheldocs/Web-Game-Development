/*Phaser Scene for Main Menu screen */
class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
        var button;
    }

    preload(){

        //Load background image
        this.load.image('background', './assets/background.png');
    }


    create(){

        //Add background
        this.add.image(400, 300, 'background').setAlpha(.1);

        //Add title text
        this.add.text(400, 100, 'Block Buster', {
            font: '64px monospace',
            fill: 'white'
        }).setOrigin(.5, .5);

        //Add 'button' to allow player to begin
        var button = this.add.text(400, 500, 'Click here to begin!', {
            font: '24px monospace',
            fill: '#00ff00'
        }).setInteractive().on('pointerdown', this.startGame, this).setOrigin(.5, .5);

    }

    update(){

    }

    //Call the main scene with game logic
    startGame(){
        this.scene.start('BlockBuster');
    }
}

