class Play extends Phaser.Scene {

    constructor() {
        super("Play");
        this.control01 = false;
        this.puntaje = 0;
    }

    preload() {
        this.load.image('fondo', '../public/img/sky.png');
        this.load.image('red', '../public/img/red.png');
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('proyectil', '../public/img/shoot.png');
    }

    create() {
        this.add.image(400, 300, 'fondo');
        this.player = this.physics.add.sprite(100, 30, 'nave');

        //this.player.setBounce(0.2);   cuidado 
        this.player.setCollideWorldBounds(true);
        // Crea un grupo de proyectiles
        this.proyectiles = this.physics.add.group();
         // Configura la tecla para disparar
         this.input.keyboard.on('keydown-SPACE', this.dispararProyectil, this);
        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'nave', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        let particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 210 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });



        particles.startFollow(this.player);


    }

    dispararProyectil() {
        const proyectil = this.physics.add.sprite(this.player.x, this.player.y, 'proyectil');
        
        // Configura la velocidad del proyectil para disparar hacia la derecha
        const velocidadX = 300; // Dispara hacia la derecha
        const velocidadY = 0; // No se mueve verticalmente

        proyectil.setVelocity(velocidadX, velocidadY);
        this.proyectiles.add(proyectil);
    }


    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-330);
            this.player.anims.play('up');
        } else if (this.cursors.down.isDown) { this.player.setVelocityY(200);
            this.player.anims.play('down'); }


    

        // Mueve los proyectiles
        this.proyectiles.getChildren().forEach((proyectil) => {
            // Configura la velocidad de los proyectiles para que sigan avanzando hacia la derecha
            proyectil.setVelocityX(300);
        });

        // Verifica si los proyectiles han salido de la pantalla y elimínalos
        this.proyectiles.getChildren().forEach((proyectil) => {
            if (proyectil.x > this.sys.game.config.width) {
                proyectil.destroy();
            }
        });
    }
}

export default Play;

