// set game configuration
import {myShader} from './lib/shader.js';
import {preloadScene} from './lib/preload.js';
import {titleScene} from './lib/title.js';
import {shufflerScene} from './lib/shuffler.js';

var isMobile = navigator.userAgent.indexOf("Mobile");
var w = 1600;
var h = 1000;

window.onload = function () {
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
};

let config = {
  type: Phaser.WEBGL,
  fullscreenTarget: "phaser-app",
  width: w,
  height: h,
  scene: [preloadScene, titleScene, shufflerScene],
  pixelArt: false,
  scale: {
    parent: "phaser-example",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: w,
    height: h,
  },

  backgroundColor: 0xe9aad1,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      //debug: true,
    },
  },
};

//create new game and send configuration
new FontFace("candyshop", "url(assets/candyshop.ttf)")
  .load()
  .then(function (loaded) {
    document.fonts.add(loaded);
    let game = new Phaser.Game(config);
  })
  .catch(function (error) {
    return error;
  });
