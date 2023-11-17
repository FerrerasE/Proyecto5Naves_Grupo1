class Inicio extends Phaser.Scene {
    constructor() {
        super("Inicio");
        this.score=0;
    }

    preload() {
        // Carga la imagen de fondo
        this.load.image('menuI', '../public/img/Inicio.jpg'); // Reemplaza '....' con la ruta correcta

    }



    create() {
       
        this.add.image(400, 300, 'menuI').setScale(1.1); // las coordenadas y el nombre de la imagen

        //  botón de inicio
        const startButton = this.add.text(500, 30, 'Tomar vuelo', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#800080', // Color de fondo del botón
            padding: { x: 20, y: 10 }, // Espaciado interno del botón
        });
        
        startButton.setOrigin(0.5); // Centra el botón en su posición
        startButton.setInteractive(); // Hace que el botón sea interactivo

        // un evento de clic para el botón
        startButton.on('pointerdown', () => {
            this.scene.start('Escena1'); // Inicia la escena principal cuando se hace clic
        });
    }
}

export default Inicio;