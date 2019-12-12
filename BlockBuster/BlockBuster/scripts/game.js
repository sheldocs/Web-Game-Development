
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
    scene: [MainMenu, BlockBuster, GameOver, GameWon] //Scenes
};

var game = new Phaser.Game(config);
