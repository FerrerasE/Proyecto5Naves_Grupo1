import Play from "./scenes/Play.js";


//const puntaje = 0;

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    //scene: [Play]
    scene:[Play]
};

let game = new Phaser.Game(config);
