// Enemy.js -- contains classes for all enemy variants.

var Enemy = function (game, x, y, launchOffset, img, baseVelocity) {
    
  // All enemies begin asleep
  this.asleep = true;
    
  var img = img
  if (!img){ img = 'straight-enemy' }

  this.baseVelocity = !baseVelocity ? this.baseVelocity = -50 : this.baseVelocity = baseVelocity;
  this.launchOffset = !launchOffset ? this.launchOffset = 0 : this.launchOffset = launchOffset;
  
  Phaser.Sprite.call(this, game, x, y, img);
  this.renderable = false;
  this.game = game;
  this.width = 60;
  this.height = 60;
  this.smoothed = false;
  this.health = 1;
  this.anchor.setTo(0.5, 0.5);
  this.x = x;
  this.y = y;
  this.pointValue = 100;
  this.rotateFactor = baseVelocity/50;
  game.physics.arcade.enable(this);
};

// Basic parent enemy class
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.launch = function (){
  this.renderable = true;
  this.body.velocity.x = this.baseVelocity;
};

Enemy.prototype.checkForLaunch = function(){
  if (this.x - this.game.camera.x <= (game.width + 50) + this.launchOffset && this.asleep){
    this.asleep = false;
    this.launch();
  }
};

Enemy.prototype.disposeCheck = function () {
  if (this.x < (game.camera.x - 50) || this.health <= 0){ 
    this.kill();
    if (this.bossFlag == true){
      game.levelBeaten = true;    
    }
  }
};

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ this.angle += 1 * (this.rotateFactor); } 
};

// Basic enemy that does not move
var Chiller = function (game, x, y){
  this.video = game.add.video('test2webm');
  this.video.play(true);
  Enemy.call(this, game, x, y, 0, this.video, 0);
  this.baseVelocity = 0;
  this.bulletsRef = null;
  this.doesFire = false;
  this.fireChance = 33;
  this.lastFire = 0;
  this.rotateRate = 0;
  this.enemyType = "chiller";
  this.blaster = game.add.audio('testblip1', 0.2);

}

Chiller.prototype = Object.create(Enemy.prototype);
Chiller.prototype.constructor = Chiller;

Chiller.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){
    this.angle += this.rotateRate; 

    if(this.doesFire){
      var chanceToShoot = Math.random()*100;
      if (chanceToShoot < this.fireChance && this.game.time.time > this.lastFire + Math.random()*300){ //make this dynamic
        var badBullet = new Bullet(game=game, x=this.x, y=this.y, baseVelocity=null, angle=null, img='badbullet-sprite');
        this.blaster.play();
        badBullet.body.velocity.x = -10;
        badBullet.body.velocity.y = -10;
        game.physics.arcade.velocityFromAngle(this.angle, 400, badBullet.body.velocity);
        badBullet.tracking = true;
        this.lastFire = this.game.time.time;
        this.bulletsRef.add(badBullet);
      }
    }
  }
}


// Basic enemy that moves forwards along a platform and falls
var Runner = function (game, x, y, dir){
  Enemy.call(this, game, x, y, 0, 'angle-enemy', 0); 
  this.body.gravity.y = 2000;
  this.dir = dir;
}

Runner.prototype = Object.create(Enemy.prototype);
Runner.prototype.constructor = Runner;

Runner.prototype.launch = function(){
  this.body.velocity.x = -300 * this.dir;
  this.renderable = true;
}

Runner.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
}

// Enemy that flanks and then moves sharply toward the player
var Flanker = function (game, x, y, launchOffset, baseVelocity, playerRef){
  Enemy.call(this, game, x, y, launchOffset, 'angle-enemy', baseVelocity);
  this.playerRef = playerRef
  this.hasStruck = false;
  this.rotateRate = baseVelocity/10;
}

Flanker.prototype = Object.create(Enemy.prototype);
Flanker.prototype.constructor = Flanker;

Flanker.prototype.launch = function(){
  this.body.velocity.x = this.baseVelocity;
  this.renderable = true;
}

Flanker.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ 
    this.angle += this.rotateRate; 
    if (Math.abs(this.x - this.playerRef.x) < 50){
      if (this.hasStruck){ return; }
      this.hasStruck = true;
      if (this.y >= this.playerRef.y) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 1.5 * this.baseVelocity;
      } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = -1.5 * this.baseVelocity;
      }
    }
  }
}

// Basic enemy that drops when enemy is near
var Dropper = function (game, x, y, launchOffset, playerRef){
  Enemy.call(this, game, x, y, 0, 'drop-enemy', 0);
  this.baseVelocity = 0;
  this.player = playerRef;
  this.enemyType = "dropper";
  this.body.gravity.y = 0;
}

Dropper.prototype = Object.create(Enemy.prototype);
Dropper.prototype.constructor = Dropper;

Dropper.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){
    if (Math.abs(this.x - this.player.x) < 100 && this.y <= this.player.y){
      this.body.gravity.y = 300;
    }
  }
}

// Enemy that crosses path (change in y-gravity)
var Crosser = function (game, x, y, launchOffset, img, baseVelocity, dirMod){
  Enemy.call(this, game, x, y, launchOffset, 'cross-enemy', baseVelocity); 
  this.rotateRate = 5;
  this.enemyType = "crosser";
  this.dirMod = dirMod;
}

Crosser.prototype = Object.create(Enemy.prototype);
Crosser.prototype.constructor = Crosser;

Crosser.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ 
    this.angle += this.rotateRate;
    this.body.gravity.y += (this.dirMod * .8);
  }
}

// Enemy that moves up and down in place
var UpAndDown = function (game, x, y, whichType){
  Enemy.call(this, game, x, y, 0, 'wave-enemy', 0);
  this.baseVelocity = 0;
  this.whichType = whichType;
  if (this.whichType){ this.whichType = 1};
  this.rotateRate = 5 + Math.random()*3;
  this.offset = Math.random()*1000;
  this.whichType = whichType;
  this.pointValue = 200;
  this.counter = 0;
}

