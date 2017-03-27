// explosion.js - a simple class for animated explosions 
var Explosion = function (game, x, y, sizeFactor, isMuted) {
    if (sizeFactor == 1){
        game.explosionCounter += 1;
        var img = game.explosionCounter % 3;
        var explosions = ["explosion-sprite-a", "explosion-sprite-b", "explosion-sprite-c"];
        Phaser.Sprite.call(this, game, x, y, explosions[img]);
    } else {
        Phaser.Sprite.call(this, game, x, y, 'explosion-small-sprite');
    }

   // if (!isMuted){ this.muted = false; } else { this.muted == isMuted };
   
   this.muted = isMuted;
    if (!sizeFactor){ this.sizeFactor = 1; } else { this.sizeFactor = sizeFactor};
    // this.width = 70*this.sizeFactor;
    // this.height = 70*this.sizeFactor;
    this.animations.add('run');
     if (sizeFactor == 1){
         this.animations.play('run', 20, false,true);
    } else {
        this.animations.play('run', 30, false,true);
    }
   

    this.anchor.setTo(0.5, 0.5);
    this.originTime = this.game.time.time;
    this.explosion_sfx = game.add.audio('explosion1', 0.3*this.sizeFactor*0.9);
    if (!this.muted){
        this.explosion_sfx.play();
    }
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

// Explosion.prototype.create = function(){
//     this.explosion_sfx.play();
// }
/**
 * Automatically called by World.update
 */
Explosion.prototype.update = function() {
  //  this.alpha -= .1;
   if (this.sizeFactor != 1){
        this.scale.x += (.15*this.sizeFactor);
        this.scale.y += (.15*this.sizeFactor);
    }
    // console.log("final scale is " + this.scale.x);
    // console.log("what is my width? " + this.width);
    // if (this.game.time.time > this.originTime + 3000){
    //     console.log("explosion killed?")
    //     this.kill();
    // }
};

var LargeExplosion = function (game, x, y, duration, radius){
    Phaser.Group.call(this, game, game.world, 'LargeExplosion', false, true, Phaser.Physics.ARCADE);
    this.centerX = x;
    this.centerY = y;
    this.radius = radius;
    this.duration = duration;
    // console.log("Large explosion?")

    // console.log("LARGE EXPLOSION!")
    for (i=0; i <= this.duration; i++){
       
       
        game.time.events.add(100*i, this.createExplosion, this);
    }
};


LargeExplosion.prototype = Object.create(Phaser.Group.prototype);
LargeExplosion.prototype.constructor = LargeExplosion;

LargeExplosion.prototype.create = function(){
    
   
}
/**
 * Automatically called by World.update
 */
LargeExplosion.prototype.createExplosion = function(x,y){
    // console.log("Creating at "+x);
     var randomFactorX = this.centerX + Math.random()*this.radius - this.radius/2;
    var randomFactorY = this.centerY + Math.random()*this.radius - this.radius/2;
    var explosion = new Explosion(game, randomFactorX, randomFactorY, 1, false);
    this.add(explosion);
}

LargeExplosion.prototype.update = function() {};