const startingame = {
    // load all what wee need for the game 
    preload: function () {
        game.load.image("plan", "assets/plane.png");
        game.load.image("Meteorite", "assets/abdou.png");
        game.load.image("fond", "assets/fond.jpg");
        game.load.image("fire", "assets/fire.png");
        game.load.image("missile", "assets/missile.png");
        game.load.image("galaxie", "assets/galaxie.jpg");
        game.load.image("sheep", "assets/sheep.png");
        game.load.image("meteorite", "assets/meteorite.png");
        game.load.image("again", "assets/again.png");
        game.load.image("caissemissile", "assets/caissemissile.png");
        game.load.image("caissebullet", "assets/caissebullet.png");
        game.load.image("Sheep2", "assets/Sheep2.png");
        game.load.image("Sheep3", "assets/Sheep3.png");
        game.load.image("Sheep4", "assets/Sheep4.png");
        game.load.image("life", "assets/life.png");


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

        music.play('', 0, 1, true);
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
        if(music){playAgain.onUp.add(this.playfunction, this)};


        // define the variables games 
        this.scoreText = game.add.bitmapText(300, 800, 'desyrel', 'score=0', 50);
        this.lifeText = game.add.bitmapText(580, 800, 'desyrel', 'life=3', 50);
        this.bulletText = game.add.bitmapText(20, 800, 'desyrel', 'bullet=20', 50);
        this.missileText = game.add.bitmapText(20, 730, 'desyrel', 'missile=5', 50);


        // define the events
        // millisecond;callback;environeent
        this.timer = game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.addOngroupOfMeteorites, this);
        this.totalscoreTimer = game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.point, this);
        this.addLifeTimer = game.time.events.loop(Phaser.Timer.SECOND * 15.5, this.addLifeOnGroupOfMeteorite, this);
        this.bulletTimer = game.time.events.loop(Phaser.Timer.SECOND * 15.5, this.addCaisseFireOngroupOfMeteorites, this);
        this.missileTimer = game.time.events.loop(Phaser.Timer.SECOND * 20, this.addCaisseMissileOngroupOfMeteorites, this);
        this.addOneSheep2Timer = game.time.events.loop(Phaser.Timer.SECOND * 9, this.addOneSheep2, this);
        this.addOneSheep3Timer = game.time.events.loop(Phaser.Timer.SECOND * 6, this.addOneSheep3, this);
        this.addOneSheep4Timer = game.time.events.loop(Phaser.Timer.SECOND * 14, this.addOneSheep4, this);


        // define groups
        this.groupOfMeteorites = game.add.group();
        this.groupOfBullet = game.add.group();
        this.groupOfMissiles = game.add.group();
        this.goupOfBulletBox = game.add.group();
        this.groupOfmissilebox = game.add.group();
        this.groupOflifeBox = game.add.group();
    },

    addOneSheep2: function () {
        //create sheep on background
        if (this.life != 0) {
            var spacing = Math.floor(Math.random() * 750);
            let Sheep2 = game.add.sprite(800, spacing, "Sheep2");
            game.physics.arcade.enable(Sheep2);
            Sheep2.body.gravity.x = -spacing;
            Sheep2.checkWorldBounds = true;
            Sheep2.outOfBoundsKill = true;
            Sheep2.width = spacing;
            Sheep2.height = spacing;
        }
    },
    addOneSheep3: function () {
        //create sheep on background
        if (this.life != 0) {
            var spacing = Math.floor(Math.random() * 750);
            let Sheep3 = game.add.sprite(-350, spacing, "Sheep3");
            game.physics.arcade.enable(Sheep3);
            Sheep3.body.gravity.x = spacing;
            Sheep3.checkWorldBounds = true;
            Sheep3.outOfBoundsKill = true;
            Sheep3.width = spacing;
            Sheep3.height = spacing;
        }
    },

    addOneSheep4: function () {
        //create sheep on background
        if (this.life != 0) {
            var spacing = Math.floor(Math.random() * 750);
            let Sheep4 = game.add.sprite(800, spacing, "Sheep4");
            game.physics.arcade.enable(Sheep4);
            Sheep4.body.gravity.x = -spacing;
            Sheep4.checkWorldBounds = true;
            Sheep4.outOfBoundsKill = true;
            Sheep4.width = spacing;
            Sheep4.height = spacing;
        }
    },

    update: function () {
        if (this.life != 0) {
            //scrolling the background
            this.galaxie.tilePosition.y += this.score / 10;
            // add a window to limit the movements of the aircraft in the size of the game screen
            if (this.plane.y < 0) this.plane.y = 0;
            if (this.plane.y > 800) this.plane.y = 800;
            if (this.plane.x < 0) this.plane.x = 0;
            if (this.plane.x > 750) this.plane.x = 750;
        }
        //manage the collisions
        game.physics.arcade.overlap(
            this.groupOfBullet, this.groupOfMeteorites, this.collision, null, this);
        game.physics.arcade.overlap(
            this.plane, this.groupOfMeteorites, this.collisionPlane, null, this);
        game.physics.arcade.overlap(
            this.groupOfMissiles, this.groupOfMeteorites, this.collision, null, this);
        game.physics.arcade.overlap(
            this.plane, this.goupOfBulletBox, this.addbullet, null, this);
        game.physics.arcade.overlap(
            this.plane, this.groupOfmissilebox, this.addmissile, null, this);
        game.physics.arcade.overlap(
            this.plane, this.groupOflifeBox, this.addExtraLife, null, this);
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






    addOneMeteorite: function (x, y) {
        //create Meteorites
        if (this.life != 0) {
            let Meteorite = game.add.sprite(x, y, "meteorite");
            this.groupOfMeteorites.add(Meteorite);
            game.physics.arcade.enable(Meteorite);
            Meteorite.body.gravity.y = x - 50;
            Meteorite.width = 80;
            Meteorite.height = 80;
            Meteorite.checkWorldBounds = true;
            Meteorite.outOfBoundsKill = true;
        }
    },

    addOngroupOfMeteorites: function () {
        //add Meteorites on the group and make the creation random
        for (var i = 0; i < 6; i++) {
            var spacing = Math.floor(Math.random() * 750);
            this.addOneMeteorite(spacing, 0);
        }
    },


    fire: function () {
        if ((this.bullet != 0) && (this.life != 0)) {
            //creating the fire balle from the plane

            let fire = game.add.sprite(this.plane.x, this.plane.y, "fire");
            this.groupOfBullet.add(fire)
            fireSong.play();
            game.physics.arcade.enable(fire);
            fire.body.gravity.y = -1120;
            this.bullet -= 1;
            this.bulletText.text = 'Bullets: ' + this.bullet;
        }
    },

    addOneCaisseFire: function (x, y) {
        if (this.life != 0) {
            let caisseFire = game.add.sprite(x, y, "caissebullet");
            this.goupOfBulletBox.add(caisseFire);
            game.physics.arcade.enable(caisseFire);
            caisseFire.body.gravity.y = 160;
            caisseFire.width = 60;
            caisseFire.height = 60;
            caisseFire.checkWorldBounds = true;
            caisseFire.outOfBoundsKill = true;
        }
    },

    addCaisseFireOngroupOfMeteorites: function () {
        var spacing = Math.floor(Math.random() * 750);
        this.addOneCaisseFire(spacing, 0);
    },

    addbullet: function (x, y) {
        //taking bullet boc add 10 bullets
        y.kill();
        this.bullet += 10;
        this.bulletText.text = 'Bullets: ' + this.bullet;
    },

    missile: function () {
        //create  6 missiles from the plane 3 by each way
        if ((this.caisseMissile != 0) && (this.life != 0)) {
            for (let i = 0; i <= 6; i++) {
                let missile = game.add.sprite(this.plane.x, this.plane.y, "missile");
                this.groupOfMissiles.add(missile)
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

    addOneCaisseMissile: function (x, y) {
        if (this.life != 0) {
            let caissaddmissile = game.add.sprite(x, y, "caissemissile");
            this.groupOfmissilebox.add(caissaddmissile);
            game.physics.arcade.enable(caissaddmissile);
            caissaddmissile.body.gravity.y = 160;
            caissaddmissile.width = 60;
            caissaddmissile.height = 60;
            caissaddmissile.checkWorldBounds = true;
            caissaddmissile.outOfBoundsKill = true;
        }
    },

    addCaisseMissileOngroupOfMeteorites: function () {
        var spacing = Math.floor(Math.random() * 750);
        this.addOneCaisseMissile(spacing, 0);
    },

    addmissile: function (x, y) {
        y.kill();
        this.caisseMissile += 3;
        this.missileText.text = 'missiles: ' + this.caisseMissile;
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
            if(music){music.destroy()};
            deadSong.play();
            gameover.play();
            this.playAgain
        }

    },
    addLife: function (x, y) {
        //create Meteorites
        if (this.life != 0) {
            let extraLife = game.add.sprite(x, y, "life");
            this.groupOflifeBox.add(extraLife);
            game.physics.arcade.enable(extraLife);
            extraLife.body.gravity.y = 160;
            extraLife.width = 60;
            extraLife.height = 60;
            extraLife.checkWorldBounds = true;
            extraLife.outOfBoundsKill = true;
        }
    },
    addLifeOnGroupOfMeteorite: function () {
        var spacing = Math.floor(Math.random() * 750);
        this.addLife(spacing, 0);
    },
    addExtraLife: function (x, y) {
        y.kill();
        this.life += 1;
        this.lifeText.text = 'life: ' + this.life;
    },
    playfunction: function () {
        // this function call the game component to initiate or restart

       if(music){music.destroy()};
        this.game.state.start("startingame");
    }


}

game.state.add("startingame", startingame);