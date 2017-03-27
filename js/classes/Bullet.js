// Bullet.js -- class for player-fired bullet

var Bullet = function (game, x, y, baseVelocity, angle, img, sizeX, sizeY, tracking) {
    
    var img = img
    if (!img){ img = 'bullet-sprite' }

    
    Phaser.Sprite.call(this, game, x, y, img);
    this.frameRate = 30;
    this.animations.add('jitter');
    this.animations.play('jitter',this.frameRate, true);
    this.anchor.setTo(0.5,0.5);
    this.tracking = tracking;
    if (!this.tracking){this.tracking = false}; 
    var thisSizeX = sizeX;
    var thisSizeY = sizeY;
    if (!thisSizeX){ thisSizeX = 27 }
    if (!thisSizeY){ thisSizeY = 12 }
    this.width = thisSizeX;
    this.height = thisSizeY;
    this.startPoint = y;
    this.scaleSpeed = 0;
    this.isBullet = true;
    this.bodySize = 20;
    game.physics.arcade.enable(this);
    this.angleRef = angle;
    this.body.velocity.x = baseVelocity;
    
    if (angle == 1){
        this.body.velocity.x = 0;
        this.body.velocity.y = baseVelocity;
        this.angle = 90;
    } else if (angle == -1){
        this.body.velocity.x = 0;
        this.body.velocity.y = -1 * baseVelocity;
        this.angle = -90;
    } else if (angle == 2){
        this.sineMode = true;
    }
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

/**
 * Automatically called by World.update
 */
Bullet.prototype.update = function() {

    if (this.sineMode){
        this.body.velocity.y = Math.sin(game.camera.x/3) * 500
    }

    if(this.tracking){
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.x > game.camera.x + 1200 || this.y > 800 || this.y < - 100){
        this.kill();
    }

    if (this.isMissile && this.body.velocity.x == 0 && this.body.velocity.y == 0){
         var explosion = new Explosion(game, this.x, this.y);
        game.add.existing(explosion);
        this.kill();

    }
    if (this.bodySize <= 118){
        this.bodySize += this.scaleSpeed;
        this.body.setSize(50, this.bodySize, 0,0)
    }
    // this.scale.x += this.scaleSpeed;
    // this.scale.y += this.scaleSpeed;
};

// Enemy large bullet
var BigBullet = function (game, x, y) {
  Bullet.call(this, game, x, y, -600, 0, 'boss-bullet-sprite', 120,80, false);
  this.health = 1;
  this.isBullet = true;
 
 };

BigBullet.prototype = Object.create(Bullet.prototype);
BigBullet.prototype.constructor = BigBullet;

/**
 * Automatically called by World.update
 */
 BigBullet.prototype.update = function() {
   // console.log("big bullet update running")
      if (this.x > game.camera.x + 1200 || this.x < game.camera.x - 100 || this.y > 800 || this.y < - 100 || this.health <= 0){
        this.kill();
     }

 };