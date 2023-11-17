class Escena2 extends Phaser.Scene {
    constructor() {
        super("Escena2");
        this.control01 = false;
        this.score = 200;
    }

    preload() {
        this.load.image('fondo', 'public/img/sky.png');
        this.load.image('espacio', 'public/img/Espacio.png');
        this.load.image('red', 'public/img/red.png');
        this.load.spritesheet('nave', 'public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('enemy', 'public/img/Enemigo2.png');
        this.load.image('disparos', 'public/img/shoot.png');
        this.load.image('power', 'public/img/powerUp.png');  
    }

    create() {
        this.add.image(400, 300, 'espacio').setScale(1);
        this.player = this.physics.add.sprite(100, 30, 'nave');
        this.enemigos = this.physics.add.group();
        this.disparos = this.physics.add.group(); // gestiona los disparos
        this.power = this.physics.add.sprite(500,500,'power').setScale(0.1); // creamos el powerUp
        this.activatePower = false; //variable booleana que es un activador del powerUp
        
        this.input.keyboard.on('keydown-SPACE', this.disparar, this); //La tecla para disparar
        this.player.setCollideWorldBounds(true);// collision del jugador con los limites del juego
        this.power.setCollideWorldBounds(true);// // collision del jugador con los limites del juego


        //este time es para que los enemigos se agreguen de forma infinita cada 1 segundo
        this.time.addEvent({
            delay: 1000,
            callback: this.generarEnemigo,
            callbackScope: this,
            repeat: -1
        });

         //este time es para agregar una vez el power Up
        this.time.addEvent({
            delay: 1000,
            callback: this.movePower,
            callbackScope: this,
            repeat: 0
        });

        //this.player.setCollideWorldBounds(true);

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

        this.cursors = this.input.keyboard.createCursorKeys(); // permite usar las flechas del teclado

        let particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 210 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        particles.startFollow(this.player);// permite compartir la posicion del jugador con la posicion de las particulas

        // Configura la colisión entre el jugador y los enemigos
        this.physics.add.collider(this.player, this.enemigos, this.playerEnemy, null, this);

        // Configura la colisión entre los disparos y los enemigos
        this.physics.add.collider(this.disparos, this.enemigos, this.disparoEnemigo, null, this);

        //colision entre el powerUp y el jugador
        this.physics.add.collider(this.player, this.power, this.playerPower, null, this);

        //this.physics.add.collider(this.stars, screen.width);
        //this.physics.add.collider(this.stars, screen.height);



        //Para controlar el puntaje
       this.scoreText = this.add.text(16, 16, 'Puntaje: 200', { fontSize: '32px', fill: '#FFFFFF' });
       
       //this.power.setVelocity(Phaser.Math.Between(-100, 100));
       /**if (this.power.positionX <= 0) {
        this.power.setVelocityX(Phaser.Math.Between(-100, 100));
    } else if (this.power.positionX >= 300) {
        this.power.setVelocityX(Phaser.Math.Between(-100, 100));
    }*/


    }

    update() {
        //this.physics.world.collide(this.power);

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

    movePower(){
        this.power.setVelocityX(-200,200);
        this.power.setVelocityY(-100,100);
        this.power.setBounce(1);
    }

    playerPower(player, power){
        
        power.disableBody(true, true);
        this.activatePower = true;
    }

    generarEnemigo() {
        const enemigo = this.enemigos.create(
            1100,
            Phaser.Math.Between(20, 1000),
            'enemy'
        ).setScale(0.2);

        enemigo.setVelocityX(-600);
    }

    

    playerEnemy(player, enemy) {
        // Cuando el jugador colisiona con un enemigo, finaliza el juego
        this.score = 200;
        this.scene.start('Perdiste');

    }

    

    
    disparar() {
        const disparo = this.disparos.create(this.player.x, this.player.y, 'disparos');
        disparo.setVelocity(300, 0); // Ajusta la velocidad del disparo

        if (this.activatePower == true) {
            const disparo2 = this.disparos.create(this.player.x, this.player.y, 'disparos');
        const disparo3 = this.disparos.create(this.player.x, this.player.y, 'disparos');
        disparo2.setVelocity(300, -40); // Ajusta la velocidad del disparo
        disparo3.setVelocity(300, +40); // Ajusta la velocidad del disparo
        }

        
    }

    disparoEnemigo(disparo, enemy) {
        // Cuando un disparo colisiona con un enemigo, destruye ambos
        disparo.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Puntaje: ' + this.score);
        
        //para pasar al otro nivel
    if (this.score == 400) {
        this.scene.start('Win');
        this.score = 200;
        
     }  
    }

    disparoEnemigo2(disparo2, enemy) {
        // Cuando un disparo colisiona con un enemigo, destruye ambos
        disparo2.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Puntaje: ' + this.score);
    }

    disparoEnemigo3(disparo3, enemy) {
        // Cuando un disparo colisiona con un enemigo, destruye ambos
        disparo3.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Puntaje: ' + this.score);
    }

    


}




export default Escena2;