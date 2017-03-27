// Powerup.js -- a class for floating powerups
var Powerup = function (game, x, y, powerupType, img) {
	// call different sprites based on type
	this.grabbable = true;


	if (!img){ img = 'orange' }
	this.powerupType = powerupType;
	//console.log(this.powerupType)
  	if (!this.powerupType){ this.powerupType = "weapon"}
	switch(this.powerupType){
		case "weapon":
			Phaser.Sprite.call(this, game, x, y, img);
			this.width = 50;
			this.height = 50;
			this.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this);
			this.pointValue = 250;
			this.startPoint = y;
      this.powerupSFX = game.add.audio('vo-blasterupgrade');
			break;
		case "lycocoin":
			Phaser.Sprite.call(this, game, x, y, 'lycocoin-spritesheet');
			this.animations.add('spin');
			this.animations.play('spin', 8, true);
			this.width = 50;
			this.height = 50;
			this.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this);
			this.pointValue = 1000;
			this.startPoint = y;
			break;
		case "speed":
			Phaser.Sprite.call(this, game, x, y, img);
			this.width = 50;
			this.height = 50;
			this.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this);
			this.pointValue = 250;
			this.startPoint = y;
      this.powerupSFX = game.add.audio('vo-speedup');
			break;

	}
   
}

Powerup.prototype = Object.create(Phaser.Sprite.prototype);
Powerup.prototype.constructor = Powerup;

/**
 * Automatically called by World.update
 */
Powerup.prototype.update = function() {
	if (this.powerupType != "lycocoin"){
    	this.y = this.startPoint + Math.sin(game.time.now/1000) * 10
	}
    if (this.x < (game.camera.x - 50)){ this.kill(); }
};

// A class for 'walls' and other obstacles
var Wall = function (game, x, y, width, height, wallsRef) {

	// this.game.load.image('wall_1_dark', 'assets/walls/wall_1_dark.png');
	// 	this.game.load.image('wall_1_light', 'assets/walls/wall_1_light.png');
	// 	this.game.load.image('wall_1_light_top', 'assets/walls/wall_1_light_top.png');
	// 	this.game.load.image('wall_1_dark_bottom', 'assets/walls/wall_1_dark_bottom.png');
	// 	this.game.load.image('wall_1', 'assets/walls/wall_1.png');
	//	this.game.load.image('wall_1_border', 'assets/walls/wall_1_border.png');


	var wall_data = [
		['wall_1_border','wall-1-pattern','wall_1_dark','wall_1_light','wall_1_light_top','wall_1_dark_bottom'],
		['wall_2_border','wall-2-pattern','wall_2_dark','wall_2_light','wall_2_light_top','wall_2_dark_bottom'],
		['wall-border-green','wall-3-pattern','wall_dark','wall_light','wall_light_top','wall_dark_bottom'],
	]

	var wall_border = wall_data[game.level - 1][0];
	var wall_pattern = wall_data[game.level - 1][1];
	var wall_dark = wall_data[game.level - 1][2];
	var wall_light = wall_data[game.level - 1][3];
	var wall_light_top = wall_data[game.level - 1][4];
	var wall_dark_bottom = wall_data[game.level - 1][5];

    Phaser.Sprite.call(this, game, x, y, wall_border);
    this.width = width;
    this.height = height;
    this.wallsRef = wallsRef
    this.anchor.setTo(0, 1);
    game.physics.arcade.enable(this);
    this.body.immovable = true; 
    this.child = game.add.tileSprite(x,y,100,100,wall_pattern)
    this.child.inner = true;
    // this.wallsRef.add(this.child);
    // this.wallsRef.bringToTop(this.child);
   	this.child.x = this.x + 10;
    this.child.y = this.y - 10;
   	this.child.anchor.setTo(0, 1);
    this.child.width = this.width - 20;
    this.child.height = this.height - 20;

    this.rightSide = game.add.tileSprite(x,y,100,100,wall_dark);
    this.rightSide.inner = true;
  //  this.wallsRef.add(this.rightSide);
//    this.wallsRef.bringToTop(this.rightSide);
   	this.rightSide.x = this.x + this.width - 18 - 10;
    this.rightSide.y = this.y-10;
   	this.rightSide.anchor.setTo(0, 1);
    this.rightSide.width = 18;
    this.rightSide.height = this.height - 20;


    this.leftSide = game.add.tileSprite(x,y,100,100,wall_light);
    this.leftSide.inner = true;
    //this.wallsRef.add(this.leftSide);
//    this.wallsRef.bringToTop(this.leftSide);
   	this.leftSide.x = this.x + 10;
    this.leftSide.y = this.y-10;
   	this.leftSide.anchor.setTo(0, 1);
    this.leftSide.width = 18;
    this.leftSide.height = this.height - 20;

    this.topSide = game.add.tileSprite(x,y,100,100,wall_light_top);
    this.topSide.inner = true;
    //this.wallsRef.add(this.topSide);
//    this.wallsRef.bringToTop(this.topSide);
   	this.topSide.x = this.x + 10;
    this.topSide.y = this.y-this.height+18+10;
   	this.topSide.anchor.setTo(0, 1);
    this.topSide.width = this.width - 20;
    this.topSide.height = 18;


    this.bottomSide = game.add.tileSprite(0,0,100,100,wall_dark_bottom);
    this.bottomSide.inner = true;
    //this.wallsRef.add(this.bottomSide);
//    this.wallsRef.bringToTop(this.bottomSide);
   	this.bottomSide.x = this.x + 10;
    this.bottomSide.y = this.y-10;
   	this.bottomSide.anchor.setTo(0, 1);
    this.bottomSide.width = this.width - 20;
    this.bottomSide.height = 18;


	// console.log(this.width) 
	// console.log(this.pattern.width)
    // pattern.width = this.width - 10;
    // pattern.height = this.height = 10;


}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.disposeCheck = function () {
    if (this.x + this.width < (game.camera.x - 50)) { 
      this.kill();
      
      if(this.child){
        this.child.kill();
        this.child.destroy();
      }

      if (this.topSide){
        this.topSide.kill();
        this.topSide.destroy();
      }

      if (this.bottomSide){
        this.bottomSide.kill();
        this.bottomSide.destroy();
      }

      if (this.leftSide){
        this.leftSide.kill();
        this.leftSide.destroy();
      }

      if (this.rightSide){
        this.rightSide.kill();
        this.rightSide.destroy();
      }
    }
};