UpAndDown.prototype = Object.create(Enemy.prototype);
UpAndDown.prototype.constructor = UpAndDown;

UpAndDown.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ 
    this.counter += 25;
    this.angle += this.rotateRate; 
    switch (this.whichType){
      case 1:
        this.body.velocity.y = Math.sin((this.counter)/1000) * 300;
      break;
      default:
        this.body.velocity.y = Math.sin((this.counter)/1000) * 300;
      break;
    }
  }
}

// Enemy that bounces and is affected by gravity.
var Bouncer = function (game, x, y, target, gravFactor){
  Enemy.call(this, game, x, y, 0, 'bounce-enemy', 0);
  game.physics.arcade.enable(this);
  if (!gravFactor){
    this.body.gravity.y = 500;
  } else {
    this.body.gravity.y = -500;
  }
  this.baseVelocity = 0;
  this.targ = target;
  this.pointValue = 200;
  this.body.bounce.y = 1.0;
  this.freq = 1000+Math.random()*3000;
  this.markTime = game.time.time; 
  this.body.velocity.x = Math.random()*0;
  this.body.collideWorldBounds=true;
}

Bouncer.prototype = Object.create(Enemy.prototype);
Bouncer.prototype.constructor = Bouncer;

Bouncer.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ 
    if (game.time.time - this.markTime >= this.freq){
      // choose a new x velocity
      this.body.velocity.x = Math.random()*200-100;
      this.markTime = game.time.time;
    }
    if (Math.abs(this.targ.x - this.x) <= 200){
      this.body.bounce.y = 1.1;
    }
    else {
      this.body.bounce.y = .98;
    }
  }
}

// Enemy that moves along a predetermined pattern
var EnemyExt = function (game, x, y, launchOffset, baseVelocity) {
  Enemy.call(this, game, x, y, launchOffset, 'baddie-red', baseVelocity);
  if (!baseVelocity){ this.baseVelocity = -120; }
};

EnemyExt.prototype = Object.create(Enemy.prototype);
EnemyExt.prototype.constructor = EnemyExt;

/**
 * Automatically called by World.update
 */
 EnemyExt.prototype.update = function() {

    this.disposeCheck();
    this.checkForLaunch();
    if(!this.asleep){
      this.angle += -2;
      if (this.x < game.camera.x + 800){
        this.body.velocity.x = 10;
        this.body.velocity.y = -150;
      }
      if (this.y < 300){
          this.body.velocity.x = -120;
          this.body.velocity.y = 0;
      }
   }
};

// Enemy that moves in a sinewave pattern
var EnemySine = function (game, x, y, launchOffset, baseVelocity) {
  Enemy.call(this, game, x, y, launchOffset, 'wave-enemy', baseVelocity);
  this.startPoint = y;
  this.enemyType = "sine";
  this.pointValue = 200;
};

EnemySine.prototype = Object.create(Enemy.prototype);
EnemySine.prototype.constructor = EnemySine;

EnemySine.prototype.launch = function(){ this.body.velocity.x = this.baseVelocity; this.renderable = true; }

/**
 * Automatically called by World.update
 */
EnemySine.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){
    this.angle += -5; // Rotate based on speed?
    this.y =  this.startPoint + Math.sin(this.x/100) * 100
  }
};

// Enemy that homes in on the player
var Seeker = function (game, x, y, target, baseVelocity, img) {
  if (!img){ this.img = 'seek-enemy-pink' } else {this.img = img};
  Enemy.call(this, game, x, y, 0, this.img, baseVelocity);
  this.targ = target;
  this.pointValue = 200;
  this.body.maxVelocity.x= Math.abs(this.baseVelocity * 1.25) + Math.random()*50;
  this.body.maxVelocity.y= Math.abs(this.baseVelocity * 1.25) + Math.random()*50;
  this.maxVelX = Math.abs(this.baseVelocity) + Math.random()*50; 
  this.maxVelY = Math.abs(this.baseVelocity) + Math.random()*50; 
  var framerate = 2 + Math.floor(Math.random()*15);
  this.animations.add('go', [0,1], framerate, true);
  this.animations.play('go');
};

Seeker.prototype = Object.create(Enemy.prototype);
Seeker.prototype.constructor = Seeker;

/**
 * Automatically called by World.update
 */
Seeker.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ this.rotation = Math.atan2 (this.body.velocity.y,this.body.velocity.x) }     
  this.seekPlayer();
};

Seeker.prototype.seekPlayer = function(){
  if (this.x < game.camera.x + game.width + 100){
    if (this.targ.x < this.x && this.body.velocity.x > -1*this.maxVelX ){
      this.body.velocity.x += -1* (Math.abs(this.baseVelocity*.05))-Math.random()*(Math.abs(this.baseVelocity*.05));
    }
    if (this.targ.x > this.x && this.body.velocity.x > -1*this.maxVelX ){
      this.body.velocity.x += -1*(Math.abs(this.baseVelocity*.03))-Math.random()*(Math.abs(this.baseVelocity*.05));
    }
    if (this.targ.y > this.y && this.body.velocity.y < this.maxVelY ){
      this.body.velocity.y += (Math.abs(this.baseVelocity*.06))+Math.random()*(Math.abs(this.baseVelocity*.05));
    }
    if (this.targ.y < this.y && this.body.velocity.y > -1*this.maxVelY){
      this.body.velocity.y += -1 * (Math.abs(this.baseVelocity*.06))-Math.random()*(Math.abs(this.baseVelocity*.05));
    }
  }
}
  
