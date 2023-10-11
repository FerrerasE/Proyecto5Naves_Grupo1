class Play extends Phaser.Scene {
    constructor() {
        super("Play");
        this.control01 = false;
        this.puntaje = 0;
    }

    preload() {
        this.load.image('fondo', 'public/img/sky.png');
        this.load.image('red', 'public/img/red.png');
        this.load.spritesheet('nave', 'public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('enemy', 'public/img/enemy.png');
    }

    create() {
        this.add.image(400, 300, 'fondo');
        this.player = this.physics.add.sprite(100, 30, 'nave');
        this.enemigos = this.physics.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: this.generarEnemigo,
            callbackScope: this,
            repeat: 5
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
        }
    }

    generarEnemigo() {
        const enemigo = this.enemigos.create(
            800,
            Phaser.Math.Between(100, 500),
            'enemy'
        );

        enemigo.setVelocityX(-100);
    }

    playerEnemy(player, enemy) {
        // Cuando el jugador colisiona con un enemigo, finaliza el juego
        this.scene.start('GameOver');
    }
}

export default Play;


