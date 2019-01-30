const mainState = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function () {
        game.load.image("plan", "assets/plane.png");
        game.load.image("cloud", "assets/abdou.png");
        game.load.image("fond", "assets/fond.jpg");
        game.load.image("fire", "assets/fire.png");
        game.load.image("missile", "assets/missile.png");
        game.load.image("galaxie", "assets/galaxie.jpg");
        game.load.image("sheep", "assets/sheep.png");
        game.load.image("meteorite", "assets/meteorite.png");
        game.load.image("again","assets/again.jpeg")

        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Change the background color of the game to blue
    },
    create: function () {
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);


        this.galaxie = game.add.tileSprite(0, 0, 1000, 1090, "galaxie");

        // Display the plane at the position x=100 and y=245
        this.plane = game.add.sprite(100, 245, "sheep");
        this.plane.width = 80;
        this.plane.height = 80;
        // Add physics to the plane
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.plane);

        this.plane.body.gravity.y = 10;

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
        playAgain.onUp.add(this.playAgain, this);


        this.timer = game.time.events.loop(1500, this.addOnSky, this);

        this.sky = game.add.group();
        this.bullet = game.add.group();
        this.army = game.add.group();


    },

    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic


        this.galaxie.tilePosition.y += 7;


        // add a window to limit the movements of the aircraft in the size of the game screen
        if (this.plane.y < 0) this.plane.y = 0;
        if (this.plane.y > 840) this.plane.y = 840;
        if (this.plane.x < 0) this.plane.x = 0;
        if (this.plane.x > 750) this.plane.x = 750;

        game.physics.arcade.overlap(
            this.bullet, this.sky, this.collision, null, this);
        game.physics.arcade.overlap(
            this.plane, this.sky, this.collisionPlane, null, this);
        game.physics.arcade.overlap(
            this.army, this.sky, this.collision, null, this);

    },




    go: function () {
        // if (this.plane.alive == false) return

        // Add a vertical velocity to the plane
        this.plane.body.velocity.y = -150;
        this.plane.body.velocity.x = 0;
    },

    down: function () {
        // if (this.plane.alive == false) return;

        // Add a vertical velocity to the plane
        this.plane.body.velocity.y = 150;
        this.plane.body.velocity.x = 0;
    },

    right: function () {
        // if (this.plane.alive == false) return;


        // Add a vertical velocity to the plane
        this.plane.body.velocity.x = 350;
    },
    left: function () {
        // if (this.plane.alive == false) return;


        // Add a vertical velocity to the plane
        this.plane.body.velocity.x = -350;
    },


    addOneCloud: function (x, y) {
        // let cloud = game.add.sprite(x, y, "meteorite");
        // this.sky.add(cloud);
        // game.physics.arcade.enable(cloud);
        // cloud.body.gravity.y = x;
        // cloud.checkWorldBounds = true;
        // cloud.outOfBoundsKill = true;

        let cloud = game.add.sprite(x, y, "meteorite");
        this.sky.add(cloud);
        game.physics.arcade.enable(cloud);
        cloud.body.gravity.y = x;
        cloud.width = 80;
        cloud.height = 80;
        cloud.checkWorldBounds = true;
        cloud.outOfBoundsKill = true;

    },

    addOnSky: function () {

        for (var i = 0; i < 6; i++) {
            var hole = Math.floor(Math.random() * 750);
            this.addOneCloud(hole, 0);

        }
    },


    fire: function () {
        let fire = game.add.sprite(this.plane.x, this.plane.y, "fire");
        this.bullet.add(fire)
        game.physics.arcade.enable(fire);
        fire.body.gravity.y = -1300;
        fire.checkWorldBounds = true;
        fire.outOfBoundsKill = true;
    },

    missile: function () {

        for (let i = 0; i < 2; i++) {
            let missile = game.add.sprite(this.plane.x, this.plane.y, "missile");
            this.army.add(missile)
            game.physics.arcade.enable(missile);
            if (i % 2 === 0) {

                missile.body.gravity.y = -1800;
                missile.body.gravity.x = 800;

            } else {
                missile.body.gravity.y = -1800;
                missile.body.gravity.x = -800;
            }

            missile.checkWorldBounds = true;
            missile.outOfBoundsKill = true;


        }
    },

    collision: function (x, y) {
        // let cloud = game.add.sprite(x,y,"cloud");
        // game.physics.arcade.enable(cloud);
        // cloud.body.gravity.y=-2000;
        x.kill();
        y.kill();


    },
    collisionPlane: function (x, y) {
        // let cloud = game.add.sprite(x,y,"cloud");
        // game.physics.arcade.enable(cloud);
        // cloud.body.gravity.y=-2000;
        x.kill();
        y.kill();
        game.time.events.remove(this.timer);
        this.playAgain;

    },
    playAgain:function(){
        game.time.events.remove(this.timer),
        game.state.start("main");
    }
}





// Initialize Phaser, and create a 400px (width) by 490px (height) game
var game = new Phaser.Game(800, 890);

// Add the 'mainState' and call it 'main'
game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main");
