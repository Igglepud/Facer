let widgetScene = new Phaser.Scene("Widget");

widgetScene.init = function () {


};

widgetScene.preload = function () {


};


widgetScene.create = function () {
   (this.xPos = 800), (this.ypos = 450);
   this.numFaces = 1;
 for (i = 0; i < this.numFaces; i++) {
      
        this.rect = this.add.rectangle(
          800,
          450,
          800,
          800,
          Phaser.Math.Between(0x000000, 0xffffff)
        );
        this.rect.gameID = i;
     
      
      this.circle1 = this.add.circle(
        this.rect.x,
        this.rect.y,
        400,
        Phaser.Math.Between(0x000000, 0xffffff)
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

    };

  this.face = this.add.container();
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

  this.face.setScale(.25)

   this.respawnTimer = this.time.addEvent({
     delay: 3000,
     repeat: -1,
     callback: function () {
       let objects = this.sys.displayList.getChildren();
       let numObjects = objects.length;
       for (i = 0; i < numObjects; i++) {
         if (objects[i]) {
           objects[i].destroy();
         }
       }

       this.scene.restart();
     },
     callbackScope: this,
   });

};
widgetScene.update = function () {

};
