
import Inicio from "./scenes/Inicio.js";
import Escena1 from "./scenes/Escena1.js";
import Escena2 from "./scenes/Escena2.js";

import Perdiste from "./scenes/Perdiste.js";
import Win from "./scenes/Win.js";


//const puntaje = 0;

let config = {
    type: Phaser.AUTO,
    width: 1050,
    height: 680,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    //scene: [Play]
    scene:[Inicio,Escena1,Escena2,Perdiste, Win]
};

let game = new Phaser.Game(config);