/**
 * Automatically called by World.update
 */
Wall.prototype.update = function() {
	this.disposeCheck();
	// this.wallsRef.bringToTop(this.child);
	// this.wallsRef.bringToTop(this.rightSide);
	// this.wallsRef.bringToTop(this.leftSide);
	// this.wallsRef.bringToTop(this.topSide);
	// this.wallsRef.bringToTop(this.bottomSide);
};


// var FinalBoss = function (game, x, y, playerRef, enemiesRef, bulletsRef, explosionsRef, badBulletsRef) {
// 	Phaser.Group.call(this, game, game.world, 'FinalBoss', false, true, Phaser.Physics.ARCADE);
// 	this.refX = x;
// 	this.refY = y;
// 	this.playerRef = playerRef;
// 	this.badBulletsRef = badBulletsRef;
// 	this.stage = 0;
// 	this.enemiesRef = enemiesRef;
// 	this.bulletsRef = bulletsRef;
// 	this.explosionsRef = explosionsRef;
// 	this.explosions = game.add.group();
// 	this.badBullets = game.add.group();
// 	this.base = this.create(this.x, 300, 'finalboss-base');
// 	this.base.anchor.setTo(0.5,0.5);
// 	this.base.x = this.refX;
// 	this.base.body.immovable = true;
// 	this.base.body.setSize(200, 300, 0, 0)
// 	this.base.frame = 1;

// 	this.gem = this.create(this.x-100, 300, 'finalboss-gem');
// 	this.gem.anchor.setTo(0.5,0.5);
// 	this.gem.x = this.refX - 73;
// 	this.gem.body.immovable = true;
// 	//this.gem.body.setSize(200, 300, 0, 0)
// 	this.gem.frame = 6;
// 	this.gem.health = 200;
// 	this.gem.pointValue = 5000;

// 	this.counter = 0;
// 	this.counterRate = 0;
// 	this.absCounter = 0;
// 	  this.lastFire = 0;
//    this.fireChance =  100;
// 	this.base.y = this.refY;
// 	this.eyeGroup = game.add.group();

// 	this.positions = [
// 		{"x": this.refX + 35, "y": this.refY},
// 		{"x": this.refX - 75, "y": this.refY + 225},
// 		{"x": this.refX - 175, "y": this.refY},
// 		{"x": this.refX -75, "y": this.refY-225}
// 	]



// 	this.eyeOne = this.create(this.refX + 50, 300, 'finalboss-eye');
// 	this.eyeOne.anchor.setTo(0.5,0.5);
// 	this.eyeOne.slot = 0;
// 	this.eyeOne.health = 75;
// 	this.eyeOne.isEye = true;
// 	this.eyeOne.x = this.positions[0]["x"]
// 	this.eyeOne.y = this.positions[0]["y"]
// 	this.eyeOne.pointValue = 2000;
// 	this.eyeOne.invulnerable = false;
// 	this.eyeOne.body.immovable = true;
// 	this.eyeOne.frame = 2;
// 	this.eyeOne.lastFire = 0;
// 	this.eyeGroup.add(this.eyeOne)



// 	console.log("eyeone x is " + this.eyeOne.x)

