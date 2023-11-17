class Win extends Phaser.Scene {
    constructor() {
        super("Win");
        this.score=0;
    }

    preload() {
        // Carga la imagen de fondo
        this.load.image('Win', '../public/img/Win.jpeg'); // Reemplaza '....' con la ruta correcta

    }



    create() {
       
        this.add.image(500, 403, 'Win').setScale(1.5); // las coordenadas y el nombre de la imagen

        //  botón de inicio
        const startButton = this.add.text(500, 50, 'Ganaste!!', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#FF0000', // Color de fondo del botón
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

export default Win;