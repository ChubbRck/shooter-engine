// buddy.js - a class describing the behavior of AI 'buddies' who join the player during gameplay
var Buddy = function (game, x, y, buddyType, playerRef, bulletsRef, enemiesRef, badbulletsRef) {
    
    this.buddyType = buddyType; 
    this.player = playerRef;
    this.isFiring = true;

    this.bulletsRef = bulletsRef;
    this.enemiesRef = enemiesRef;
    this.badbulletsRef = badbulletsRef;
    this.originTime = game.time.time;
    this.lifeTime = 20000;
   
    this.isFiring = true;
    this.isDeparting = false;
    this.counter = 0;

    this.seeyaSFX = game.add.audio('vo-seeya', 0.2);
    // Start conditions for buddy type 1
    switch (this.buddyType){
        case 0:
            Phaser.Sprite.call(this, game, x, y, 'buddy_lu');
            this.anchor.setTo(0.5, 0.5);
            this.width = 60
            this.height = 60
            this.x = game.camera.x - 100;
            this.y = 200 + Math.random()*200;
            this.startPoint = this.y;
            this.introSFX = game.add.audio('vo-lutina-v3');
            this.introSFX.play();
            this.greetingSFX = game.add.audio('vo-needahand');
            this.introSFX.onStop.add(function(){this.greetingSFX.play()}, this);
            game.physics.arcade.enable(this);
            switch(game.level){
                case 1: this.body.velocity.x = 100; break;
                case 2: this.body.velocity.x = 150; break;
                case 3: this.body.velocity.x = 150; break;
                default: this.body.velocity.x = 100; break;
            }

            break;
        case 1:
            Phaser.Sprite.call(this, game, x, y, 'buddy_ll');
            this.anchor.setTo(0.5, 0.5);
            this.x = this.player.x - 50;
            this.y = this.player.y + 100;
            this.alpha = 0;
            game.physics.arcade.enable(this);
            this.introSFX = game.add.audio('vo-lordlycopene');
            this.greetingSFX = game.add.audio('vo-perhaps');
            this.introSFX.play();
            this.introSFX.onStop.add(function(){this.greetingSFX.play()}, this);
            var tween = game.add.tween(this).to( { alpha: 1.0 }, 500, "Linear", true);
            game.time.events.add(this.lifeTime, this.depart, this);

            break;
        case 2:
            Phaser.Sprite.call(this, game, x, y, 'buddy_ms');
            this.anchor.setTo(0.5, 0.5);
            this.x = this.player.x - 50;
            this.y = this.player.y + 100;
            this.alpha = 0;
            game.physics.arcade.enable(this);
            this.introSFX = game.add.audio('vo-masterxanthan');
            this.greetingSFX = game.add.audio('vo-ahoythere');
            
            this.introSFX.play();
            this.introSFX.onStop.add(function(){this.greetingSFX.play()}, this);
            var tween = game.add.tween(this).to( { alpha: 1.0 }, 500, "Linear", true);
            game.time.events.add(this.lifeTime, this.depart, this);
            break;
        case 3:
            Phaser.Sprite.call(this, game, x, y, 'buddy_ff');
            this.anchor.setTo(0.5, 0.5);
            this.x = this.player.x + 100;
            this.y = this.player.y;
            this.alpha = 0;
            game.physics.arcade.enable(this);
            this.introSFX = game.add.audio('vo-fightofluene');
            this.greetingSFX = game.add.audio('vo-letsdothis');
            this.introSFX.play();
            this.introSFX.onStop.add(function(){this.greetingSFX.play()}, this);
            var tween = game.add.tween(this).to( { alpha: 1.0 }, 500, "Linear", true);
            game.time.events.add(this.lifeTime, this.depart, this);
            this.player.invincible = true;
            break;
    }

    this.animations.add('run');
    this.animations.play('run', 10, true);
  
    this.buddyShot = new BuddyShot(game, bulletsRef);
    this.buddyTwin = new Twin(game, bulletsRef);
    this.buddyTwin.fireRate = 150;
    

};

Buddy.prototype = Object.create(Phaser.Sprite.prototype);
Buddy.prototype.constructor = Buddy;

/**
 * Automatically called by World.update
 */

Buddy.prototype.update = function() {


    // Update loop for buddy type 1
    switch(this.buddyType){
        case 0:
            if (this.isFiring){
                this.y =  this.startPoint + Math.sin(this.x/100) * 100
                this.buddyShot.fire(this);


            }
            if (this.x > game.camera.x + 1250){
                this.depart();
            }

            break;
        case 1:
            if (this.isFiring){
                this.buddyTwin.fire(this, true);

            }
                this.x = this.player.x - 50;
                this.y = this.player.y + 100;
                // if (game.time.time >= this.originTime + this.lifeTime){
                //     this.depart();
                // }
            

            break;
        case 2:
            this.counter = 0
            this.x = this.player.x + Math.sin(game.time.time/(300))*100;
            this.y = this.player.y + Math.cos(game.time.time/(300))*100;

            if (this.isFiring){
                this.buddyTwin.fire(this, true);

            }

            // if (game.time.time >= this.originTime + this.lifeTime){
            //     this.depart();
            // }

            game.physics.arcade.overlap(this.badbulletsRef, this, this.collide, null, this);
            game.physics.arcade.overlap(this.enemiesRef, this, this.collide, null, this);
            break;
        case 3:
             this.x = this.player.x + 100;
             this.y = this.player.y;

            // if (game.time.time >= this.originTime + this.lifeTime){
            //     this.depart();
            // }

            game.physics.arcade.overlap(this.badbulletsRef, this, this.collide, null, this);
            game.physics.arcade.overlap(this.enemiesRef, this, this.collide, null, this);
            break;
    }
};

Buddy.prototype.depart = function(){
    if (!this.isDeparting){
        this.isFiring = false;
        this.isDeparting = true;
        var randomChance = Math.random()*100;
       
        if (randomChance < 33){
         
            this.seeyaSFX.play();
        }
        var tween = game.add.tween(this).to( { alpha: 0.0 }, 3000, "Linear", true);
        tween.onComplete.add(function(){this.kill(); this.destroy();}, this);
    }
}

Buddy.prototype.collide = function(buddy, baddie){

    var explosion = new Explosion(game, buddy.x, buddy.y, 1);
    game.add.existing(explosion);
    //this.player.score += baddie.pointValue;
    if (baddie.isBullet){
        baddie.kill();
    }

    baddie.health -= 1;
    if (baddie.health <= 0 && baddie.pointValue && !baddie.dying){
      game.score += Math.floor(baddie.pointValue * game.scoreMultiplier); 
    }
  }