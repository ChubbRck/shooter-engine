// Player.js: a class for an individual player
var Player = function (game, x, y, bulletsRef, playerID, controllerID) {

    Phaser.Sprite.call(this, game, 500, 200, 'blake-sprite-v3');
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


Player.prototype.update = function() {

    this.checkInput();
    this.manageFrames();

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

    // if (this.canMove){
     

    //   if (this.upKey.isDown){
    //     this.body.velocity.y = -1 * 800;
    //   } else if (this.downKey.isDown) {
    //     this.body.velocity.y = 1 * 300;
    //   }   

    //   if (this.leftKey.isDown){
    //     this.body.velocity.x = -1 * 800;
    //   } else if (this.rightKey.isDown) {
    //     this.body.velocity.x = 1 * 800;
    //   } else {
    //     if (this.body.velocity.x <65*game.difficulty && this.body.velocity.x >= 0 && !game.paceStopped){
    //       this.body.velocity.x += 20;
         
    //     }
    //      // this.body.x += 1
    //   }

    //   if(this.fireButton.isDown){
    //     this.fireBullet(true);
    //   }
    // }

  

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

Player.prototype.moveLeft = function(){
console.log("left!")
}

Player.prototype.fireBullet = function(isHeld){

      // these need to be changed to player variables!!!
      if (game.weaponType == 1){ // Basic Vitamin A gun 
      
        
           this.basicShot.fire(this, isHeld);
          // this.missile.fire(this);
      
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