// Enemy that homes in on the player and dodges bullets
var SeekerAndDodger = function (game, x, y, target, bulletsRef, baseVelocity) {
  Seeker.call(this, game, x, y, target, baseVelocity, 'dodge-enemy');
  this.targ = target;
  this.bulletsRef = bulletsRef
  this.maxVelX = Math.abs(this.baseVelocity) + Math.random()*Math.abs(this.baseVelocity/2);
  this.maxVelY = Math.abs(this.baseVelocity)+ Math.random()*Math.abs(this.baseVelocity/2); 
  this.body.maxVelocity.x= Math.abs(this.baseVelocity)*2 + Math.random()*Math.abs(this.baseVelocity)/2;
  this.body.maxVelocity.x= Math.abs(this.baseVelocity)*2 + Math.random()*Math.abs(this.baseVelocity)/2;
  this.body.drag.x = 50
  this.body.drag.y = 50
  this.pointValue = 400;
};

SeekerAndDodger.prototype = Object.create(Seeker.prototype);
SeekerAndDodger.prototype.constructor = SeekerAndDodger;

SeekerAndDodger.prototype.dodgeBullets = function(){
  // Iterate through all active bullets. If near, move in the opposite direction.
  this.bulletsRef.forEach(function(bullet) {
    if (Phaser.Math.distance(this.x , this.y , bullet.x , bullet.y) <= 150 + (Math.abs(this.baseVelocity)-100)/3){
      var angleRad = game.physics.arcade.angleBetween(this, bullet);
      var angleDeg = angleRad * (180/Math.PI);
      // Get a normalized vector that describes the distance to the bullet.
      var newVel = game.physics.arcade.velocityFromAngle(angleDeg, 1);
      // Weight the y axis 'jump' more heavily to reward the player for direct hits.
      this.body.velocity.x -= newVel.x * Math.abs(this.baseVelocity)*3/4;
      this.body.velocity.y -= newVel.y * Math.abs(this.baseVelocity)*5/4;
    } 
  }, this);
}

/**
 * Automatically called by World.update
 */
SeekerAndDodger.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){
    this.seekPlayer();
    this.dodgeBullets(); 
  }
}


// Enemy that moves forward, going through gaps in walls;
var Pathfinder = function (game, x, y, wallsRef, baseVelocity, whichType) {
  Enemy.call(this, game, x, y, 0,'angle-enemy', baseVelocity);
  this.wallsRef = wallsRef;
  this.pointValue = 200;
  this.whichType = whichType;
  this.body.maxVelocity.x= Math.abs(this.baseVelocity * .75)// + Math.random()*50;  //was .65 for good comrpomise // was .75 for first guy
  this.body.maxVelocity.y= Math.abs(this.baseVelocity * 1) // was 2
  this.maxVelX = Math.abs(this.baseVelocity) + Math.random()*50; 
  this.maxVelY = Math.abs(this.baseVelocity) + Math.random()*50; 
  if (this.whichType == 2){ this.body.drag.y = 1000 } // was 600
};

Pathfinder.prototype = Object.create(Enemy.prototype);
Pathfinder.prototype.constructor = Pathfinder;

/**
 * Automatically called by World.update
 */
Pathfinder.prototype.update = function() {
  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){ this.rotation = Math.atan2 (this.body.velocity.y,this.body.velocity.x);  this.pathfind(); }      
};

Pathfinder.prototype.pathfind = function(){
  var totalVel;
  var threatDetected = false;
  this.wallsRef.forEach(function(wall) {
    if (this.x - (wall.x + wall.width/2) > 0 && this.x - (wall.x + wall.width/2) < 400){ //was 400
      if (!wall.inner){
        // a wall is approaching. Find its top and bottom;  
        var wallTop = wall.y - wall.height;
        var wallBottom = wall.y;
        if (wallTop == 0){
          if (this.y >= wallTop && this.y <= wallBottom + 50 ){
            threatDetected = true;
            if (this.whichType == 1){
              this.body.velocity.y = 200;
            } else if (this.whichType == 2){
              this.body.acceleration.y = 400;
            }
          }
        } else {
          if (this.y >= wallTop - 50 && this.y <= wallBottom ){
            threatDetected = true;
            if (this.whichType == 1){
              this.body.velocity.y = -200;
            } else if (this.whichType == 2){
              this.body.acceleration.y = -400;
            }
          }
        }
      }
    } 
  }, this);

  if (!threatDetected){
    this.body.velocity.x = this.baseVelocity;
    if (this.whichType == 1){
      this.body.velocity.y = 0;
    } else if (this.whichType == 2){
      this.body.acceleration.y = 0;
    }
  }
}
  
// Basic MiniBoss that appears on screen, matches camera speed, follows player, and blasts at him/her.
var MiniBoss = function (game, x, y, target, bulletsRef, behaviorType, img){
  this.img = img
  Enemy.call(this, game, x, y, 0, this.img, 0);
  this.baseVelocity = 0;
  this.behaviorType = behaviorType;
  this.health = 100; 
  this.blaster = game.add.audio('bosslaser', 0.2);
  if (this.behaviorType == 2){
      this.health = 50; 
  }
  this.dying = false;
  this.width = 150;
  this.height = 150;
  this.isBoss = true;
  this.targ = target;
  this.enemyType = "miniboss";
  this.body.drag.x = 200;
  if (!this.launchVel){ this.launchVel = -400; }
  this.body.drag.y = 20;
  this.bulletsRef = bulletsRef;
  this.body.maxVelocity.y = 100;
  this.pointValue = 2000;
  this.baseVelocity = 200;
  this.matchedSpeed = false;
  this.hasMatched = false;
  this.body.collideWorldBounds=false;
  this.lastFire = 0;
  this.hurtFrame = 1;
  this.retreating = false;
  this.retreatPoint = 0;
  this.counter = 0;
  this.retreatEvent;
  this.pace = game.levels[game.level - 1]["pace"];
  this.lockPoint = 0;
  this.animations.add('hurt', [0,2], 30, true);
  this.animations.add('unhurt', [0], 30, true);
  this.animations.play('unhurt');
}

