import { myShader } from "./shader.js";
export class titleScene extends Phaser.Scene{
  constructor(config) {
    super("Title");
  }
init = function () {
 


};

preload = function () {};
// create after preload
create = function () {

  this.winEmitterTimer = this.time.addEvent({
    delay: 3000,
    repeat: 0,
    callback: function () {
      phaserImg.destroy();
      this.musicSound = this.sound.add("music", { loop: true, volume: 0.2 });
      this.musicSound.play();
      this.start = this.add
        .text(90, 450, "CLICK HERE TO START", {
          fontSize: 128,
          fontFamily: "candyshop",
        })
        .setInteractive();
      this.start.setStroke("#ffffff", 4);
      //  Apply the gradient fill.
      let gradient = this.start.context.createLinearGradient(
        0,
        0,
        0,
        this.start.height
      );
      gradient.addColorStop(0, "#9C4F96");
      gradient.addColorStop(0.16, "#FF6355");
      gradient.addColorStop(0.32, "#FBA949");
      gradient.addColorStop(0.48, "#FAE442");
      gradient.addColorStop(0.64, "#8BD448");
      gradient.addColorStop(0.82, "#2AA8F2");

      this.start
        .setFill(gradient)
        .setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
      this.start.on(
        "pointerup",
        function () {
          //this.scale.startFullscreen();
          let canvas = document.querySelector("canvas");
          let div = document.getElementById("phaser-app");
          let gameRatio = config.width / config.height;
          let dpi_w = parseInt(div.style.width) / canvas.width;
          let dpi_h = parseInt(div.style.height) / canvas.height;
          let windowWidth = window.innerWidth * (dpi_w / dpi_h);
          let windowHeight = window.innerHeight * (dpi_w / dpi_h);
          let windowRatio = windowWidth / windowHeight;
          div.style.width = window.innerHeight * gameRatio + "px";
          div.style.height = window.innerHeight + "px";
          if (windowRatio < gameRatio) {
            canvas.style.width = windowWidth + "px";
            canvas.style.height = windowWidth / gameRatio + "px";
          } else {
            canvas.style.width = windowHeight * gameRatio + "px";
            canvas.style.height = windowHeight + "px";
          }
          this.sys.displayList.shutdown();

          this.scene.start("Shuffler");
        },
        this
      );
    },
    callbackScope: this,
  });
};
//make everything actually happen
update = function () {
  };
  }