class Perdiste extends Phaser.Scene {
    constructor() {
        super("Perdiste");
        this.score=0;
    }

    preload() {
        // Carga la imagen de fondo
        this.load.image('Perdiste', '../public/img/Perdiste.png'); // Reemplaza '....' con la ruta correcta

    }



    create() {
       
        this.add.image(525, 350, 'Perdiste').setScale(2.6); // las coordenadas y el nombre de la imagen

        //  botón de inicio
        const startButton = this.add.text(500, 50, 'No te rindas!!', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#008000', // Color de fondo del botón
            padding: { x: 20, y: 10 }, // Espaciado interno del botón
        });
        
        startButton.setOrigin(0.5); // Centra el botón en su posición
        startButton.setInteractive(); // Hace que el botón sea interactivo

        // un evento de clic para el botón
        startButton.on('pointerdown', () => {
            this.scene.start('Inicio'); // Inicia la escena principal cuando se hace clic
        });
    }
}

export default Perdiste;