MiniBoss.prototype = Object.create(Enemy.prototype);
MiniBoss.prototype.constructor = MiniBoss;

MiniBoss.prototype.launch = function (){
  this.body.velocity.x = this.launchVel;
  this.launchTime = this.game.time.time;
  this.retreatEvent = game.time.events.add(this.retreatPoint*1000, this.retreat, this);
  this.renderable = true;
}
MiniBoss.prototype.disposeCheck = function () {
  if (this.x < (game.camera.x - 50) || this.health <= 0){ 
    if (this.bossFlag == true){
      game.levelBeaten = true;    
    }
  }
};

MiniBoss.prototype.retreat = function(){
  this.retreating = true;
}

MiniBoss.prototype.update = function() {

  if (this.matchedSpeed){
    this.counter += 5;
  }
  if (this.health < 25 && !this.hurt){
    this.hurt = true;
    this.animations.play('hurt');
  }

  this.disposeCheck();
  this.checkForLaunch();
  if (!this.asleep){
    this.angle += 5
    var distanceToPlayer = Math.abs(this.y - this.targ.y);
    if (this.health <= 0 && !this.dying){ 
      this.dying = true;
      if (this.retreatEvent){
        game.time.events.remove(this.retreatEvent);
      }
      var explosion = new LargeExplosion(game, this.x, this.y, 8, 150);
      //fade out and then kill 
      
      var tween = game.add.tween(this).to( {alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
      tween.onComplete.add(function(){this.kill()}, this);
      
    }
    if (Math.abs(this.body.velocity.x) < 1 && !this.matchedSpeed){
      this.matchedSpeed = true;
      this.lockPoint = this.x - game.camera.x;
    }
    if (this.matchedSpeed && !this.retreating){
      //this.x += this.pace ;
      //
      this.x = game.camera.x + this.lockPoint;
    }

    switch(this.behaviorType){
      case 1:
        if (this.dying){ return; }
        if (distanceToPlayer >= 100 && this.matchedSpeed){
          if (this.y > this.targ.y){
            this.body.acceleration.y = -200;
          } else if (this.y < this.targ.y){
            this.body.acceleration.y = 200;
          } 
        } else {
          this.body.acceleration.y = 0;
          //chance to fire
          var chanceToFire = Math.random()*100;
          if (chanceToFire < 5 && this.game.time.time > this.lastFire + 2000){
            this.blaster.play();
            var test = new BigBullet(game=game, x=this.x, y=this.y);
            this.bulletsRef.add(test);

            this.lastFire = this.game.time.time;
          }
        }   
      break;

      case 2:
      // Don't follow the player, just fire 
        if (this.dying){ return; }
        var chanceToFire = Math.random()*100;
        if (chanceToFire < 5 && this.game.time.time > this.lastFire + 3500){
          var test = new BigBullet(game=game, x=this.x, y=this.y);
          this.blaster.play();
          this.bulletsRef.add(test);
          this.lastFire = this.game.time.time;
        }
      break;  

      case 3: 
       if (this.dying){ return; }
       if (this.matchedSpeed){
          
          this.body.velocity.y =  -1 * Math.sin(this.counter/200)*200;
        
        
          //chance to fire
          var chanceToFire = Math.random()*100;
          if (chanceToFire < 5 && this.game.time.time > this.lastFire + 2000){
            this.blaster.play();
            var test = new BigBullet(game=game, x=this.x, y=this.y);
            this.bulletsRef.add(test);
            this.lastFire = this.game.time.time;
          }
        }   

      break;
    }
    //var test = this.launchTime + this.retreatPoint*1000;
   // 
   // 
    //if (this.game.time.time >= this.launchTime + this.retreatPoint*1000){
    //  this.retreating = true;
      // 
   // }
    if (this.retreating){
        // 
      this.x += 4;
      if (this.x > game.camera.x + 1200 + 200){
        this.kill();
        if (this.bossFlag){
          game.levelBeaten = true;
        }
      }
    }
  }
}

// SpinBoss appears at the end of level two, speeds up and slows down his spinning, firing all the way. 
var SpinBoss = function (game, x, y, target, bulletsRef){
  Enemy.call(this, game, x, y, 0, 'spinboss', 0);
  this.baseVelocity = 0;
  this.health = 200; 
  this.width = 400;
  this.height = 400;
  this.isBoss = true;
  this.targ = target;
  this.enemyType = "SpinBoss";
  this.body.drag.x = 200;
  if (!this.launchVel){ this.launchVel = -400; }
  this.body.drag.y = 20;
  this.bulletsRef = bulletsRef;
  this.doesFire = true;
  this.body.maxVelocity.y = 100;
  this.fireChance = 20;
  this.pointValue = 5000;
  this.baseVelocity = 200;
  this.matchedSpeed = false;
  this.body.collideWorldBounds=false;
  this.anchor.setTo(0.5,0.5);
  this.smoothed = false;
  this.bulletSpeed = 0;
  this.lastFire = 0;
  this.hurt = false;
  this.dying = false;
  this.hurtFrame = 1;
  this.retreatEvent;
  this.body.setSize(200, 200, 0, 0)
  this.laser = game.add.audio('bosslaser', 0.2);
  //this.launchVel = launchVelocity;
  this.retreating = false;
  this.retreatPoint = 0;
  this.blaster = game.add.audio('testblip1', 0.2);
  this.pace = game.levels[game.level - 1]["pace"]; 
  this.animations.add('hurt', [0,2], 30, true);
  this.animations.add('unhurt', [0], 30, true);
  this.animations.play('unhurt');

}

SpinBoss.prototype = Object.create(Enemy.prototype);
SpinBoss.prototype.constructor = SpinBoss;

SpinBoss.prototype.disposeCheck = function () {
  if (this.x < (game.camera.x - 50) || this.health <= 0){ 
    
    if (this.bossFlag == true){
      game.levelBeaten = true;    
    }
  }
};

SpinBoss.prototype.launch = function (){
  this.body.velocity.x = this.launchVel;
  this.launchTime = this.game.time.time;
  this.retreatEvent = game.time.events.add(this.retreatPoint*1000, this.retreat, this);
  this.renderable = true;
}

SpinBoss.prototype.retreat = function(){

  this.retreating = true;
}

SpinBoss.prototype.checkForLaunch = function(){
  if (this.x - this.game.camera.x <= (game.width + 200) + this.launchOffset && this.asleep){
    this.asleep = false;
    this.launch();
  }
};
SpinBoss.prototype.update = function() {
  this.disposeCheck();
  
  this.checkForLaunch();


  if (this.health < 75 && !this.hurt){
      this.hurt = true;
      this.animations.play('hurt');

  }

  if (!this.asleep){
    //this.angle += 5
    this.body.angularVelocity = Math.sin((game.time.now)/5000) * 300 + 300;
     this.fireChance = Math.sin((game.time.now)/5000) * 100;
     this.bulletSpeed = Math.sin((game.time.now)/5000) * 75 + 200;
    var distanceToPlayer = Math.abs(this.y - this.targ.y);
    if (this.health <= 0 && !this.dying){ 
      //this.kill();
      this.dying = true;
      game.time.events.remove(this.retreatEvent);
      var explosion = new LargeExplosion(game, this.x, this.y, 10, 400);
      //fade out and then kill 
      
      var tween = game.add.tween(this).to( {alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
      tween.onComplete.add(function(){this.kill()}, this);

    }


    if (Math.abs(this.body.velocity.x) < 1 && !this.matchedSpeed){
      this.matchedSpeed = true;
      this.lockPoint = this.x - game.camera.x;
    }
    
    if (this.matchedSpeed && !this.retreating){
      //this.x += this.pace ;
      //
      this.x = game.camera.x + this.lockPoint;

     if(this.doesFire && !this.dying){
      var chanceToShoot = Math.random()*100;
      if (chanceToShoot < this.fireChance && this.game.time.time > this.lastFire + Math.random()*200){ //make this dynamic
        var badBullet = new Bullet(game=game, x=this.x, y=this.y, baseVelocity=null, angle=null, img='badbullet-sprite', sizeX=40, sizeY=18);
        this.blaster.play();
        badBullet.body.velocity.x = -10;
        badBullet.body.velocity.y = -10;
   //     badBullet.body.velocity = velocityFromAngle(this.angle, speed, point)
        game.physics.arcade.velocityFromAngle(this.angle, this.bulletSpeed, badBullet.body.velocity);
        badBullet.tracking = true;
        this.lastFire = this.game.time.time;
        this.bulletsRef.add(badBullet);
      }
    }

    }
    if (distanceToPlayer >= 100 && this.matchedSpeed){
      if (this.y > this.targ.y){
        this.body.acceleration.y = -150;
      } else if (this.y < this.targ.y){
        this.body.acceleration.y = 150;
      } 
    } else {
      this.body.acceleration.y = 0;
      //chance to fire
      var chanceToFire = Math.random()*100;
      if (chanceToFire < 5 && this.game.time.time > this.lastFire + 1500 && !this.dying){
        var test = new BigBullet(game=game, x=this.x, y=this.y);
        this.bulletsRef.add(test);
        this.laser.play();
        
        this.lastFire = this.game.time.time;
      }
    }
    // if (this.game.time.time >= this.launchTime + this.retreatPoint*1000){
    //   this.retreating = true;
    // }
    if (this.retreating){
      
      this.x += (this.pace + 2);
      if (this.x > game.camera.x + 1200 + 200){
        this.kill();
        if (this.bossFlag){
          game.levelBeaten = true;
        }
      }
    }
  }
}



var FinalBoss = function (game, x, y, playerRef, enemiesRef, bulletsRef, explosionsRef, badBulletsRef, powerupsRef) {
  Phaser.Group.call(this, game, game.world, 'FinalBoss', false, true, Phaser.Physics.ARCADE);
  this.refX = x;
  this.refY = y;
  this.playerRef = playerRef;
  this.badBulletsRef = badBulletsRef;
  this.stage = 0;
  this.active = false;
  this.dying = false;
  this.playerRef = playerRef;
  this.enemiesRef = enemiesRef;
  this.powerupsRef = powerupsRef;
  this.bulletsRef = bulletsRef;
  this.explosionsRef = explosionsRef;
  this.explosions = game.add.group();
  this.badBullets = game.add.group();
  this.asleep = true;
  this.bossLaser = game.add.audio('bosslaser', 0.2);
  this.blaster = game.add.audio('testblip1', 0.2);
  this.laugh = game.add.audio('vo-haha', 0.7);
  this.base = this.create(this.x, 300, 'finalboss-base');
  this.base.anchor.setTo(0.5,0.5);
  this.base.x = this.refX;

  this.base.body.immovable = true;
  this.base.body.setSize(200, 300, 0, 0)
  this.base.frame = 1;

  this.gem = this.create(this.x-100, 300, 'finalboss-gem');
  this.gem.anchor.setTo(0.5,0.5);
  this.gem.x = this.refX - 73;
  this.gem.body.immovable = true;
  //this.gem.body.setSize(200, 300, 0, 0)
  this.gem.frame = 6;
 
  this.gem.animations.add('open', [0,1,2,3,4,5,6], 15, false)
  this.gem.animations.add('close', [6,5,4,3,2,1,0], 15, false)
  this.gem.health = 150; // was 200
  this.gem.pointValue = 5000;
  this.gem.opened = true;
  this.gem.timer = 0;
  this.gem.togglePoint = 60;
  this.counter = 0;
  this.counterRate = 0;
  this.absCounter = 0;
  this.lastFire = 0;
  this.fireChance =  40;
  this.base.y = this.refY;
  this.eyeGroup = game.add.group();

  this.positions = [
    {"x": this.refX + 35, "y": this.refY},
    {"x": this.refX - 75, "y": this.refY + 225},
    {"x": this.refX - 175, "y": this.refY},
    {"x": this.refX -75, "y": this.refY-225}
  ]

  this.fruitCounter = 0;
  this.veggieCounter = 0;
  this.powerupTogglePoint = 3000;
  this.powerupTimer = 0;
  this.fruits = ['cherry', 'grapefruit', 'orange', 'watermelon'];
  this.veggies = ['broccoli', 'cabbage', 'carrot', 'pumpkin'];

  this.eyeOne = this.create(this.refX + 50, 300, 'finalboss-eye');
  this.eyeOne.anchor.setTo(0.5,0.5);
  this.eyeOne.slot = 0;
  this.eyeOne.health = 60; // was 60
  this.eyeOne.isEye = true;
  this.eyeOne.x = this.positions[0]["x"]
  this.eyeOne.y = this.positions[0]["y"]
  this.eyeOne.pointValue = 2000;
  this.eyeOne.invulnerable = false;
  this.eyeOne.body.immovable = true;
  this.eyeOne.frame = 2;
  this.eyeOne.lastFire = 0;
  this.eyeGroup.add(this.eyeOne)

  this.eyeTwo = this.create(this.refX + 50, 300, 'finalboss-eye');
  this.eyeTwo.anchor.setTo(0.5,0.5);
  this.eyeTwo.slot = 1;
  this.eyeTwo.health = 60; // was 60
  this.eyeTwo.isEye = true;
  this.eyeTwo.x = this.positions[1]["x"]
  this.eyeTwo.y = this.positions[1]["y"]
  this.eyeTwo.pointValue = 2000;
  this.eyeTwo.invulnerable = false;
  this.eyeTwo.body.immovable = true;  
  this.eyeTwo.lastFire = 0;
  this.eyeTwo.frame = 2;
  this.eyeGroup.add(this.eyeTwo)

  this.eyeThree = this.create(this.refX + 50, 300, 'finalboss-eye');
  this.eyeThree.anchor.setTo(0.5,0.5);
  this.eyeThree.slot = 2;
  this.eyeThree.health = 60; // was 60
  this.eyeThree.isEye = true;
  this.eyeThree.x = this.positions[2]["x"]
  this.eyeThree.y = this.positions[2]["y"]
  this.eyeThree.pointValue = 2000;
  this.eyeThree.invulnerable = false;
  this.eyeThree.body.immovable = true;
  this.eyeThree.lastFire = 0;
  this.eyeThree.frame = 2;
  this.eyeGroup.add(this.eyeThree)

  this.eyeFour = this.create(this.refX + 50, 300, 'finalboss-eye');
  this.eyeFour.anchor.setTo(0.5,0.5);
  this.eyeFour.slot = 3;
  this.eyeFour.health = 60; // was 75
  this.eyeFour.isEye = true;
  this.eyeFour.x = this.positions[3]["x"]
  this.eyeFour.y = this.positions[3]["y"]
  this.eyeFour.pointValue = 2000;
  this.eyeFour.invulnerable = false;
  this.eyeFour.body.immovable = true;
  this.eyeFour.lastFire = 0;
  this.eyeFour.frame = 2;
  this.eyeGroup.add(this.eyeFour)

  this.gemExplosion = game.add.sprite(this.gem.x, this.gem.y, 'gem-explosion-sprite');
  this.gemExplosion.anchor.setTo(0.5,0.5);
  this.gemExplosion.animations.add('run');
  this.gemExplosion.alpha = 0;
  

  this.eyes = [this.eyeOne, this.eyeTwo, this.eyeThree, this.eyeFour]
  this.eyeGroup.callAll('animations.add', 'animations', 'close', [2,1,0], 5, false);
  this.eyeGroup.callAll('animations.add', 'animations', 'open', [0,1,2], 5, false);
  this.eyeGroup.callAll('animations.add', 'animations', 'getHurt', [4,2], 15, false);

  this.gem.animations.add("getHurt", [8,6], 15, false);




  // this.eyeGroup.callAll('animations.play', 'animations', 'close');
  this.add(this.eyeGroup)
  this.add(this.badBullets);
  this.add(this.explosions);
}

FinalBoss.prototype = Object.create(Phaser.Group.prototype);
FinalBoss.prototype.constructor = FinalBoss;

FinalBoss.prototype.disposeCheck = function () {
   // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
};

FinalBoss.prototype.checkForLaunch = function(){
  if (this.base.x - this.game.camera.x <= (game.width + 50) && this.asleep){
    this.asleep = false;
    
    this.laugh.play();
  }
};

FinalBoss.prototype.toggleGem = function(){

  if (this.gem.opened){
    this.gem.animations.play('close') 
    this.gem.opened = false;
  } else {
    this.gem.animations.play('open') 
    this.gem.opened = true;
  }

},

FinalBoss.prototype.launchWave = function (){
var whichType = Math.floor(Math.random()*4);
  // console.log("Which type is " + whichType)
  if (whichType == 0){
    for (j = 0; j < 15; j++) { 
      var dodger = new SeekerAndDodger(game=game, x=game.camera.x+1300, y=Math.random()*550, target=this.playerRef, bulletsRef=this.bulletsRef, baseVelocity=-200);
      this.enemiesRef.add(dodger)
      dodger.asleep = false;
      dodger.launch();
    }
  }
  else if (whichType == 1){
    for (j = 0; j < 15; j++) { 
       var enemy = new Enemy(game=game, x=game.camera.x+1300+j*60, y=Math.random()*550, launchOffset=0, img=null, baseVelocity=-400);
      this.enemiesRef.add(enemy)
      enemy.asleep = false;
      enemy.launch();
    }
  }
  else if (whichType == 2){
    for (j = 0; j < 7; j++) { 
      var enemy = new Crosser(game=game, x=game.camera.x+1300+j*50, y=200, 0, 'baddie-red', baseVelocity=-500, dirMod=1);
      this.enemiesRef.add(enemy)
      enemy.asleep = false;
      enemy.launch();
    }
     for (j = 0; j < 7; j++) { 
      var enemy = new Crosser(game=game, x=game.camera.x+1300+j*50, y=400, 0, 'baddie-red', baseVelocity=-500, dirMod=-1);
      this.enemiesRef.add(enemy)
      enemy.asleep = false;
      enemy.launch();
    }
  }
  else if (whichType == 3){
    var randomY = Math.random()*550;
    for (j = 0; j < 10; j++) { 
      var flanker = new Flanker(game=game, x=game.camera.x+1300+j*50, y=randomY, 0, baseVelocity=-400, target=this.playerRef);
      this.enemiesRef.add(flanker)
      flanker.asleep = false;
      flanker.launch();
    }
  }

},

FinalBoss.prototype.stageChange = function () {
  
  this.eyeGroup.callAll('animations.play', 'animations', 'close');
  var tween = game.add.tween(this.eyeGroup).to( {alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
   game.time.events.add(750, function(){this.stage = (this.stage + 1) % 3;}, this);
   game.time.events.add(1000, function(){ this.eyeGroup.callAll('animations.play', 'animations', 'open'); game.add.tween(this.eyeGroup).to( {alpha: 1 }, 500, Phaser.Easing.Linear.None, true) }, this);
  
   // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
    // for (i = 0; i < this.eyes.length; i++) { 
    //  var currentEye = this.eyes[i];
      
    //  var tween = game.add.tween(currentEye).to( {alpha: 0 }, 500, "Linear")
    //  .to( { alpha: .01}, 5000, "Linear")
    //  .to( { alpha: 1}, 500, "Linear")
    //  .start();
        
    
      
    
    // }

      
};

FinalBoss.prototype.collisionWithPlayer = function (player, bossPart){
  player.body.velocity.x = -300;
  
}

FinalBoss.prototype.collisionCheck = function (bullet, enemy) {
   // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
   
      if (enemy.alpha == 1){
      var sg = this;
      if (bullet.muted){
        var explosion = new Explosion(game, bullet.x, bullet.y, 1, true);
      } else {
        var explosion = new Explosion(game, bullet.x, bullet.y, 1, false); 
      }
      this.explosionsRef.add(explosion);
   
      if (enemy.isEye && enemy.frame != 0){
        enemy.health -= 1;
        
        
        enemy.play('getHurt');  
      
        //sg.player.health += .2;
        if (enemy.health <= 0 && !enemy.dying){
          enemy.dying = true;
          
            game.score += Math.floor(enemy.pointValue * game.scoreMultiplier);
            enemy.kill();
            //   this.eyes[i].dying = true; 
          var explosion = new LargeExplosion(game, enemy.x, enemy.y, 6, 100);
          this.explosionsRef.add(explosion);
          enemy.kill();
        }
    } 

    
    } 
    bullet.kill();
 },

FinalBoss.prototype.gemHit = function (gem, bullet) {
   // if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
  
     
      var sg = this;
      if (bullet.muted){
        var explosion = new Explosion(game, bullet.x, bullet.y, 1, true);
      } else {
        var explosion = new Explosion(game, bullet.x, bullet.y, 1, false); 
      }
      this.explosionsRef.add(explosion);
   

      if (gem.frame == 6 && this.gem.opened){
        gem.health -= 1;
        
        gem.play('getHurt');  
      
        //sg.player.health += .2;
        if (gem.health <= 0){
          //this is where you trigger the big explosion
            game.score += Math.floor(gem.pointValue * game.scoreMultiplier);
            //enemy.kill();
        }
    } 

    
    
    bullet.kill();
 },

                // if (obj.powerupType == "speed"){
                //   var powerup = new Powerup(game=game, x=obj.x, y=obj.y, powerupType=obj.powerupType, img=sg.fruits[fruitCounter % 5]);
                //   fruitCounter += 1;
                // }
                // else if (obj.powerupType == "weapon"){
                //   var powerup = new Powerup(game=game, x=obj.x, y=obj.y, powerupType=obj.powerupType, img=sg.vegetables[vegetableCounter % 5]);
                //   vegetableCounter +=1;
                // } else {
                //   var powerup = new Powerup(game=game, x=obj.x, y=obj.y, powerupType=obj.powerupType); 
                // }

                //  sg.powerups.add(powerup);


/**
 * Automatically called by World.update
 */

 FinalBoss.prototype.randomlyLaunchPowerup = function(){
   // 
   //  
  this.powerupTimer += 1;
  if (this.powerupTimer == this.powerupTogglePoint){
    var whatType = Math.floor(Math.random()*3);
    var powerup; // Make a check if the boss is alive at this point
    this.powerupTogglePoint = this.powerupTogglePoint + 1500 + Math.floor(Math.random()*300);
    switch (whatType){
      case 0: 
         powerup = new Powerup(game=game, x=game.camera.x + 1300, y=50 + Math.random()*500, powerupType="weapon", img=this.fruits[this.fruitCounter % 5]);
          this.fruitCounter += 1;
      break;
      case 1:
          powerup = new Powerup(game=game, x=game.camera.x + 1300, y=50 + Math.random()*500, powerupType="speed", img=this.veggies[this.veggieCounter % 5]);
          this.veggieCounter += 1;
      break;
      case 2:
         powerup = new Powerup(game=game, x=game.camera.x + 1300, y=50 + Math.random()*500, powerupType="lycocoin");
      break;
    }
    powerup.body.velocity.x = -275;
    powerup.body.angularVelocity = Math.random()*-20;
    this.powerupsRef.add(powerup);
  }
 },

FinalBoss.prototype.checkForDeath = function() {

  if (this.gem.health <= 0 && !this.dying){
    this.dying = true;
    // Begin death animation.

    this.gemExplosion.alpha = 1.0;
    this.gemExplosion.animations.play('run', 5);
    var explosion = new LargeExplosion(game, this.gem.x, this.gem.y, 20, 400);
    var explosion_two = new LargeExplosion(game, this.gem.x, this.gem.y, 20, 400);
    var explosion_three = new LargeExplosion(game, this.gem.x, this.gem.y, 20, 400);
    this.explosionsRef.add(explosion);
    this.explosionsRef.add(explosion_two);
    this.explosionsRef.add(explosion_three);
     var tween = game.add.tween(this.whiteCurtainRef).to( { alpha: 1.0 }, 2000, Phaser.Easing.Quadratic.In, true);
    game.levelBeaten = true;
  }

 if (this.dying){
    var randomFactorX = Math.random()*3 - 1.5;
    var randomFactorY = Math.random()*3 - 1.5;

    this.base.x = this.refX+ randomFactorX;
    this.base.y = 300 + randomFactorY;

    this.gem.x = this.refX - 73 + randomFactorX;
    this.gem.y = 300 + randomFactorY;

    this.gemExplosion.x = this.gem.x + randomFactorX;
    this.gemExplosion.y = this.gem.y + randomFactorY;
  }
},

FinalBoss.prototype.update = function() {
  this.checkForLaunch();
  this.checkForDeath();
  if (!this.asleep && !this.dying){

   // this.collisionWithPlayer(this.playerRef, this.base.body);
   // this.collisionWithPlayer(this.playerRef, this.eyeGroup);

    this.randomlyLaunchPowerup(); 
    this.gem.timer += 1;
    // 
    // 
    if (this.gem.timer == this.gem.togglePoint){
      this.gem.togglePoint = this.gem.togglePoint + 100 + Math.floor(Math.random()*500);
      this.toggleGem();

    }

    this.disposeCheck();
    this.absCounter += 1;
    //this.counter += this.counterRate;
    this.counter += 30;
       // this.counter %= 18000;
    this.counterRate = Math.sin(this.absCounter/(300))*20
  //  this.absCounter %= 180000;
    game.physics.arcade.collide(this.bulletsRef, this.gem, this.gemHit, null, this);
     
    if (this.eyeGroup.alpha == 1){
      game.physics.arcade.collide(this.bulletsRef, this.eyeGroup, this.collisionCheck, null, this);
    }

    if (this.absCounter % 800 == 0){
      this.stageChange();
    }
    
    if (this.stage == 0) {
      if (this.absCounter % 120 == 0){
        for (i = 0; i < this.eyes.length; i++) { 
          var currentEye = this.eyes[i];
          // tween every eye to its new slot
          currentEye.slot = (currentEye.slot + 1) % 4;
          var tween = game.add.tween(currentEye).to( { x: this.positions[currentEye.slot]["x"], y: this.positions[currentEye.slot]["y"] }, 250, "Linear", true);
        }
      }

      if (this.absCounter % 180 == 0){
        for (i = 0; i < this.eyes.length; i++) { 
          var currentEye = this.eyes[i];
          if (currentEye.alive){
            var test = new BigBullet(game=game, x=currentEye.x, y=currentEye.y);
             this.bossLaser.play();
            this.badBulletsRef.add(test);
          }
        }
      }
    } else if (this.stage == 1){
      
        //  
        
        for (i = 0; i < this.eyes.length; i++) { 
          var currentEye = this.eyes[i];
          currentEye.x = this.refX - 75 + Math.sin((this.counter + i*500)/(300))*100;
          currentEye.y = this.refY +  Math.cos((this.counter + i*500)/(300))*225;
          if (currentEye.alive && this.eyeGroup.alpha == 1){
            //  
            var chanceToShoot = Math.random()*100;
            if (chanceToShoot < this.fireChance && this.game.time.time > currentEye.lastFire + 400){ //make this dynamic
              var badBullet = new Bullet(game=game, x=currentEye.x, y=currentEye.y, baseVelocity=null, angle=null, img='badbullet-sprite', sizeX=40, sizeY=18);
              this.blaster.play();
         
              badBullet.body.velocity.x = -350;
              badBullet.tracking = true;
              this.badBulletsRef.add(badBullet);
              currentEye.lastFire = game.time.time;
            }
          }
        }
      } else if (this.stage == 2){
        if (this.absCounter % 300 == 0){
          for (i = 0; i < this.eyes.length; i++) { 
            var currentEye = this.eyes[i];
            // tween every eye to its new slot
            currentEye.slot = (currentEye.slot + 1) % 4;
            var tween = game.add.tween(currentEye).to( { x: this.positions[currentEye.slot]["x"], y: this.positions[currentEye.slot]["y"] }, 250, "Linear", true);
          }
        }
        // toggle two eyes
        if (this.absCounter % 400 == 0){
          this.launchWave();
        }
        if (this.absCounter % 300 == 0){
          var whichEye = Math.floor(Math.random()*4)
          var otherEye = (whichEye + 2) % 4;
          if (this.eyes[whichEye].frame != 0){
            this.eyes[whichEye].animations.play('close');
          }
          if (this.eyes[otherEye].frame != 0){
            this.eyes[otherEye].animations.play('close');
          }
        }
     }


      for (i = 0; i < this.eyes.length; i++) {  // Why is this here?
        // if (this.eyes[i].health <= 0 && !this.eyes[i].dying){ 
        //   //play a large explosion
        //   this.eyes[i].dying = true; 
        //   var explosion = new LargeExplosion(game, this.eyes[i].x, this.eyes[i].y, 6, 100);
        //   this.explosionsRef.add(explosion);
        //   this.eyes[i].kill();
        // }
      }
    }
};
