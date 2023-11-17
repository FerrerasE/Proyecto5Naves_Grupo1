class Escena1 extends Phaser.Scene {
    constructor() {
        super("Escena1");
        this.control01 = false;
        this.score = 0;
    }

    preload() {
        this.load.image('fondo', 'public/img/sky.png');
        this.load.image('red', 'public/img/red.png');
        this.load.spritesheet('nave', 'public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('enemigo', 'public/img/enemy.png');
        this.load.image('disparos', 'public/img/shoot.png');  
    }

    create() {
        this.add.image(525, 400, 'fondo').setScale(1.5);
        this.player = this.physics.add.sprite(100, 30, 'nave');
        this.enemigos = this.physics.add.group();
        
        this.disparos = this.physics.add.group(); // gestiona los disparos
        
        this.input.keyboard.on('keydown-SPACE', this.disparar, this); //La tecla para disparar
        
        

        this.time.addEvent({
            delay: 1000,
            callback: this.generarEnemigo,
            callbackScope: this,
            repeat: -1
        });


        

        this.player.setCollideWorldBounds(true);

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

        // Configura la colisión entre el jugador y los enemigos
        this.physics.add.collider(this.player, this.enemigos, this.playerEnemy, null, this);

        //Para controlar el puntaje
       this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000000' });

       //controles para jugar
       this.controlText = this.add.text(16, 50, 'te muevas con ← ↑ → ↓ y disparas con la barra espaciadora', { fontSize: '16px', fill: '#000000' });

       // Configura la colisión entre los disparos y los enemigos
       this.physics.add.collider(this.disparos, this.enemigos, this.disparoEnemigo, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-330);
            this.player.anims.play('up');
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down');
        } else {
            this.player.setVelocityY(0);
            this.player.anims.play('turn');
        }
    }

    generarEnemigo() {
        const enemigo = this.enemigos.create(
            1050,
            Phaser.Math.Between(20, 580),
            'enemigo'
        );

        enemigo.setVelocityX(-300);
    }

    

    playerEnemy(player, enemigo) {
        // Cuando el jugador colisiona con un enemigo, finaliza el juego
        this.scene.start('Perdiste');
        this.score = 0;
    }

    //disparar con el personaje
    disparar() {
      const disparo = this.disparos.create(this.player.x, this.player.y, 'disparos');
       disparo.setVelocity(300, 0); // Ajusta la velocidad del disparo
    }
     
    // si el disparo choca con el enemigo, ambos se eliminan
    disparoEnemigo(disparo, enemy) {
        // Cuando un disparo colisiona con un enemigo, destruye ambos
       disparo.destroy();
        enemy.destroy();
        this.score += 20;
        this.scoreText.setText('Puntaje: ' + this.score);

        //para pasar al otro nivel
        if (this.score == 200) {
            this.scene.start('Escena2');
            this.score = 0;
            
         }
    }
}



export default Escena1;


