// welcome is the homepage
const Welcome = {
    init: function () {
        // zoom and center game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    // bacgkround page and button image load
    preload: function () {
        game.load.image("first", "assets/FirstPage.jpeg");
        game.load.spritesheet("startbutton", "assets/startbutton.png");
        game.load.audio("intro", "assets/musics/olympic-intro.wav");

    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        first = game.add.tileSprite(0, 0, 1000, 1090, "first");
        intro = game.add.audio("intro");
        intro.play('', 0, 1, true);
        startbutton = game.add.button(game.world.centerX - 95, 750, 'startbutton', this.playfunction, this, 2, 1, 0);

    },
    playfunction: function () {
        // this function call the game component
        intro.destroy()
        this.game.state.start("startingame");
    }
};


const startingame = {
    // load all what wee need for the game 
    preload: function () {
        game.load.image("plan", "assets/plane.png");
        game.load.image("cloud", "assets/abdou.png");
        game.load.image("fond", "assets/fond.jpg");
        game.load.image("fire", "assets/fire.png");
        game.load.image("missile", "assets/missile.png");
        game.load.image("galaxie", "assets/galaxie.jpg");
        game.load.image("galaxie2", "assets/galaxie2.jpg");
        game.load.image("sheep", "assets/sheep.png");
        game.load.image("meteorite", "assets/meteorite.png");
        game.load.image("again", "assets/again.png");
        game.load.image("caissemissile", "assets/caissemissile.png")
        game.load.image("caissebullet", "assets/caissebullet.png")

        game.load.audio("theme", "assets/musics/olympic-back.wav");
        game.load.audio("firesong", "assets/musics/olympic-shoot.wav");
        game.load.audio("missileFire", "assets/musics/olympic-fire.wav");
        game.load.audio("explose", "assets/musics/olympic-explose.mp3");
        game.load.audio("deadSong", "assets/musics/olympic-dead.wav");
        game.load.audio("gameover", "assets/musics/olympic-gameover.wav");

        game.load.bitmapFont('desyrel', 'assets/desyrel-orange.png', 'assets/desyrel.xml');

    },


    create: function () {
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add audio piste
        fireSong = game.add.audio('firesong');
        missilefire = game.add.audio('missileFire');
        explose = game.add.audio('explose');
        deadSong = game.add.audio('deadSong');
        gameover = game.add.audio('gameover');
        music = game.add.audio('theme');



        // general background and musical theme

        this.galaxie = game.add.tileSprite(0, 0, 1000, 1090, "galaxie");
        music.play();

        // creating the principal avatar gamer
        //IMPORTANT!!! this two following lines must be rigth in this order and before add the avatar skills
        this.plane = game.add.sprite(300, 500, "sheep");
        game.physics.arcade.enable(this.plane);

        this.plane.width = 80;
        this.plane.height = 80;
        this.plane.body.gravity.y = 10;

        this.score = 0;
        this.life = 3;
        this.bullet = 20;
        this.caisseMissile = 5;




        // define the gameplay on the keyboard
        const upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.go, this);
        const downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(this.down, this);
        const right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(this.right, this);
        const left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(this.left, this);
        const missile = game.input.keyboard.addKey(Phaser.Keyboard.R);
        missile.onDown.add(this.missile, this);
        const fire = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fire.onDown.add(this.fire, this);
        const playAgain = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        playAgain.onUp.add(this.playfunction, this);


        // define the variables games 
        this.scoreText = game.add.bitmapText(300, 800, 'desyrel', 'score=0', 50);
        this.lifeText = game.add.bitmapText(580, 800, 'desyrel', 'life=3', 50);
        this.bulletText = game.add.bitmapText(20, 800, 'desyrel', 'bullet=20', 50);
        this.missileText = game.add.bitmapText(20, 730, 'desyrel', 'missile=5', 50);


        // define the events
        // millisecond;callback;environeent
        this.timer = game.time.events.loop(1500, this.addOnSky, this);
        this.totalscore = game.time.events.loop(250, this.point, this);
        this.addLife = game.time.events.loop(11500, this.addLife, this);
        this.bulletTimer = game.time.events.loop(15500, this.addCaisseFireOnSky, this);

        // define groups
        this.sky = game.add.group();
        this.bulletfire = game.add.group();
        this.army = game.add.group();
        this.space = game.add.group();

    },

    update: function () {
        if (this.life != 0) {
            //scrolling the background
            this.galaxie.tilePosition.y += 11;
            // add a window to limit the movements of the aircraft in the size of the game screen
            if (this.plane.y < 0) this.plane.y = 0;
            if (this.plane.y > 800) this.plane.y = 800;
            if (this.plane.x < 0) this.plane.x = 0;
            if (this.plane.x > 750) this.plane.x = 750;
        }
        //manage the collisions
        game.physics.arcade.overlap(
            this.bulletfire, this.sky, this.collision, null, this);
        game.physics.arcade.overlap(
            this.plane, this.sky, this.collisionPlane, null, this);
        game.physics.arcade.overlap(
            this.army, this.sky, this.collision, null, this);
        game.physics.arcade.overlap(
            this.plane, this.space, this.addbullet, null, this);


    },
    point: function () {
        //  Add and update the score
        if (this.life != 0) {
            this.score += 1;
            this.scoreText.text = 'Score: ' + this.score;
        }

    },

    Lifepoint: function (n) {
        //manage the life level
        if (this.life != 0) {
            this.life -= n;
            this.lifeText.text = 'life: ' + this.life;
        }
    },
    go: function () {
        // Add a vertical velocity to the plane
        this.plane.body.velocity.y = -200;
        this.plane.body.velocity.x = 0;
    },

    down: function () {
        // Add a vertical velocity to the plane
        this.plane.body.velocity.y = 300;
        this.plane.body.velocity.x = 0;
    },

    right: function () {
        // Add a vertical velocity to the plane
        this.plane.body.velocity.x = 300;

    },
    left: function () {
        // Add a vertical velocity to the plane
        this.plane.body.velocity.x = -300;
    },

    addLife: function () {
        if (this.life != 0)
            this.life += 1;
        this.lifeText.text = 'life: ' + this.life;
    },

    addOneCloud: function (x, y) {
        //create clouds
        if (this.life != 0) {
            let cloud = game.add.sprite(x, y, "meteorite");
            this.sky.add(cloud);
            game.physics.arcade.enable(cloud);
            cloud.body.gravity.y = x - 50;
            cloud.width = 80;
            cloud.height = 80;
            cloud.checkWorldBounds = true;
            cloud.outOfBoundsKill = true;
        }
    },

    addOnSky: function () {
        //add clouds on the group and make the creation random
        for (var i = 0; i < 6; i++) {
            var hole = Math.floor(Math.random() * 750);
            this.addOneCloud(hole, 0);
        }
    },

    fire: function () {
        if ((this.bullet != 0) && (this.life != 0)) {
            //creating the fire balle from the plane

            let fire = game.add.sprite(this.plane.x, this.plane.y, "fire");
            this.bulletfire.add(fire)
            fireSong.play();
            game.physics.arcade.enable(fire);
            fire.body.gravity.y = -420;
            this.bullet -= 1;
            this.bulletText.text = 'Bullets: ' + this.bullet;
        }
    },

    addOneCaisseFire: function (x, y) {
        //create clouds
        if (this.life != 0) {
            let caisseFire = game.add.sprite(x, y, "caissebullet");
            this.space.add(caisseFire);
            game.physics.arcade.enable(caisseFire);
            caisseFire.body.gravity.y = 160;
            caisseFire.width = 60;
            caisseFire.height = 60;
            caisseFire.checkWorldBounds = true;
            caisseFire.outOfBoundsKill = true;
        }
    },

    addCaisseFireOnSky: function () {
        //add clouds on the group and make the creation random
        var hole = Math.floor(Math.random() * 750);
        this.addOneCaisseFire(hole, 0);
    },

    addbullet: function (x,y) {
        y.kill();
        this.bullet += 20;
        this.bulletText.text = 'Bullets: ' + this.bullet;
    },

    missile: function () {
        //create  6 missiles from the plane 3 by each way
        if ((this.caisseMissile != 0) && (this.life != 0)) {
            for (let i = 0; i <= 6; i++) {
                let missile = game.add.sprite(this.plane.x, this.plane.y, "missile");
                this.army.add(missile)
                game.physics.arcade.enable(missile);
                if (i % 2 != 0) {
                    missile.body.gravity.y = -470 - 20 * i;
                    missile.body.gravity.x = 80 + 30 * i;
                } else {
                    missile.body.gravity.y = -470 - 20 * i;
                    missile.body.gravity.x = -80 - 30 * i;
                }
            }
            missilefire.play();
            this.caisseMissile -= 1;
            this.missileText.text = 'missiles: ' + this.caisseMissile;

        }
    },

    collision: function (x, y) {
        // kill destroy the sprites
        x.kill();
        y.kill();
        explose.play();
    },
    collisionPlane: function (x, y) {
        //  if plane alive just kill the meteorite
        if (this.life > 1) {
            y.kill();
            explose.play();
            this.plane.body.velocity.y = 700;
        } if (this.life > 0) {
            this.Lifepoint(1);
        } else {
            x.kill();
            y.kill();
            this.again = game.add.sprite(80, 100, "again");
            music.destroy();
            deadSong.play();
            gameover.play();
            this.playAgain
        }
    },

    playfunction: function () {
        // this function call the game component to initiate or restart
        this.game.state.start("startingame");
    }
}
// Initialize Phaser, and create a 400px (width) by 490px (height) game
var game = new Phaser.Game(800, 890);

// Add the 'mainState' and call it 'main'
game.state.add("startingame", startingame);
game.state.add("welcome", Welcome);

// Start the state to actually start the game
game.state.start("welcome");
