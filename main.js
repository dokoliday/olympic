const mainState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    game.load.image("plane", "assets/plane.png");
    game.load.image("cloud", "assets/cloud.png");
    game.load.image("fond", "assets/fond.jpg");
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.

    // Change the background color of the game to blue
  },
  create: function() {
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.clouds = game.add.group();

    this.fond = game.add.tileSprite(0, 0, 800, 890, "fond");

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

    this.timer = game.time.events.loop(5500, this.addOnePipe, this);
  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic

    this.fond.tilePosition.y += 2;

    // add a window to limit the movements of the aircraft in the size of the game screen
    if (this.plane.y < 0) this.plane.y = 0;
    if (this.plane.y > 840) this.plane.y = 840;
    if (this.plane.x < 0) this.plane.x = 0;
    if (this.plane.x > 750) this.plane.x = 750;
  },

  go: function() {
    // if (this.plane.alive == false) return

    // Add a vertical velocity to the plane
    this.plane.body.velocity.y = -150;
    this.plane.body.velocity.x = 0;
  },

  down: function() {
    // if (this.plane.alive == false) return;

    // Add a vertical velocity to the plane
    this.plane.body.velocity.y = 150;
    this.plane.body.velocity.x = 0;
  },

  right: function() {
    // if (this.plane.alive == false) return;

    // Add a vertical velocity to the plane
    this.plane.body.velocity.x = 350;
  },
  left: function() {
    // if (this.plane.alive == false) return;

    // Add a vertical velocity to the plane
    this.plane.body.velocity.x = -350;
  },

  addOnePipe: function(x, y) {
    console.log("tutu");
  }
};

// Initialize Phaser, and create a 400px (width) by 490px (height) game
var game = new Phaser.Game(800, 890);

// Add the 'mainState' and call it 'main'
game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main");
