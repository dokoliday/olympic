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



// Initialize Phaser, and create a 400px (width) by 490px (height) game
var game = new Phaser.Game(800, 890);

// Add the 'mainState' and call it 'main'

game.state.add("welcome", Welcome);

// Start the state to actually start the game
game.state.start("welcome");
