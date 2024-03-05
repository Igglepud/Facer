export class shufflerScene extends Phaser.Scene{
  constructor(config) {
    super("Shuffler");
  }
init = function () {

  this.spawnFaces = function () {
    if (this.startNumber == 1) {
      (this.xPos = 800), (this.ypos = 450);
      this.numFaces = 1;
    } else if (this.startNumber == 2) {
      this.xPos = 150;
      this.yPos = 150;
      this.numFaces = 40;
    } else {
      this.xPos = 150;
      this.yPos = 150;
      this.numFaces = 20;
    }
    //current numbers support 40 faces
    for (let i = 0; i < this.numFaces; i++) {
      //for multiple faces, just move initial rectangle off screen
      if (this.startNumber == 1) {
        this.rect = this.add.rectangle(
          800,
          450,
          800,
          800,
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.rect.gameID = i;
      } else {
        this.rect = this.add.rectangle(
          -1000,
          -1000,
          800,
          800,
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.rect.gameID = i;
      }
      this.circle1 = this.add.circle(
        this.rect.x,
        this.rect.y,
        400,
        Phaser.Math.Between(0x000000, 0xffffff)
      );
      if (this.startNumber != 3) {
        this.circle1.setInteractive();
      }
      this.circle1.on(
        "pointerup",
        function () {
          this.sys.displayList.shutdown();
          this.game.sound.stopAll();
          let objects = this.sys.displayList.getChildren();

          for (let i = 0; i < objects.length; i++) {
            objects[i].destroy();
          }

          this.scene.start("Title");
        },
        this
      );
      this.circle1.gameID = i;
      this.rightEye = this.add.circle(
        this.circle1.x + Phaser.Math.Between(-100, 100),
        this.circle1.y - 250,
        Phaser.Math.Between(30, 75),
        Phaser.Math.Between(0x000000, 0xffffff)
      );
      this.rightEye.gameID = i;
      this.leftEye = this.add.circle(
        this.rightEye.x - Phaser.Math.Between(-200, 250),
        this.circle1.y - 250,
        this.rightEye.radius,
        this.rightEye.fillColor
      );
      this.leftEye.gameID = i;
      while (
        Phaser.Geom.Intersects.CircleToCircle(this.rightEye, this.leftEye)
      ) {
        this.rightEye.setPosition(
          this.circle1.x + Phaser.Math.Between(-100, 100),
          this.circle1.y - 250
        );
        this.leftEye.setPosition(
          this.rightEye.x - Phaser.Math.Between(-200, 250),
          this.circle1.y - 250
        );
      }
      let pupilX = Phaser.Math.Between(-10, 10);
      let pupilY = Phaser.Math.Between(-10, 10);
      let pupilRadius = Phaser.Math.Between(2, 9);

      this.rightPupil = this.add.circle(
        this.rightEye.x + pupilX,
        this.rightEye.y + pupilY,
        this.rightEye.radius / pupilRadius,
        0x000000
      );
      this.rightPupil.gameID = i;
      this.leftPupil = this.add.circle(
        this.leftEye.x + pupilX,
        this.leftEye.y + pupilY,
        this.leftEye.radius / pupilRadius,
        0x000000
      );
      this.leftPupil.gameID = i;
      this.mouth = this.add.graphics();
      this.mouth.fillStyle(Phaser.Math.Between(0x000000, 0xffffff), 1);

      this.mouth.lineStyle(
        Phaser.Math.Between(1, 5),
        Phaser.Math.Between(0x000000, 0x000000)
      );
      this.mouth.beginPath();
      let start = {
        x: (this.leftEye.x + this.rightEye.x) / 2,
        y: this.rightEye.y + Phaser.Math.Between(100, 150),
      };
      this.mouth.moveTo(start.x, start.y);

      this.mouth.lineTo(
        Phaser.Math.Between(-5, -50) + this.leftEye.x,
        this.leftEye.y + Phaser.Math.Between(75, 150)
      );
      this.mouth.lineTo(
        Phaser.Math.Between(5, 50) + this.leftEye.x,
        this.leftEye.y + Phaser.Math.Between(150, 200)
      );
      this.mouth.lineTo(
        Phaser.Math.Between(-5, -50) + this.rightEye.x,
        this.rightEye.y + Phaser.Math.Between(150, 200)
      );
      this.mouth.lineTo(
        Phaser.Math.Between(5, 50) + this.rightEye.x,
        this.rightEye.y + Phaser.Math.Between(75, 150)
      );
      this.mouth.lineTo(start.x, start.y);

      this.mouth.closePath();
      this.mouth.fillPath();
      this.mouth.strokePath();
      this.mouth.gameID = i;
      this.rightEyeBrow = this.add.rectangle(
        this.rightEye.x,
        this.rightEye.y - Phaser.Math.Between(75, 100),
        Phaser.Math.Between(this.rightEye.width / 2, this.rightEye.width * 1.5),
        Phaser.Math.Between(10, 30),
        Phaser.Math.Between(0x000000, 0xffffff)
      );
      this.rightEyeBrow.gameID = i;
      this.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
      this.leftEyeBrow = this.add.rectangle(
        this.leftEye.x,
        this.rightEyeBrow.y,
        this.rightEyeBrow.width,
        this.rightEyeBrow.height,
        this.rightEyeBrow.fillColor
      );
      this.leftEyeBrow.gameID = i;
      this.leftEyeBrow.angle = this.rightEyeBrow.angle;
      if (Phaser.Math.Between(1, 3) == 1) {
        this.leftEyeBrow.angle *= -1;
      } else if (Phaser.Math.Between(1, 3) == 2) {
        this.rightEyeBrow.angle *= -1;
      }
      //tween parts
      let rightEyeBlink = Phaser.Math.Between(1, 18);
      if (rightEyeBlink == 3) {
        let rightEyeBlinkTween = this.tweens.add({
          targets: [this.rightEye, this.rightPupil],
          scaleY: -0,
          duration: 250,
          delay: 2500,
          yoyo: true,
          repeat: 0,
          onComplete: function () {
            this.restart();
            this.pause();
          },
        });
        rightEyeBlinkTween.gameID = i;
      }
      let leftEyeBlink = Phaser.Math.Between(1, 18);
      if (leftEyeBlink == 3) {
        let leftEyeBlinkTween = this.tweens.add({
          targets: [this.leftEye, this.leftPupil],
          scaleY: -0,
          duration: 250,
          delay: 2500,
          yoyo: true,
          repeat: 0,
          onComplete: function () {
            this.restart();
            this.pause();
          },
        });
        leftEyeBlinkTween.gameID = i;
      }
      let browLift = Phaser.Math.Between(1, 27);
      if (browLift == 3) {
        let browLiftTween = this.tweens.add({
          targets: [this.leftEyeBrow, this.rightEyeBrow],
          y: this.rightEyeBrow.y - Phaser.Math.Between(15, 50),
          duration: 250,
          delay: 1500,
          yoyo: true,
          repeat: 1,
          onComplete: function () {
            this.restart();
            this.pause();
          },
        });
        browLiftTween.gameID = i;
      }
      if (browLift == 2) {
        let browLiftTween = this.tweens.add({
          targets: [this.leftEyeBrow],
          y: this.rightEyeBrow.y - Phaser.Math.Between(15, 50),
          duration: 500,
          delay: 1500,
          yoyo: false,
          repeat: 0,
          onComplete: function () {
            this.restart();
            this.pause();
          },
        });
        browLiftTween.gameID = i;
      }
      if (browLift == 1) {
        let browLiftTween = this.tweens.add({
          targets: [this.rightEyeBrow],
          y: this.rightEyeBrow.y - Phaser.Math.Between(15, 50),
          duration: 500,
          delay: 1500,
          yoyo: false,
          repeat: 0,
          onComplete: function () {
            this.restart();
            this.pause();
          },
        });
        browLiftTween.gameID = i;
      }

      //TODO recolor tween? Maybe just scrap it?
      // console.log(this.mouth)
      //     let items=this.sys.displayList.getChildren();
      //     let numItems=items.length;
      //     for(i=0;i<numItems;i++){
      //       if(items[i].type=='Graphics'){
      //         let colorTween=this.tweens.add({
      //           targets:items[i],
      //          fillStyle:Phaser.Math.Between(0x000000,0xffffff),
      //            duration:2000,
      //            delay:500,
      //            yoyo:false,
      //            repeat:0,
      //                });

      //       }
      //       let colorTween=this.tweens.add({
      //         targets:items[i],
      //        fillColor:Phaser.Math.Between(0x000000,0xffffff),
      //          duration:2000,
      //          delay:500,
      //          yoyo:false,
      //          repeat:0,
      //              });

      //     }

      // let smile =Phaser.Math.Between(3,3);
      // if(smile==3){
      //   let browLiftTween=this.tweens.add({
      //     targets:this.mouth,
      //     scaleX:Math.random()*Phaser.Math.Between(1,2),
      //     scaleY:Math.random()*Phaser.Math.Between(1,2),
      //      duration:1500,
      //      delay:Phaser.Math.Between(0,1500),
      //      yoyo:false,
      //      repeat:0,
      //          });

      // };

      //TODO pupil rotate
      //     let pupilRotate=Phaser.Math.Between(3,3);
      // if(pupilRotate==3){
      //   this.pupilRotate=true;
      //   if(!this.leftPupils){this.leftPupils=this.add.group();this.rightPupils=this.add.group();
      //   this.leftEyes=this.add.group();this.rightEyes=this.add.group()};
      //   this.leftPupils.add(this.leftPupil);
      //   this.rightPupils.add(this.rightPupil);
      //   this.leftEyes.add(this.leftEye);
      //   this.rightEyes.add(this.rightEye);
      // };

      //consolidate face
      if (this.startNumber == 2) {
        this.face = this.add.container(this.xPos, this.yPos);
        this.face.add([
          this.rect,
          this.circle1,
          this.rightEye,
          this.rightEyeBrow,
          this.rightPupil,
          this.leftEye,
          this.leftEyeBrow,
          this.leftPupil,
          this.mouth,
        ]);
        this.face.setScale(0.25);

        this.face.setPosition(this.xPos + 200, this.yPos + 200);

        this.xPos += 200;
        if (this.xPos > 1550) {
          this.xPos = 150;
          this.yPos += 200;
        }

        if (this.yPos > 950) {
          this.yPos = 150;
        }
      }

      if (this.startNumber == 3) {
        this.face = this.add.container(this.xPos, this.yPos);
        this.face.add([
          this.rect,
          this.circle1,
          this.rightEye,
          this.rightEyeBrow,
          this.rightPupil,
          this.leftEye,
          this.leftEyeBrow,
          this.leftPupil,
          this.mouth,
        ]);
        this.face.setScale(0.25);

        let card = this.add
          .rectangle(this.xPos - 50, this.yPos - 50, 200, 200, 0x8cfd7e)
          .setStrokeStyle(6, 0xffffff)
          .setInteractive()
          .on(
            "pointerdown",
            function () {
              if (this.matching == false) {
                this.selected++;
                if (this.selected < 3) {
                  if (card.path) {
                    card.path.visible = false;
                  }
                  let tweens = this.tweens._active;

                  for (let j = 0; j < tweens.length; j++) {
                    if (tweens[j].gameID == card.gameID) {
                      tweens[j].play();
                    }
                  }
                  this.chingSound.play();
                  let point = card.getTopLeft();
                  let path = new Phaser.Curves.Path(point.x, point.y);
                  point = card.getBottomLeft();
                  path.lineTo(point.x, point.y);
                  point = card.getBottomRight();
                  path.lineTo(point.x, point.y);
                  point = card.getTopRight();
                  path.lineTo(point.x, point.y);
                  path.closePath();
                  let particles = this.add.particles("sparkle").setDepth(11);
                  if (!this.emitter1) {
                    this.emitter1 = particles.createEmitter({
                      scale: { start: 1, end: 0 },

                      blendMode: "ADD",
                      gravityY: 300,
                      accelerationX: { min: -200, max: 200 },
                      accelerationY: { min: 0, max: -500 },
                      collideLeft: false,
                      collideRight: false,
                      collideTop: false,
                      collideBottom: false,
                      frequency: 0,
                      emitZone: {
                        type: "edge",
                        source: path,
                        seamless: true,
                        quantity: 0,
                        stepRate: 300,
                        yoyo: false,
                      },
                      lifespan: 500,
                      depth: 11,
                    });
                  } else {
                    this.emitter2 = particles.createEmitter({
                      scale: { start: 1, end: 0 },

                      blendMode: "ADD",
                      gravityY: 300,
                      accelerationX: { min: -200, max: 200 },
                      accelerationY: { min: 0, max: -500 },
                      collideLeft: false,
                      collideRight: false,
                      collideTop: false,
                      collideBottom: false,
                      frequency: 0,
                      emitZone: {
                        type: "edge",
                        source: path,
                        seamless: true,
                        quantity: 0,
                        stepRate: 300,
                        yoyo: false,
                      },
                      lifespan: 500,
                      depth: 11,
                    });
                  }
                  if (card.clickable == true) {
                    this.m.setScale(0.2).setPosition(card.x, card.y);
                    this.t.setScale(0.2).setPosition(card.x, card.y);
                    this.h.setScale(0.2).setPosition(card.x, card.y);
                    card.clickable = false;

                    card.movementTween = this.tweens.add({
                      targets: card,
                      scaleY: 0,
                      scaleX: 0,
                      duration: 500,
                      callbackScope: card,
                      onComplete: function () {
                        this.clickable = true;
                      },
                    });
                    let tweens = this.tweens._active;

                    for (let j = 0; j < tweens.length; j++) {
                      if (tweens[j].gameID == card.gameID) {
                        tweens[j].play();
                      }
                    }
                    this.checks++;
                    if (this.checks > 2) {
                      this.checks = 1;
                    }
                    if (this.checks == 1) {
                      this.id1 = card.gameID;
                      this.card1Tween = card.movementTween;
                    } else {
                      this.id2 = card.gameID;
                      this.card2Tween = card.movementTween;
                    }
                    if (this.checks == 2) {
                      this.tweenTimer = this.time.addEvent({
                        delay: 3000,
                        repeat: 0,
                        callback: function () {
                          this.selected = 0;
                          if (this.id1 == this.id2) {
                            this.m.visible = true;
                            this.m.movementTween = this.tweens.add({
                              targets: this.m,
                              x: 100,
                              y: 350,
                              ease: Phaser.Math.Easing.Bounce.Out,

                              scaleY: 1,
                              scaleX: 1,
                              duration: 500,

                              callbackScope: this,
                              onComplete: function () {
                                this.a.visible = true;
                                this.a.movementTween = this.tweens.add({
                                  targets: this.a,
                                  x: this.m.x + 288,
                                  y: 350,
                                  ease: Phaser.Math.Easing.Bounce.Out,

                                  scaleY: 1,
                                  scaleX: 1,
                                  duration: 500,

                                  callbackScope: this,
                                  onComplete: function () {
                                    this.t.visible = true;
                                    this.t.movementTween = this.tweens.add({
                                      targets: this.t,
                                      x: this.a.x + 248,
                                      y: 350,
                                      ease: Phaser.Math.Easing.Bounce.Out,

                                      scaleY: 1,
                                      scaleX: 1,
                                      duration: 500,

                                      callbackScope: this,
                                      onComplete: function () {
                                        this.c.visible = true;
                                        this.c.movementTween = this.tweens.add({
                                          targets: this.c,
                                          x: this.t.x + 248,
                                          y: 350,
                                          ease: Phaser.Math.Easing.Bounce.Out,

                                          scaleY: 1,
                                          scaleX: 1,
                                          duration: 500,

                                          callbackScope: this,
                                          onComplete: function () {
                                            this.h.visible = true;
                                            this.h.movementTween =
                                              this.tweens.add({
                                                targets: this.h,
                                                x: this.c.x + 248,
                                                y: 350,
                                                scaleY: 1,
                                                scaleX: 1,
                                                ease: Phaser.Math.Easing.Bounce
                                                  .Out,

                                                duration: 500,

                                                callbackScope: this,
                                                onComplete: function () {
                                                  this.exclamation.visible = true;
                                                  this.exclamation.movementTween =
                                                    this.tweens.add({
                                                      targets: this.exclamation,
                                                      x: this.h.x + 248,
                                                      y: 350,
                                                      scaleY: 1,
                                                      scaleX: 1,
                                                      ease: Phaser.Math.Easing
                                                        .Bounce.Out,

                                                      duration: 500,

                                                      callbackScope: this,
                                                      onComplete: function () {
                                                        this.exclamation.movementTween =
                                                          this.tweens.add({
                                                            targets: [
                                                              this.exclamation,
                                                              this.m,
                                                              this.a,
                                                              this.t,
                                                              this.c,
                                                              this.h,
                                                            ],
                                                            y: 2000,

                                                            duration: 2000,
                                                            callbackScope: this,
                                                          });
                                                      },
                                                    });
                                                },
                                              });
                                          },
                                        });
                                      },
                                    });
                                  },
                                });
                              },
                            });

                            this.matches++;
                            this.matching = true;
                            for (let i = 0; i < this.winEmitters.length; i++) {
                              if (this.winEmitters[i].gameID == this.id1) {
                                this.winEmitters[i].start();
                              }
                            }
                            this.matchSound.play();

                            this.winEmitterTimer = this.time.addEvent({
                              delay: 4000,
                              repeat: 0,
                              callback: function () {
                                this.matching = false;
                                for (let i = 0; i < this.winEmitters.length; i++) {
                                  if (this.winEmitters[i].gameID == this.id1) {
                                    this.winEmitters[i].stop();
                                    this.matchSound.stop();
                                    this.winEmitterTimer.destroy();
                                  }
                                }
                                this.m.visible = false;
                                this.a.visible = false;
                                this.t.visible = false;
                                this.c.visible = false;
                                this.h.visible = false;
                                this.exclamation.visible = false;
                                if (this.matches == 20) {
                                  for (
                                    i = 0;
                                    i < this.winEmitters.length;
                                    i++
                                  ) {
                                    this.winEmitters[i].start();
                                  }
                                  this.confettiEmitter.start();
                                  this.winText.visible = true;
                                  this.game.sound.stopAll();
                                  this.victorySound.play();
                                  this.winText.movementTween = this.tweens.add({
                                    targets: [this.winText],
                                    duration: 500,
                                    alpha: 0,
                                    yoyo: true,
                                    repeat: -1,
                                  });
                                  this.restartTimer = this.time.addEvent({
                                    delay: 6000,
                                    repeat: 0,
                                    callback: function () {
                                      this.game.sound.stopAll();

                                      let objects =
                                        this.sys.displayList.getChildren();

                                      for (let i = 0; i < objects.length; i++) {}

                                      this.scene.start("Title");
                                    },
                                    callbackScope: this,
                                  });
                                }
                              },
                              callbackScope: this,
                            });
                          } else {
                            this.wrongSound.play();
                            this.cameras.main.shake(250, Math.random());
                            this.card1Tween.play().stop();
                            this.card2Tween.play().stop();
                          }
                          this.tweenTimer.destroy();
                          this.emitter1.remove();
                          this.emitter2.remove();
                          this.emitter1 = null;
                          this.emitter2 = null;
                        },
                        callbackScope: this,
                      });
                    }
                  }
                }
              }
            },
            this
          )
          .setDepth(10)
          .on(
            "pointerover",
            function () {
              let point = card.getTopLeft();
              card.path = this.add
                .graphics(point.x, point.y)
                .lineStyle(6, 0x87ceeb)
                .setDepth(11)
                .fillStyle(0xf2da54);
              point = card.getBottomLeft();
              card.path.lineTo(point.x, point.y);
              point = card.getBottomRight();
              card.path.lineTo(point.x, point.y);
              point = card.getTopRight();
              card.path.lineTo(point.x, point.y);
              point = card.getTopLeft();
              card.path.lineTo(point.x, point.y);

              card.path.closePath();
              card.path.fill();
              card.path.strokePath();
            },
            this
          )
          .on(
            "pointerout",
            function () {
              card.path.destroy();
            },
            this
          );
        card.gameType = "card";
        card.clickable = true;
        let card2 = this.add
          .rectangle(this.xPos - 50, this.yPos - 50, 200, 200, 0x8cfd7e)
          .setStrokeStyle(6, 0xffffff)
          .setInteractive()
          .on(
            "pointerdown",
            function () {
              if (this.matching == false) {
                this.selected++;
                if (this.selected < 3) {
                  if (card2.path) {
                    card2.path.visible = false;
                  }
                  let tweens = this.tweens._active;

                  for (let j = 0; j < tweens.length; j++) {
                    if (tweens[j].gameID == card2.gameID) {
                      tweens[j].play();
                    }
                  }
                  this.chingSound.play();
                  let point = card2.getTopLeft();
                  let path = new Phaser.Curves.Path(point.x, point.y);
                  point = card2.getBottomLeft();
                  path.lineTo(point.x, point.y);
                  point = card2.getBottomRight();
                  path.lineTo(point.x, point.y);
                  point = card2.getTopRight();
                  path.lineTo(point.x, point.y);
                  path.closePath();
                  let particles = this.add.particles("sparkle").setDepth(11);
                  if (!this.emitter1) {
                    this.emitter1 = particles.createEmitter({
                      scale: { start: 1, end: 0 },

                      blendMode: "ADD",
                      gravityY: 300,
                      accelerationX: { min: -200, max: 200 },
                      accelerationY: { min: 0, max: -500 },
                      collideLeft: false,
                      collideRight: false,
                      collideTop: false,
                      collideBottom: false,
                      frequency: 0,
                      emitZone: {
                        type: "edge",
                        source: path,
                        seamless: true,
                        quantity: 0,
                        stepRate: 300,
                        yoyo: false,
                      },
                      lifespan: 500,
                      depth: 11,
                    });
                  } else {
                    this.emitter2 = particles.createEmitter({
                      scale: { start: 1, end: 0 },

                      blendMode: "ADD",
                      gravityY: 300,
                      accelerationX: { min: -200, max: 200 },
                      accelerationY: { min: 0, max: -500 },
                      collideLeft: false,
                      collideRight: false,
                      collideTop: false,
                      collideBottom: false,
                      frequency: 0,
                      emitZone: {
                        type: "edge",
                        source: path,
                        seamless: true,
                        quantity: 0,
                        stepRate: 300,
                        yoyo: false,
                      },
                      lifespan: 500,
                      depth: 11,
                    });
                  }
                  if (card2.clickable == true) {
                    this.a.setScale(0.2).setPosition(card2.x, card2.y);
                    this.c.setScale(0.2).setPosition(card2.x, card2.y);
                    this.exclamation
                      .setScale(0.2)
                      .setPosition(card2.x, card2.y);
                    card2.clickable = false;
                    card2.movementTween = this.tweens.add({
                      targets: card2,
                      scaleY: 0,
                      scaleX: 0,
                      duration: 500,
                      callbackScope: card2,
                      onComplete: function () {
                        this.clickable = true;
                      },
                    });
                    let tweens = this.tweens._active;
                    for (let j = 0; j < tweens.length; j++) {
                      if (tweens[j].gameID == card2.gameID) {
                        tweens[j].play();
                      }
                    }

                    this.checks++;
                    if (this.checks > 2) {
                      this.checks = 1;
                    }
                    if (this.checks == 1) {
                      this.id1 = card2.gameID;
                      this.card1Tween = card2.movementTween;
                    } else {
                      this.id2 = card2.gameID;
                      this.card2Tween = card2.movementTween;
                    }

                    if (this.checks == 2) {
                      this.tweenTimer = this.time.addEvent({
                        delay: 3000,
                        repeat: 0,
                        callback: function () {
                          this.selected = 0;
                          if (this.id1 == this.id2) {
                            this.m.visible = true;
                            this.m.movementTween = this.tweens.add({
                              targets: this.m,
                              x: 100,
                              y: 350,
                              scaleY: 1,
                              scaleX: 1,
                              ease: Phaser.Math.Easing.Bounce.Out,

                              duration: 500,

                              callbackScope: this,
                              onComplete: function () {
                                this.a.visible = true;
                                this.a.movementTween = this.tweens.add({
                                  targets: this.a,
                                  x: this.m.x + 288,
                                  y: 350,
                                  ease: Phaser.Math.Easing.Bounce.Out,

                                  scaleY: 1,
                                  scaleX: 1,
                                  duration: 500,

                                  callbackScope: this,
                                  onComplete: function () {
                                    this.t.visible = true;
                                    this.t.movementTween = this.tweens.add({
                                      targets: this.t,
                                      x: this.a.x + 248,
                                      y: 350,
                                      ease: Phaser.Math.Easing.Bounce.Out,

                                      scaleY: 1,
                                      scaleX: 1,
                                      duration: 500,

                                      callbackScope: this,
                                      onComplete: function () {
                                        this.c.visible = true;
                                        this.c.movementTween = this.tweens.add({
                                          targets: this.c,
                                          x: this.t.x + 248,
                                          y: 350,
                                          ease: Phaser.Math.Easing.Bounce.Out,

                                          scaleY: 1,
                                          scaleX: 1,
                                          duration: 500,

                                          callbackScope: this,
                                          onComplete: function () {
                                            this.h.visible = true;
                                            this.h.movementTween =
                                              this.tweens.add({
                                                targets: this.h,
                                                x: this.c.x + 248,
                                                y: 350,
                                                ease: Phaser.Math.Easing.Bounce
                                                  .Out,

                                                scaleY: 1,
                                                scaleX: 1,
                                                duration: 500,

                                                callbackScope: this,
                                                onComplete: function () {
                                                  this.exclamation.visible = true;
                                                  this.exclamation.movementTween =
                                                    this.tweens.add({
                                                      targets: this.exclamation,
                                                      x: this.h.x + 248,
                                                      y: 350,
                                                      ease: Phaser.Math.Easing
                                                        .Bounce.Out,

                                                      scaleY: 1,
                                                      scaleX: 1,
                                                      duration: 500,

                                                      callbackScope: this,
                                                      onComplete: function () {
                                                        this.tweens.add({
                                                          targets: [
                                                            this.exclamation,
                                                            this.m,
                                                            this.a,
                                                            this.t,
                                                            this.c,
                                                            this.h,
                                                          ],

                                                          y: 2000,

                                                          duration: 2000,
                                                          callbackScope: this,
                                                        });
                                                      },
                                                    });
                                                },
                                              });
                                          },
                                        });
                                      },
                                    });
                                  },
                                });
                              },
                            });
                            this.matches++;
                            this.matching = true;
                            for (let i = 0; i < this.winEmitters.length; i++) {
                              if (this.winEmitters[i].gameID == this.id1) {
                                this.winEmitters[i].start();
                              }
                            }
                            this.matchSound.play();

                            this.winEmitterTimer = this.time.addEvent({
                              delay: 4000,
                              repeat: 0,
                              callback: function () {
                                this.matching = false;
                                for (let i = 0; i < this.winEmitters.length; i++) {
                                  if (this.winEmitters[i].gameID == this.id1) {
                                    this.winEmitters[i].stop();
                                    this.matchSound.stop();
                                    this.m.visible = false;
                                    this.a.visible = false;
                                    this.t.visible = false;
                                    this.c.visible = false;
                                    this.h.visible = false;
                                    this.exclamation.visible = false;
                                    this.winEmitterTimer.destroy();
                                    if (this.matches == 20) {
                                      for (
                                        i = 0;
                                        i < this.winEmitters.length;
                                        i++
                                      ) {
                                        this.winEmitters[i].start();
                                      }
                                      if (this.matches == 20) {
                                        for (
                                          i = 0;
                                          i < this.winEmitters.length;
                                          i++
                                        ) {
                                          this.winEmitters[i].start();
                                        }
                                        this.confettiEmitter.start();
                                        this.winText.visible = true;
                                        this.game.sound.stopAll();
                                        this.victorySound.play();

                                        this.winText.movementTween =
                                          this.tweens.add({
                                            targets: [this.winText],
                                            duration: 500,
                                            alpha: 0,
                                            yoyo: true,
                                            repeat: -1,
                                          });
                                        this.restartTimer = this.time.addEvent({
                                          delay: 6000,
                                          repeat: 0,
                                          callback: function () {
                                            this.game.sound.stopAll();
                                            let objects =
                                              this.sys.displayList.getChildren();

                                            for (
                                              i = 0;
                                              i < objects.length;
                                              i++
                                            ) {}

                                            this.scene.start("Title");
                                          },
                                          callbackScope: this,
                                        });
                                      }
                                    }
                                  }
                                }
                              },
                              callbackScope: this,
                            });
                          } else {
                            this.wrongSound.play();
                            this.cameras.main.shake(250, Math.random());
                            this.card1Tween.play().stop();
                            this.card2Tween.play().stop();
                          }
                          this.tweenTimer.destroy();
                          this.emitter1.remove();
                          this.emitter2.remove();
                          this.emitter1 = null;
                          this.emitter2 = null;
                        },
                        callbackScope: this,
                      });
                    }
                  }
                }
              }
            },
            this
          )
          .setDepth(10)
          .on(
            "pointerover",
            function () {
              let point = card2.getTopLeft();
              card2.path = this.add
                .graphics(point.x, point.y)
                .lineStyle(6, 0x87ceeb)
                .setDepth(11)
                .fillStyle(0xf2da54);
              point = card2.getBottomLeft();
              card2.path.lineTo(point.x, point.y);
              point = card2.getBottomRight();
              card2.path.lineTo(point.x, point.y);
              point = card2.getTopRight();
              card2.path.lineTo(point.x, point.y);
              point = card2.getTopLeft();
              card2.path.lineTo(point.x, point.y);

              card2.path.closePath();
              card2.path.fill();
              card2.path.strokePath();
            },
            this
          )
          .on(
            "pointerout",
            function () {
              card2.path.destroy();
            },
            this
          );

        card2.clickable = true;
        card2.gameType = "card";
        this.face.gameID = i;
        card.gameID = i;
        card2.gameID = i;

        this.clone = this.add.container();
        this.clone.gameID = i;
        let parts = this.face.getAll();
        for (let j = 0; j < parts.length; j++) {
          let part = Phaser.Utils.Objects.Clone(parts[j]);
          this.clone.add(part);
        }
        this.add.existing(this.clone);
        this.clone.setScale(0.25);

        this.faces.add(this.face);
        this.faces.add(this.clone);
        this.cards.add(card);
        this.cards.add(card2);
      }
    }
    //randomly place faces and clones
    if (this.startNumber == 3) {
      Phaser.Actions.Shuffle(this.faces.getChildren());

      let faces = this.faces.getChildren();
      for (let i = 0; i < faces.length; i++) {
        faces[i].setPosition(this.xPos + 200, this.yPos + 200);
        let card = this.cards.getMatching("gameID", faces[i].gameID);
        card = card[0];
        card.setPosition(this.xPos - 50, this.yPos - 50);
        this.cards.remove(card);
        this.xPos += 200;
        if (this.xPos > 1550) {
          this.xPos = 150;
          this.yPos += 200;
        }

        if (this.yPos > 950) {
          this.yPos = 150;
        }
        //trace card after placement and add win emitter
        let particles2 = this.add.particles("star").setDepth(11);

        let point = card.getTopLeft();
        let path = new Phaser.Curves.Path(point.x, point.y);
        point = card.getBottomLeft();
        path.lineTo(point.x, point.y);
        point = card.getBottomRight();
        path.lineTo(point.x, point.y);
        point = card.getTopRight();
        path.lineTo(point.x, point.y);
        path.closePath();
        let winEmitter = particles2
          .createEmitter({
            scale: { start: 1, end: 0 },

            blendMode: "ADD",
            gravityY: 300,
            accelerationX: { min: -800, max: 800 },
            accelerationY: { min: -300, max: -800 },
            collideLeft: false,
            collideRight: false,
            collideTop: false,
            collideBottom: false,
            frequency: 0,
            emitZone: {
              type: "edge",
              source: path,
              seamless: true,
              quantity: 0,
              stepRate: 300,
              yoyo: false,
            },
            lifespan: 1500,
            depth: 11,
          })
          .stop();
        winEmitter.gameID = card.gameID;
        if (!this.winEmitters) {
          this.winEmitters = [];
        }

        this.winEmitters.push(winEmitter);
      }
    }
  };
};

preload = function () {};
// create after preload
create = function () {
  //create match text

  this.m = this.add
    .text(100, 350, "M", {
      fontSize: 288,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.m.setStroke("#ffffff", 8);
  //  Apply the gradient fill.
  let gradient = this.m.context.createLinearGradient(0, 0, 0, this.m.height);
  gradient.addColorStop(0, "#9C4F96");
  gradient.addColorStop(0.16, "#FF6355");
  gradient.addColorStop(0.32, "#FBA949");
  gradient.addColorStop(0.48, "#FAE442");
  gradient.addColorStop(0.64, "#8BD448");
  gradient.addColorStop(0.82, "#2AA8F2");

  this.m.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.a = this.add
    .text(this.m.x + 288, 350, "A", {
      fontSize: 288,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.a.setStroke("#ffffff", 8);
  this.a.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.t = this.add
    .text(this.a.x + 248, 350, "T", {
      fontSize: 288,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.t.setStroke("#ffffff", 8);
  this.t.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.c = this.add
    .text(this.t.x + 248, 350, "C", {
      fontSize: 288,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.c.setStroke("#ffffff", 8);
  this.c.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.h = this.add
    .text(this.c.x + 248, 350, "H", {
      fontSize: 268,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.h.setStroke("#ffffff", 8);
  this.h.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.exclamation = this.add
    .text(this.h.x + 248, 350, "!", {
      fontSize: 268,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.exclamation.setStroke("#ffffff", 8);
  this.exclamation
    .setFill(gradient)
    .setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.m.visible = false;
  this.a.visible = false;

  this.t.visible = false;

  this.c.visible = false;

  this.h.visible = false;
  this.exclamation.visible = false;

  this.winText = this.add
    .text(75, 350, "YOU WIN!", {
      fontSize: 288,
      fontFamily: "candyshop",
    })
    .setDepth(99);
  this.winText.setStroke("#ffffff", 8);
  this.winText.setFill(gradient).setShadow(10, 10, "rgba(255,255,255,0.5)", 0);
  this.winText.visible = false;

  //end text creation

  this.chingSound = this.sound.add("ching");
  this.wrongSound = this.sound.add("wrong");
  this.matchSound = this.sound.add("match", { loop: true, rate: 6 });
  this.victorySound = this.sound.add("victory");

  this.cards = this.add.group();
  this.faces = this.add.group();
  this.howMany = this.add.text(300, 200, "How many faces?", {
    fontSize: 144,
    fontFamily: "candyshop",
  });
  this.checks = 0;
  this.startNumber;
  this.matches = 0;
  this.matching = false;
  this.selected = 0;
  this.texts = this.add.group();

  this.one = this.add
    .text(400, 400, "One face", { fontSize: 72, fontFamily: "candyshop" })
    .setInteractive();
  this.lots = this.add
    .text(800, 500, "Lots of faces", { fontSize: 72, fontFamily: "candyshop" })
    .setInteractive();
  this.gameText = this.add
    .text(600, 700, "Matching game", { fontSize: 72, fontFamily: "candyshop" })
    .setInteractive();

  this.one
    .on(
      "pointerup",
      function () {
        this.startTimer = this.time.addEvent({
          delay: 100,
          repeat: 0,
          callback: function () {
            this.startNumber = 1;
            this.spawnFaces();
          },
          callbackScope: this,
        });

        //create respawn timer
        this.respawnTimer = this.time.addEvent({
          delay: 3000,
          repeat: -1,
          callback: function () {
            let objects = this.sys.displayList.getChildren();
            let numObjects = objects.length;
            for (let i = 0; i < numObjects; i++) {
              if (objects[i]) {
                objects[i].destroy();
              }
            }

            this.spawnFaces();
          },
          callbackScope: this,
        });
        this.one.destroy();
        this.lots.destroy();
        this.howMany.destroy();
        this.gameText.destroy();
      },
      this
    )
    .on(
      "pointerover",
      function () {
        this.one.circle = this.add.circle(
          this.one.x,
          this.one.y,
          400,
          Phaser.Math.Between(0x000000, 0xffffff)
        );

        this.one.rightEye = this.add.circle(
          this.one.circle.x + Phaser.Math.Between(-100, 100),
          this.one.circle.y - 250,
          Phaser.Math.Between(30, 75),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.one.leftEye = this.add.circle(
          this.one.rightEye.x - Phaser.Math.Between(-200, 250),
          this.one.circle.y - 250,
          this.one.rightEye.radius,
          this.one.rightEye.fillColor
        );
        while (
          Phaser.Geom.Intersects.CircleToCircle(
            this.one.rightEye,
            this.one.leftEye
          )
        ) {
          this.one.rightEye.setPosition(
            this.one.circle.x + Phaser.Math.Between(-100, 100),
            this.one.circle.y - 250
          );
          this.one.leftEye.setPosition(
            this.one.rightEye.x - Phaser.Math.Between(-200, 250),
            this.one.circle.y - 250
          );
        }
        let pupilX = Phaser.Math.Between(-10, 10);
        let pupilY = Phaser.Math.Between(-10, 10);
        let pupilRadius = Phaser.Math.Between(2, 9);

        this.one.rightPupil = this.add.circle(
          this.one.rightEye.x + pupilX,
          this.one.rightEye.y + pupilY,
          this.one.rightEye.radius / pupilRadius,
          0x000000
        );
        this.one.leftPupil = this.add.circle(
          this.one.leftEye.x + pupilX,
          this.one.leftEye.y + pupilY,
          this.one.leftEye.radius / pupilRadius,
          0x000000
        );
        this.one.mouth = this.add.graphics();
        this.one.mouth.fillStyle(Phaser.Math.Between(0x000000, 0xffffff), 1);

        this.one.mouth.lineStyle(
          Phaser.Math.Between(1, 5),
          Phaser.Math.Between(0x000000, 0x000000)
        );
        this.one.mouth.beginPath();
        let start = {
          x: (this.one.leftEye.x + this.one.rightEye.x) / 2,
          y: this.one.rightEye.y + Phaser.Math.Between(100, 150),
        };
        this.one.mouth.moveTo(start.x, start.y);

        this.one.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.one.leftEye.x,
          this.one.leftEye.y + Phaser.Math.Between(75, 150)
        );
        this.one.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.one.leftEye.x,
          this.one.leftEye.y + Phaser.Math.Between(150, 200)
        );
        this.one.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.one.rightEye.x,
          this.one.rightEye.y + Phaser.Math.Between(150, 200)
        );
        this.one.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.one.rightEye.x,
          this.one.rightEye.y + Phaser.Math.Between(75, 150)
        );
        this.one.mouth.lineTo(start.x, start.y);

        this.one.mouth.closePath();
        this.one.mouth.fillPath();
        this.one.mouth.strokePath();
        this.one.rightEyeBrow = this.add.rectangle(
          this.one.rightEye.x,
          this.one.rightEye.y - Phaser.Math.Between(75, 100),
          Phaser.Math.Between(
            this.one.rightEye.width / 2,
            this.one.rightEye.width * 1.5
          ),
          Phaser.Math.Between(10, 30),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.one.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
        this.one.leftEyeBrow = this.add.rectangle(
          this.one.leftEye.x,
          this.one.rightEyeBrow.y,
          this.one.rightEyeBrow.width,
          this.one.rightEyeBrow.height,
          this.one.rightEyeBrow.fillColor
        );
        this.one.leftEyeBrow.angle = this.one.rightEyeBrow.angle;
        if (Phaser.Math.Between(1, 3) == 1) {
          this.one.leftEyeBrow.angle *= -1;
        } else if (Phaser.Math.Between(1, 3) == 2) {
          this.one.rightEyeBrow.angle *= -1;
        }
        this.one.face = this.add.container(this.one.x, this.one.y);
        this.one.face.add([
          this.one.circle,
          this.one.rightEye,
          this.one.rightEyeBrow,
          this.one.rightPupil,
          this.one.leftEye,
          this.one.leftEyeBrow,
          this.one.leftPupil,
          this.one.mouth,
        ]);
        this.one.face.setScale(0.25);

        this.one.face.setPosition(this.one.x - 200, this.one.y - 50);
      },
      this
    )
    .on(
      "pointerout",
      function () {
        this.one.circle.destroy();
        this.one.rightEye.destroy();
        this.one.leftEye.destroy();
        this.one.rightPupil.destroy();
        this.one.leftPupil.destroy();
        this.one.rightEyeBrow.destroy();
        this.one.leftEyeBrow.destroy();
        this.one.face.destroy();
      },
      this
    );

  this.lots
    .on(
      "pointerup",
      function () {
        this.startTimer = this.time.addEvent({
          delay: 100,
          repeat: 0,
          callback: function () {
            this.one.destroy();
            this.lots.destroy();
            this.howMany.destroy();
            this.gameText.destroy();

            this.startNumber = 2;
            this.spawnFaces();
          },
          callbackScope: this,
        });

        // //create respawn timer
        this.respawnTimer = this.time.addEvent({
          delay: 3000,
          repeat: -1,
          callback: function () {
            let objects = this.sys.displayList.getChildren();
            let numObjects = objects.length;
            for (let i = 0; i < numObjects; i++) {
              if (objects[i]) {
                objects[i].destroy();
              }
            }

            this.spawnFaces();
          },
          callbackScope: this,
        });
        this.one.destroy();
        this.lots.destroy();
        this.howMany.destroy();
      },
      this
    )
    .on(
      "pointerover",
      function () {
        this.lots.circle = this.add.circle(
          this.lots.x,
          this.lots.y,
          400,
          Phaser.Math.Between(0x000000, 0xffffff)
        );

        this.lots.rightEye = this.add.circle(
          this.lots.circle.x + Phaser.Math.Between(-100, 100),
          this.lots.circle.y - 250,
          Phaser.Math.Between(30, 75),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.leftEye = this.add.circle(
          this.lots.rightEye.x - Phaser.Math.Between(-200, 250),
          this.lots.circle.y - 250,
          this.lots.rightEye.radius,
          this.lots.rightEye.fillColor
        );
        while (
          Phaser.Geom.Intersects.CircleToCircle(
            this.lots.rightEye,
            this.lots.leftEye
          )
        ) {
          this.lots.rightEye.setPosition(
            this.lots.circle.x + Phaser.Math.Between(-100, 100),
            this.lots.circle.y - 250
          );
          this.lots.leftEye.setPosition(
            this.lots.rightEye.x - Phaser.Math.Between(-200, 250),
            this.lots.circle.y - 250
          );
        }
        let pupilX = Phaser.Math.Between(-10, 10);
        let pupilY = Phaser.Math.Between(-10, 10);
        let pupilRadius = Phaser.Math.Between(2, 9);

        this.lots.rightPupil = this.add.circle(
          this.lots.rightEye.x + pupilX,
          this.lots.rightEye.y + pupilY,
          this.lots.rightEye.radius / pupilRadius,
          0x000000
        );
        this.lots.leftPupil = this.add.circle(
          this.lots.leftEye.x + pupilX,
          this.lots.leftEye.y + pupilY,
          this.lots.leftEye.radius / pupilRadius,
          0x000000
        );
        this.lots.mouth = this.add.graphics();
        this.lots.mouth.fillStyle(Phaser.Math.Between(0x000000, 0xffffff), 1);

        this.lots.mouth.lineStyle(
          Phaser.Math.Between(1, 5),
          Phaser.Math.Between(0x000000, 0x000000)
        );
        this.lots.mouth.beginPath();
        let start = {
          x: (this.lots.leftEye.x + this.lots.rightEye.x) / 2,
          y: this.lots.rightEye.y + Phaser.Math.Between(100, 150),
        };
        this.lots.mouth.moveTo(start.x, start.y);

        this.lots.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.leftEye.x,
          this.lots.leftEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.leftEye.x,
          this.lots.leftEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.rightEye.x,
          this.lots.rightEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.rightEye.x,
          this.lots.rightEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.mouth.lineTo(start.x, start.y);

        this.lots.mouth.closePath();
        this.lots.mouth.fillPath();
        this.lots.mouth.strokePath();
        this.lots.rightEyeBrow = this.add.rectangle(
          this.lots.rightEye.x,
          this.lots.rightEye.y - Phaser.Math.Between(75, 100),
          Phaser.Math.Between(
            this.lots.rightEye.width / 2,
            this.lots.rightEye.width * 1.5
          ),
          Phaser.Math.Between(10, 30),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
        this.lots.leftEyeBrow = this.add.rectangle(
          this.lots.leftEye.x,
          this.lots.rightEyeBrow.y,
          this.lots.rightEyeBrow.width,
          this.lots.rightEyeBrow.height,
          this.lots.rightEyeBrow.fillColor
        );
        this.lots.leftEyeBrow.angle = this.lots.rightEyeBrow.angle;
        if (Phaser.Math.Between(1, 3) == 1) {
          this.lots.leftEyeBrow.angle *= -1;
        } else if (Phaser.Math.Between(1, 3) == 2) {
          this.lots.rightEyeBrow.angle *= -1;
        }
        this.lots.face = this.add.container(this.lots.x, this.lots.y);
        this.lots.face.add([
          this.lots.circle,
          this.lots.rightEye,
          this.lots.rightEyeBrow,
          this.lots.rightPupil,
          this.lots.leftEye,
          this.lots.leftEyeBrow,
          this.lots.leftPupil,
          this.lots.mouth,
        ]);
        this.lots.face.setScale(0.25);

        this.lots.face.setPosition(this.lots.x - 400, this.lots.y - 50);

        this.lots.two = this.add.circle(
          this.lots.x,
          this.lots.y,
          400,
          Phaser.Math.Between(0x000000, 0xffffff)
        );

        this.lots.two.rightEye = this.add.circle(
          this.lots.two.x + Phaser.Math.Between(-100, 100),
          this.lots.two.y - 250,
          Phaser.Math.Between(30, 75),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.two.leftEye = this.add.circle(
          this.lots.two.rightEye.x - Phaser.Math.Between(-200, 250),
          this.lots.two.y - 250,
          this.lots.two.rightEye.radius,
          this.lots.two.rightEye.fillColor
        );
        while (
          Phaser.Geom.Intersects.CircleToCircle(
            this.lots.two.rightEye,
            this.lots.two.leftEye
          )
        ) {
          this.lots.two.rightEye.setPosition(
            this.lots.two.x + Phaser.Math.Between(-100, 100),
            this.lots.two.y - 250
          );
          this.lots.two.leftEye.setPosition(
            this.lots.two.rightEye.x - Phaser.Math.Between(-200, 250),
            this.lots.two.y - 250
          );
        }
        pupilX = Phaser.Math.Between(-10, 10);
        pupilY = Phaser.Math.Between(-10, 10);
        pupilRadius = Phaser.Math.Between(2, 9);

        this.lots.two.rightPupil = this.add.circle(
          this.lots.two.rightEye.x + pupilX,
          this.lots.two.rightEye.y + pupilY,
          this.lots.two.rightEye.radius / pupilRadius,
          0x000000
        );
        this.lots.two.leftPupil = this.add.circle(
          this.lots.two.leftEye.x + pupilX,
          this.lots.two.leftEye.y + pupilY,
          this.lots.two.leftEye.radius / pupilRadius,
          0x000000
        );
        this.lots.two.mouth = this.add.graphics();
        this.lots.two.mouth.fillStyle(
          Phaser.Math.Between(0x000000, 0xffffff),
          1
        );

        this.lots.two.mouth.lineStyle(
          Phaser.Math.Between(1, 5),
          Phaser.Math.Between(0x000000, 0x000000)
        );
        this.lots.two.mouth.beginPath();
        start = {
          x: (this.lots.two.leftEye.x + this.lots.two.rightEye.x) / 2,
          y: this.lots.two.rightEye.y + Phaser.Math.Between(100, 150),
        };
        this.lots.two.mouth.moveTo(start.x, start.y);

        this.lots.two.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.two.leftEye.x,
          this.lots.two.leftEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.two.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.two.leftEye.x,
          this.lots.two.leftEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.two.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.two.rightEye.x,
          this.lots.two.rightEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.two.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.two.rightEye.x,
          this.lots.two.rightEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.two.mouth.lineTo(start.x, start.y);

        this.lots.two.mouth.closePath();
        this.lots.two.mouth.fillPath();
        this.lots.two.mouth.strokePath();
        this.lots.two.rightEyeBrow = this.add.rectangle(
          this.lots.two.rightEye.x,
          this.lots.two.rightEye.y - Phaser.Math.Between(75, 100),
          Phaser.Math.Between(
            this.lots.two.rightEye.width / 2,
            this.lots.two.rightEye.width * 1.5
          ),
          Phaser.Math.Between(10, 30),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.two.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
        this.lots.two.leftEyeBrow = this.add.rectangle(
          this.lots.two.leftEye.x,
          this.lots.two.rightEyeBrow.y,
          this.lots.two.rightEyeBrow.width,
          this.lots.two.rightEyeBrow.height,
          this.lots.two.rightEyeBrow.fillColor
        );
        this.lots.two.leftEyeBrow.angle = this.lots.two.rightEyeBrow.angle;
        if (Phaser.Math.Between(1, 3) == 1) {
          this.lots.two.leftEyeBrow.angle *= -1;
        } else if (Phaser.Math.Between(1, 3) == 2) {
          this.lots.two.rightEyeBrow.angle *= -1;
        }
        this.lots.two.face = this.add.container(
          this.lots.two.x,
          this.lots.two.y
        );
        this.lots.two.face.add([
          this.lots.two,
          this.lots.two.rightEye,
          this.lots.two.rightEyeBrow,
          this.lots.two.rightPupil,
          this.lots.two.leftEye,
          this.lots.two.leftEyeBrow,
          this.lots.two.leftPupil,
          this.lots.two.mouth,
        ]);
        this.lots.two.face.setScale(0.25);

        this.lots.two.face.setPosition(this.lots.x, this.lots.y - 250);

        this.lots.three = this.add.circle(
          this.lots.x,
          this.lots.y,
          400,
          Phaser.Math.Between(0x000000, 0xffffff)
        );

        this.lots.three.rightEye = this.add.circle(
          this.lots.three.x + Phaser.Math.Between(-100, 100),
          this.lots.three.y - 250,
          Phaser.Math.Between(30, 75),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.three.leftEye = this.add.circle(
          this.lots.three.rightEye.x - Phaser.Math.Between(-200, 250),
          this.lots.three.y - 250,
          this.lots.three.rightEye.radius,
          this.lots.three.rightEye.fillColor
        );
        while (
          Phaser.Geom.Intersects.CircleToCircle(
            this.lots.three.rightEye,
            this.lots.three.leftEye
          )
        ) {
          this.lots.three.rightEye.setPosition(
            this.lots.three.x + Phaser.Math.Between(-100, 100),
            this.lots.three.y - 250
          );
          this.lots.three.leftEye.setPosition(
            this.lots.three.rightEye.x - Phaser.Math.Between(-200, 250),
            this.lots.three.y - 250
          );
        }
        pupilX = Phaser.Math.Between(-10, 10);
        pupilY = Phaser.Math.Between(-10, 10);
        pupilRadius = Phaser.Math.Between(2, 9);

        this.lots.three.rightPupil = this.add.circle(
          this.lots.three.rightEye.x + pupilX,
          this.lots.three.rightEye.y + pupilY,
          this.lots.three.rightEye.radius / pupilRadius,
          0x000000
        );
        this.lots.three.leftPupil = this.add.circle(
          this.lots.three.leftEye.x + pupilX,
          this.lots.three.leftEye.y + pupilY,
          this.lots.three.leftEye.radius / pupilRadius,
          0x000000
        );
        this.lots.three.mouth = this.add.graphics();
        this.lots.three.mouth.fillStyle(
          Phaser.Math.Between(0x000000, 0xffffff),
          1
        );

        this.lots.three.mouth.lineStyle(
          Phaser.Math.Between(1, 5),
          Phaser.Math.Between(0x000000, 0x000000)
        );
        this.lots.three.mouth.beginPath();
        start = {
          x: (this.lots.three.leftEye.x + this.lots.three.rightEye.x) / 2,
          y: this.lots.three.rightEye.y + Phaser.Math.Between(100, 150),
        };
        this.lots.three.mouth.moveTo(start.x, start.y);

        this.lots.three.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.three.leftEye.x,
          this.lots.three.leftEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.three.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.three.leftEye.x,
          this.lots.three.leftEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.three.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.lots.three.rightEye.x,
          this.lots.three.rightEye.y + Phaser.Math.Between(150, 200)
        );
        this.lots.three.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.lots.three.rightEye.x,
          this.lots.three.rightEye.y + Phaser.Math.Between(75, 150)
        );
        this.lots.three.mouth.lineTo(start.x, start.y);

        this.lots.three.mouth.closePath();
        this.lots.three.mouth.fillPath();
        this.lots.three.mouth.strokePath();
        this.lots.three.rightEyeBrow = this.add.rectangle(
          this.lots.three.rightEye.x,
          this.lots.three.rightEye.y - Phaser.Math.Between(75, 100),
          Phaser.Math.Between(
            this.lots.three.rightEye.width / 2,
            this.lots.three.rightEye.width * 1.5
          ),
          Phaser.Math.Between(10, 30),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.lots.three.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
        this.lots.three.leftEyeBrow = this.add.rectangle(
          this.lots.three.leftEye.x,
          this.lots.three.rightEyeBrow.y,
          this.lots.three.rightEyeBrow.width,
          this.lots.three.rightEyeBrow.height,
          this.lots.three.rightEyeBrow.fillColor
        );
        this.lots.three.leftEyeBrow.angle = this.lots.three.rightEyeBrow.angle;
        if (Phaser.Math.Between(1, 3) == 1) {
          this.lots.three.leftEyeBrow.angle *= -1;
        } else if (Phaser.Math.Between(1, 3) == 2) {
          this.lots.three.rightEyeBrow.angle *= -1;
        }
        this.lots.three.face = this.add.container(
          this.lots.three.x,
          this.lots.three.y
        );
        this.lots.three.face.add([
          this.lots.three,
          this.lots.three.rightEye,
          this.lots.three.rightEyeBrow,
          this.lots.three.rightPupil,
          this.lots.three.leftEye,
          this.lots.three.leftEyeBrow,
          this.lots.three.leftPupil,
          this.lots.three.mouth,
        ]);
        this.lots.three.face.setScale(0.25);

        this.lots.three.face.setPosition(this.lots.x + 400, this.lots.y - 50);
      },
      this
    )
    .on(
      "pointerout",
      function () {
        this.lots.circle.destroy();
        this.lots.rightEye.destroy();
        this.lots.leftEye.destroy();
        this.lots.rightPupil.destroy();
        this.lots.leftPupil.destroy();
        this.lots.rightEyeBrow.destroy();
        this.lots.leftEyeBrow.destroy();
        this.lots.face.destroy();
        this.lots.two.destroy();
        this.lots.two.rightEye.destroy();
        this.lots.two.leftEye.destroy();
        this.lots.two.rightPupil.destroy();
        this.lots.two.leftPupil.destroy();
        this.lots.two.rightEyeBrow.destroy();
        this.lots.two.leftEyeBrow.destroy();
        this.lots.two.face.destroy();
        this.lots.three.destroy();
        this.lots.three.rightEye.destroy();
        this.lots.three.leftEye.destroy();
        this.lots.three.rightPupil.destroy();
        this.lots.three.leftPupil.destroy();
        this.lots.three.rightEyeBrow.destroy();
        this.lots.three.leftEyeBrow.destroy();
        this.lots.three.face.destroy();
      },
      this
    );

  this.gameText
    .on(
      "pointerup",
      function () {
        this.startTimer = this.time.addEvent({
          delay: 100,
          repeat: 0,
          callback: function () {
            this.gameText.destroy();
            this.one.destroy();
            this.lots.destroy();
            this.howMany.destroy();

            this.startNumber = 3;
            this.spawnFaces();
          },
          callbackScope: this,
        });
      },
      this
    )
    .on(
      "pointerover",
      function () {
        this.gameText.circle = this.add.circle(
          this.gameText.x,
          this.gameText.y,
          400,
          Phaser.Math.Between(0x000000, 0xffffff)
        );

        this.gameText.rightEye = this.add.circle(
          this.gameText.circle.x + Phaser.Math.Between(-100, 100),
          this.gameText.circle.y - 250,
          Phaser.Math.Between(30, 75),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.gameText.leftEye = this.add.circle(
          this.gameText.rightEye.x - Phaser.Math.Between(-200, 250),
          this.gameText.circle.y - 250,
          this.gameText.rightEye.radius,
          this.gameText.rightEye.fillColor
        );
        while (
          Phaser.Geom.Intersects.CircleToCircle(
            this.gameText.rightEye,
            this.gameText.leftEye
          )
        ) {
          this.gameText.rightEye.setPosition(
            this.gameText.circle.x + Phaser.Math.Between(-100, 100),
            this.gameText.circle.y - 250
          );
          this.gameText.leftEye.setPosition(
            this.gameText.rightEye.x - Phaser.Math.Between(-200, 250),
            this.gameText.circle.y - 250
          );
        }
        let pupilX = Phaser.Math.Between(-10, 10);
        let pupilY = Phaser.Math.Between(-10, 10);
        let pupilRadius = Phaser.Math.Between(2, 9);

        this.gameText.rightPupil = this.add.circle(
          this.gameText.rightEye.x + pupilX,
          this.gameText.rightEye.y + pupilY,
          this.gameText.rightEye.radius / pupilRadius,
          0x000000
        );
        this.gameText.leftPupil = this.add.circle(
          this.gameText.leftEye.x + pupilX,
          this.gameText.leftEye.y + pupilY,
          this.gameText.leftEye.radius / pupilRadius,
          0x000000
        );
        this.gameText.mouth = this.add.graphics();
        this.gameText.mouth.fillStyle(
          Phaser.Math.Between(0x000000, 0xffffff),
          1
        );

        this.gameText.mouth.lineStyle(
          Phaser.Math.Between(1, 5),
          Phaser.Math.Between(0x000000, 0x000000)
        );
        this.gameText.mouth.beginPath();
        let start = {
          x: (this.gameText.leftEye.x + this.gameText.rightEye.x) / 2,
          y: this.gameText.rightEye.y + Phaser.Math.Between(100, 150),
        };
        this.gameText.mouth.moveTo(start.x, start.y);

        this.gameText.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.gameText.leftEye.x,
          this.gameText.leftEye.y + Phaser.Math.Between(75, 150)
        );
        this.gameText.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.gameText.leftEye.x,
          this.gameText.leftEye.y + Phaser.Math.Between(150, 200)
        );
        this.gameText.mouth.lineTo(
          Phaser.Math.Between(-5, -50) + this.gameText.rightEye.x,
          this.gameText.rightEye.y + Phaser.Math.Between(150, 200)
        );
        this.gameText.mouth.lineTo(
          Phaser.Math.Between(5, 50) + this.gameText.rightEye.x,
          this.gameText.rightEye.y + Phaser.Math.Between(75, 150)
        );
        this.gameText.mouth.lineTo(start.x, start.y);

        this.gameText.mouth.closePath();
        this.gameText.mouth.fillPath();
        this.gameText.mouth.strokePath();
        this.gameText.rightEyeBrow = this.add.rectangle(
          this.gameText.rightEye.x,
          this.gameText.rightEye.y - Phaser.Math.Between(75, 100),
          Phaser.Math.Between(
            this.gameText.rightEye.width / 2,
            this.gameText.rightEye.width * 1.5
          ),
          Phaser.Math.Between(10, 30),
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.gameText.rightEyeBrow.angle = Phaser.Math.Between(-30, 30);
        this.gameText.leftEyeBrow = this.add.rectangle(
          this.gameText.leftEye.x,
          this.gameText.rightEyeBrow.y,
          this.gameText.rightEyeBrow.width,
          this.gameText.rightEyeBrow.height,
          this.gameText.rightEyeBrow.fillColor
        );
        this.gameText.leftEyeBrow.angle = this.gameText.rightEyeBrow.angle;
        if (Phaser.Math.Between(1, 3) == 1) {
          this.gameText.leftEyeBrow.angle *= -1;
        } else if (Phaser.Math.Between(1, 3) == 2) {
          this.gameText.rightEyeBrow.angle *= -1;
        }
        this.gameText.face = this.add.container(
          this.gameText.x,
          this.gameText.y
        );
        this.gameText.face.add([
          this.gameText.circle,
          this.gameText.rightEye,
          this.gameText.rightEyeBrow,
          this.gameText.rightPupil,
          this.gameText.leftEye,
          this.gameText.leftEyeBrow,
          this.gameText.leftPupil,
          this.gameText.mouth,
        ]);
        this.gameText.face.setScale(0.25);

        this.gameText.face.setPosition(
          this.gameText.x - 250,
          this.gameText.y - 100
        );
        this.matchingClone = this.add.container();
        let parts = this.gameText.face.getAll();
        for (let i = 0; i < parts.length; i++) {
          let part = Phaser.Utils.Objects.Clone(parts[i]);
          this.matchingClone.add(part);
        }
        this.add.existing(this.matchingClone);
        this.matchingClone.setScale(0.25);
        this.matchingClone.setPosition(
          this.gameText.x + 500,
          this.gameText.y - 100
        );
      },
      this
    )
    .on(
      "pointerout",
      function () {
        this.gameText.face.destroy();
        this.gameText.circle.destroy();
        this.gameText.rightEye.destroy();
        this.gameText.rightEyeBrow.destroy();
        this.gameText.rightPupil.destroy();
        this.gameText.leftEye.destroy();
        this.gameText.leftEyeBrow.destroy();
        this.gameText.leftPupil.destroy();
        this.gameText.mouth.destroy();
        this.matchingClone.destroy();
      },
      this
    );
  this.texts.addMultiple([this.lots, this.one, this.gameText, this.howMany]);
  let texts = this.texts.getChildren();
  for (let i = 0; i < texts.length; i++) {
    texts[i].setStroke("#ffffff", 4);
    //  Apply the gradient fill.
    let gradient = texts[i].context.createLinearGradient(
      0,
      0,
      0,
      texts[i].height
    );
    gradient.addColorStop(0, "#9C4F96");
    gradient.addColorStop(0.16, "#FF6355");
    gradient.addColorStop(0.32, "#FBA949");
    gradient.addColorStop(0.48, "#FAE442");
    gradient.addColorStop(0.64, "#8BD448");
    gradient.addColorStop(0.82, "#2AA8F2");

    texts[i].setFill(gradient).setShadow(5, 5, "rgba(255,255,255,0.5)", 0);
  }

  let confetti = this.add.particles("confetti").setDepth(12);
  let confettiPath = new Phaser.Curves.Path(0, -20);

  confettiPath.lineTo(1600, -20);
  confettiPath.lineTo(1600, -19);
  confettiPath.lineTo(0, -19);
  confettiPath.closePath();
  this.confettiEmitter = confetti
    .createEmitter({
      scale: { start: 0.5, end: 0.5 },

      //blendMode: "ADD",
      gravityY: 0,
      accelerationX: { min: -50, max: 50 },
      accelerationY: { min: 50, max: 300 },
      collideLeft: false,
      collideRight: false,
      collideTop: false,
      collideBottom: false,
      quantity: 5,
      frame: [0, 1, 2, 3],
      frequency: 10,
      emitZone: {
        type: "random",
        source: confettiPath,
      },
      lifespan: 10000,
      depth: 11,
    })
    .stop();
};
//make everything actually happen
update = function () {
  //TODO more pupil rotate
  // if(this.run==true){
  // if(this.pupilRotate==true){
  // let leftPupils=this.leftPupils.getChildren();
  // let rightPupils=this.rightPupils.getChildren();
  // let leftEyes=this.leftEyes.getChildren();
  // let rightEyes=this.rightEyes.getChildren();
  // let numPupils=leftPupils.length;
  // for(i=0;i<numPupils;i++){
  //   if(leftPupils[i]&&rightPupils[i]&&leftEyes[i]&&rightEyes[i]){
  // let pupilPoint1=new Phaser.Geom.Point(leftEyes[i].x,leftEyes[i].y);
  // let pupilPoint2=new Phaser.Geom.Point(rightEyes[i].x,rightEyes[i].y);
  // let speed=Math.random()*1;
  // if(Phaser.Math.Between(1,9)==3){speed*=-1};
  //     Phaser.Actions.RotateAroundDistance(leftPupils[i], {x:leftEyes[i].x,y:leftEyes[i].y}, 9, 5);
  //     if(Phaser.Math.Between(1,9)==3){speed*=-1};
  //     Phaser.Actions.RotateAroundDistance(rightPupils[i], {x:rightEyes[i].x,y:rightEyes[i].y}, 9, 5);
  //   };
  // };
  // };
  // };
  //resize window
};
  }