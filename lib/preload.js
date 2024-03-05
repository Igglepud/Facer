export class preloadScene extends Phaser.Scene{
  constructor(config) {
    super("Preload");
  }
init = function () {};

preload = function () {

  this.load.image("phaser", "assets/phaser.png");

  //loading box
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
  progressBox.y = this.sys.game.config.width / 2;
  progressBox.x = this.sys.game.config.height / 2;

  //create loading screen
  this.load.on("progress", function (value) {
    console.log(value);
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });

  this.load.on("fileprogress", function (file) {
    console.log(file.src);
  });

  this.load.on("complete", function () {
    console.log("complete");
    progressBar.destroy();
    progressBox.destroy();
  });

  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  this.loadingText = this.add.text(width / 2, height / 2, "Loading...", {
    fontSize: 144,
    fontFamily: "candyshop",
  });
  this.loadingText.setOrigin(0.5, 0.5);

  this.loadingText.setStroke("#ffffff", 8);
  //  Apply the gradient fill.
  let gradient = this.loadingText.context.createLinearGradient(
    0,
    0,
    0,
    this.loadingText.height
  );

  gradient.addColorStop(0, "#9C4F96");
  gradient.addColorStop(0.16, "#FF6355");
  gradient.addColorStop(0.32, "#FBA949");
  gradient.addColorStop(0.48, "#FAE442");
  gradient.addColorStop(0.64, "#8BD448");
  gradient.addColorStop(0.82, "#2AA8F2");

  this.loadingText.setFill(gradient);
  this.loadingText.setShadow(10, 10, "rgba(255,255,255,0.5)", 0);

  this.load.image("sparkle", "assets/sparkle.png");
  this.load.image("star", "assets/star.png");
  this.load.spritesheet("confetti", "assets/confetti.png", {
    frameWidth: 40,
    frameHeight: 40,
    endFrame: 3,
  });

  this.load.audio("music", "assets/music.wav");
  this.load.audio("ching", "assets/ching.wav");
  this.load.audio("wrong", "assets/wrong.wav");
  this.load.audio("match", "assets/match.wav");
  this.load.audio("victory", "assets/victory.wav");
};
// create after preload
create = function () {


  this.winEmitterTimer = this.time.addEvent({
    delay: 3000,
    repeat: 0,
    callback: function () {
      this.sys.displayList.shutdown();

      this.scene.start("Shuffler");
    },
    callbackScope: this,
  });

 

};
//make everything actually happen
update = function () {};
  
  }


