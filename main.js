const mainState = {
   
    preload: function () {


        game.load.image("plane", "assets/plane.png");
        game.load.image("cloud", "assets/cloud.png");
        game.load.image("fond", "assets/fond.jpg");
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Change the background color of the game to blue

    },
    create: function () {

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);


         this.clouds = game.add.group();

         game.add.image(0, 0, `fond`);

        // Display the plane at the position x=100 and y=245
        this.plane = game.add.sprite(100, 245, "plane");

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

        // const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.add(this.go, this);
        // const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.add(this.go, this);
        // const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.add(this.go, this);
         this.timer = game.time.events.loop(2500, this.addOnePipe, this);
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
    addOnePipe: function (x, y) {
        let hole = Math.floor(Math.random() * 750)
        console.log("tutu");
        this.cloud = game.add.sprite(hole,0, "cloud");
        this.cloud2 = game.add.sprite(120,0, "cloud");
        game.physics.arcade.enable([this.cloud,this.cloud2]);
        this.cloud.body.gravity.y=200;
        this.cloud2.body.gravity.y=100;
    }}

// Initialize Phaser, and create a 400px (width) by 490px (height) game
var game = new Phaser.Game(800, 890);

// Add the 'mainState' and call it 'main'
game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main")

