// set game configuration
var isMobile = navigator.userAgent.indexOf("Mobile");
var w = 400;
var h = 400;



let config = {
  type: Phaser.WEBGL,
  fullscreenTarget: "phaser-app",
  width: w,
  height: h,
  scene: [widgetScene],
  pixelArt: false,
  scale: {
    parent: "phaser-example",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: w,
    height: h,
  },

  backgroundColor: 0xffff00,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      //debug: true,
    },
  },
};

let game = new Phaser.Game(config);