// 	this.eyeTwo = this.create(this.refX + 50, 300, 'finalboss-eye');
// 	this.eyeTwo.anchor.setTo(0.5,0.5);
// 	this.eyeTwo.slot = 1;
// 	this.eyeTwo.health = 75;
// 	this.eyeTwo.isEye = true;
// 	this.eyeTwo.x = this.positions[1]["x"]
// 	this.eyeTwo.y = this.positions[1]["y"]
// 	this.eyeTwo.pointValue = 2000;
// 	this.eyeTwo.invulnerable = false;
// 	this.eyeTwo.body.immovable = true;	
// 	this.eyeTwo.lastFire = 0;
// 	this.eyeTwo.frame = 2;
// 	this.eyeGroup.add(this.eyeTwo)

// 	this.eyeThree = this.create(this.refX + 50, 300, 'finalboss-eye');
// 	this.eyeThree.anchor.setTo(0.5,0.5);
// 	this.eyeThree.slot = 2;
// 	this.eyeThree.health = 75;
// 	this.eyeThree.isEye = true;
// 	this.eyeThree.x = this.positions[2]["x"]
// 	this.eyeThree.y = this.positions[2]["y"]
// 	this.eyeThree.pointValue = 2000;
// 	this.eyeThree.invulnerable = false;
// 	this.eyeThree.body.immovable = true;
// 	this.eyeThree.lastFire = 0;
// 	this.eyeThree.frame = 2;
// 	this.eyeGroup.add(this.eyeThree)

// 	this.eyeFour = this.create(this.refX + 50, 300, 'finalboss-eye');
// 	this.eyeFour.anchor.setTo(0.5,0.5);
// 	this.eyeFour.slot = 3;
// 	this.eyeFour.health = 75;
// 	this.eyeFour.isEye = true;
// 	this.eyeFour.x = this.positions[3]["x"]
// 	this.eyeFour.y = this.positions[3]["y"]
// 	this.eyeFour.pointValue = 2000;
// 	this.eyeFour.invulnerable = false;
// 	this.eyeFour.body.immovable = true;
// 	this.eyeFour.lastFire = 0;
// 	this.eyeFour.frame = 2;
// 	this.eyeGroup.add(this.eyeFour)

//     this.eyes = [this.eyeOne, this.eyeTwo, this.eyeThree, this.eyeFour]
//     this.eyeGroup.callAll('animations.add', 'animations', 'close', [2,1,0], 5, false);
//     this.eyeGroup.callAll('animations.add', 'animations', 'open', [0,1,2], 5, false);
//     this.eyeGroup.callAll('animations.add', 'animations', 'getHurt', [4,2], 15, false);
//   //

//   	this.gem.animations.add("getHurt", [8,6], 15, false);

//      // this.eyeGroup.callAll('animations.play', 'animations', 'close');
//     this.add(this.eyeGroup)
//     this.add(this.badBullets);
//     this.add(this.explosions);
// }

// FinalBoss.prototype = Object.create(Phaser.Group.prototype);
// FinalBoss.prototype.constructor = FinalBoss;

// FinalBoss.prototype.disposeCheck = function () {
//    // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
// };

// FinalBoss.prototype.stageChange = function () {
// 	console.log("STAGE CHANGIN!")
// 	this.eyeGroup.callAll('animations.play', 'animations', 'close');
// 	var tween = game.add.tween(this.eyeGroup).to( {alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
//    game.time.events.add(750, function(){this.stage = (this.stage + 1) % 2}, this);
//    game.time.events.add(750, function(){ this.eyeGroup.callAll('animations.play', 'animations', 'open'); game.add.tween(this.eyeGroup).to( {alpha: 1 }, 500, Phaser.Easing.Linear.None, true) }, this);
	
//    // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
//     // for (i = 0; i < this.eyes.length; i++) { 
//     // 	var currentEye = this.eyes[i];
    	
//     // 	var tween = game.add.tween(currentEye).to( {alpha: 0 }, 500, "Linear")
//     // 	.to( { alpha: .01}, 5000, "Linear")
//     // 	.to( { alpha: 1}, 500, "Linear")
//     // 	.start();
    	  
    
    	
    
//     // }

    	
// };

// FinalBoss.prototype.collisionCheck = function (bullet, enemy) {
//    // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
//    console.log(enemy.invulnerable);
//    	  if (enemy.alpha == 1){
//    		var sg = this;
//     	if (bullet.muted){
//     		var explosion = new Explosion(game, bullet.x, bullet.y, 1, true);
//     	} else {
//     		var explosion = new Explosion(game, bullet.x, bullet.y, 1, false); 
//     	}
//      	this.explosions.add(explosion);
   
//    		if (enemy.isEye && enemy.frame != 0){
//     		enemy.health -= 1;
//     		console.log("enemy in slot " + enemy.slot + " now has health " + enemy.health);
//     		console.log("enemy alpha was " + enemy.alpha)
//     		enemy.play('getHurt');	
    	
