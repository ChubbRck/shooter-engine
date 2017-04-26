// Player.js: a class for an individual player
var Player = function (game, x, y, bulletsRef, playerID, controllerID) {

    Phaser.Sprite.call(this, game, 500, 200, 'blake-sdprite-v3');
    this.bulletsRef = bulletsRef;
    this.playerID = playerID;
    this.controllerID = controllerID;
    this.gameDifficulty = game.difficulty
    this.frame = 0;
    this.animations.add('walk');
    this.basicShot = new BasicShot(game, this.bulletsRef);
    this.beam = new Beam(game, this.bulletsRef);
    this.triple = new Triple(game, this.bulletsRef);
    this.twin = new Twin(game, this.bulletsRef);
    this.missile = new Missile(game, this.bulletsRef);
    this.ring = new Ring(game, this.bulletsRef);
    this.anchor.setTo(0.5,0.5);
    this.lycocoins = 0;
    this.lastFire = 0;
    this.weaponType = 1;
    //this.accel = [600, 800, 1000, 1100]
    //this.maxVel = [300, 400, 500, 550]
    //this.drag = [5000, 7000, 9000, 12000]
    
    this.accel = [5000, 5000, 5000, 5000]
    this.maxVel = [600, 600, 600, 600]
    this.drag = [5000, 7000, 9000, 12000]
    this.health = 5;
    this.canMove = true;
    this.godMode = false;
    this.invincible = false;
    this.invincibleTime = 0;
    
    // new vars
    this.score = 0;
    this.lives = 3;


    game.physics.arcade.enable(this);
    this.body.setSize(60, 60, 0, -15)

    this.body.maxVelocity.x= this.maxVel[game.playerSpeed];
    this.body.maxVelocity.y= this.maxVel[game.playerSpeed];
    this.body.drag.x = this.drag[game.playerSpeed];
    this.body.drag.y = this.drag[game.playerSpeed];
    this.body.collideWorldBounds = true;   
    this.body.bounce.y = 0.6;
    this.body.bounce.x = 0.6;


    this.emitter = game.add.emitter(2000, 300, 500);
    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
    this.emitter.makeParticles(['bubble-sm', 'bubble-md', 'bubble-lg']);
    this.emitter.gravity = -200;
    // this.emitter.maxParticleSpeed.set(1, 300);
    this.emitter.setAlpha(1.0, 0);
    this.emitter.start(false, 1000, 400);
    this.emitter.setXSpeed(-20, 20);
    this.emitter.setYSpeed(-20, 20);

    //create fire button
    // this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.T);
    // this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    // this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    // this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    // this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    // this.fireButton.onDown.add(function(){this.fireBullet(false)}, this);
    this.assignControls(1)
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------
Player.prototype.render = function(){
  game.debug.body(this);
}


Player.prototype.update = function() {

    this.checkInput();
    this.manageFrames();
    this.updateEmitter();
    this.enforceBounds();
    // TODO:
    //ManageBonus();
    
};

// ----------------------------------------------------
// Helper functions for Player.js
// ----------------------------------------------------

Player.prototype.checkInput = function(){
 
    if (this.canMove){
      this.body.acceleration.x = 0;
      this.body.acceleration.y = 0;

      if (this.upKey.isDown){
        this.body.acceleration.y = -1 * this.accel[game.playerSpeed];
      } else if (this.downKey.isDown) {
        this.body.acceleration.y = this.accel[game.playerSpeed];
      }   

      if (this.leftKey.isDown){
        this.body.acceleration.x = -1 * this.accel[game.playerSpeed];
      } else if (this.rightKey.isDown) {
        this.body.acceleration.x = this.accel[game.playerSpeed];
      } else {
        if (this.body.velocity.x <65*game.difficulty && this.body.velocity.x >= 0 && !game.paceStopped){
          this.body.velocity.x += 200;
         
        }
         // this.body.x += 1
      }

      if(this.fireButton.isDown){
        this.fireBullet(true);
      }
    }
}

Player.prototype.manageFrames = function(){

    var accel = this.body.acceleration.x;

    if (accel < 0){
      this.frame = 2;
    } else if (accel > 0){
      this.frame = 0;
    } else if (accel == 0){
      this.frame = 1;
    }

}

Player.prototype.enforceBounds = function(){
  if (this.x < game.camera.x){
    this.x = game.camera.x;
  }

  if (this.x > game.camera.x + game.width){
    this.x = game.camera.x + game.width
  }

  if (this.y > game.height){
    this.y = game.height
  }
    
  if (this.y < 0){
    this.y = 0
  }
}

Player.prototype.assignControls = function(whichPlayer){

  // Assign the appropriate keys to this player;
  switch (whichPlayer){
    case 1:
      this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
      // this.leftKey.onDown.add(this.moveLeft, this);
      
      this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
      // this.rightKey.onDown.add(this.moveRight, this);

      this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
      // this.upKey.onDown.add(this.moveUp, this);

      this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
      // this.downKey.onDown.add(this.moveDown, this);

      this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.T);
      // this.fireButton.onDown.add(function(){this.fireBullet(false)}, this);
      break;
      case 2:
      break;
      case 3:
      break;
      case 4:
      break;
  }
}

Player.prototype.updateEmitter = function(){
    this.emitter.x = this.x - this.width/2 + 10;
    this.emitter.y = this.y - this.height/2 + 10;
    
    this.emitter.forEachAlive(function(p){  
      p.alpha= p.lifespan / 2000;
    });
}

Player.prototype.fireBullet = function(isHeld){

      // TODO: this.weaponType needs to get values from the game to persist data between levels
      console.log(game.weaponType)
      if (game.weaponType == 1){ // Basic Vitamin A gun 
        this.basicShot.fire(this, isHeld);
      }

      if (game.weaponType == 2){
        this.triple.fire(this, isHeld);
        this.twin.fire(this, isHeld);   
      }

      if (game.weaponType == 3){
        this.triple.fire(this, isHeld);
        this.twin.fire(this, isHeld);
        this.missile.fire(this, isHeld);           
      }

      if (game.weaponType ==4){
        this.beam.fire(this, isHeld);
        this.missile.fire(this, isHeld);
        this.triple.fire(this, isHeld);
      }

      if (game.weaponType >= 5){
        this.ring.fire(this, isHeld);
        this.missile.fire(this, isHeld);
        this.triple.fire(this, isHeld);
      }
  }