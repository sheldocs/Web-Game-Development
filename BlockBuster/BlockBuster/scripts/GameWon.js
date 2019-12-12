/*Phaser Scene for Game Won screen */
class GameWon extends Phaser.Scene {
    constructor() {
        super("GameWon");
        var button;
        
    }

    preload(){

        //Load background asset
        this.load.image('background', './assets/background.png');
    }


    create(){

        //Create background
        this.add.image(400, 300, 'background').setAlpha(.1);

        //Add you won text
        this.add.text(400, 100, 'YOU WON!', {
            font: '64px monospace',
            fill: 'white'
        }).setOrigin(.5, .5);

        //Add button to play again -- calls startGame function on click event
        var button = this.add.text(400, 300, 'Click here to play again!', {
            font: '24px monospace',
            fill: '#00ff00'
        }).setInteractive().on('pointerdown', this.startGame, this).setOrigin(.5, .5);

        //Add (new content) disblaimer
        this.add.text(400, 350, '(new content coming soon!)', {
            font: '12px monospace',
            fill: 'white'
        }).setOrigin(.5, .5);
    }

    update(){
    }

    //Call the main scene with game logic
    startGame(){
        this.scene.start('BlockBuster');
    }
}