//     		//sg.player.health += .2;
//     		if (enemy.health <= 0){
//       			game.score += enemy.pointValue; 
//       			enemy.kill();
//     		}
// 		} 

		
//   	}	
//   	bullet.kill();
//  },

// FinalBoss.prototype.gemHit = function (gem, bullet) {
//    // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
  
   	 
//    		var sg = this;
//     	if (bullet.muted){
//     		var explosion = new Explosion(game, bullet.x, bullet.y, 1, true);
//     	} else {
//     		var explosion = new Explosion(game, bullet.x, bullet.y, 1, false); 
//     	}
//      	this.explosions.add(explosion);
   

//    		if (gem.frame != 0){
//     		gem.health -= 1;
//     		console.log("gem damaged! health now " + gem.health);
//     		gem.play('getHurt');	
    	
//     		//sg.player.health += .2;
//     		if (gem.health <= 0){
//     			//this is where you trigger the big explosion
//       			game.score += gem.pointValue; 
//       			//enemy.kill();
//     		}
// 		} 

		
//   	console.log("trying to kill bullet")
//   	bullet.kill();
//  },



// /**
//  * Automatically called by World.update
//  */
// FinalBoss.prototype.update = function() {
//     this.disposeCheck();
//     //console.log(this.positions[0]["x"])
//      //
//      this.absCounter += 1;
//      this.absCounter %= 18000;
//       game.physics.arcade.collide(this.bulletsRef, this.gem, this.gemHit, null, this);
  	 
//   	if (this.eyeGroup.alpha == 1){
//      game.physics.arcade.collide(this.bulletsRef, this.eyeGroup, this.collisionCheck, null, this);
//  	}

//      if (this.absCounter % 600 == 0){
//      	this.stageChange();
//      }

//      if (this.stage == 0) {
//      	if (this.absCounter % 120 == 0){
// 	    	for (i = 0; i < this.eyes.length; i++) { 
// 	    		var currentEye = this.eyes[i];
// 	    		// tween every eye to its new slot
// 	    		currentEye.slot = (currentEye.slot + 1) % 4;
// 	    		var tween = game.add.tween(currentEye).to( { x: this.positions[currentEye.slot]["x"], y: this.positions[currentEye.slot]["y"] }, 250, "Linear", true);
// 	    	}
//     	}


//     	if (this.absCounter % 180 == 0){
//     		 // var chanceToFire = Math.random()*100;
//        //    	if (chanceToFire < 5 && this.game.time.time > this.lastFire + 2000){
//           //  this.blaster.play();

//           for (i = 0; i < this.eyes.length; i++) { 
// 	    		var currentEye = this.eyes[i];
// 	    		if (currentEye.alive){
//             var test = new BigBullet(game=game, x=currentEye.x, y=currentEye.y);
//             this.badBulletsRef.add(test);
//         }
//         }
//            // this.bulletsRef.add(test);
//            // this.lastFire = this.game.time.time;
//           //}
//     	}

//      } else if (this.stage == 1){
//      	  	this.counter += this.counterRate;
//     		this.counter %= 18000;
//     		this.counterRate = Math.sin(this.absCounter/(300))*20
//     	//	console.log(this.counterRate)
//      	 for (i = 0; i < this.eyes.length; i++) { 
//     		var currentEye = this.eyes[i];
//     		// tween every eye to its new slot
//     		this.counter += this.counterRate;
//     		this.counterRate = Math.sin(this.absCounter/(300))*10
//     		//console.log(this.counterRate)
//      		currentEye.x = this.refX - 75 + Math.sin((this.counter + i*500)/(300))*100;
//      		currentEye.y = this.refY +  Math.cos((this.counter + i*500)/(300))*225;
//      		if (currentEye.alive && this.eyeGroup.alpha == 1){
//      		//	console.log("pondering shooting");
//      			var chanceToShoot = Math.random()*100;
// 			    if (chanceToShoot < this.fireChance && this.game.time.time > currentEye.lastFire + 550){ //make this dynamic
//         			var badBullet = new Bullet(game=game, x=currentEye.x, y=currentEye.y, baseVelocity=null, angle=null, img='badbullet-sprite', sizeX=40, sizeY=18);
//         			//this.blaster.play();
//         		//	console.log("firing")
//         			badBullet.body.velocity.x = -350;
//         			badBullet.tracking = true;
//         			 this.badBulletsRef.add(badBullet);
//         			 currentEye.lastFire = game.time.time;
//         		}
//      		}
//     	}

//     	for (i = 0; i < this.eyes.length; i++) { 
//     	  if (this.eyes[i].health <= 0){ 
//     	  	this.eyes[i].kill();
//     	  }
//     	}

//      }
    

   



