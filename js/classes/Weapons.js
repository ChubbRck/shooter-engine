// Weapons.js -- classes for each type of weapon.

var BasicShot = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Basic', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 300;
    this.bulletsRef = bulletsRef
    this.blaster = game.add.audio('testblip1', 0.4);
    return this;
}

BasicShot.prototype = Object.create(Phaser.Group.prototype);
BasicShot.prototype.constructor = BasicShot;

/**
 * Automatically called by World.update
 */
BasicShot.prototype.update = function() {
    
};

BasicShot.prototype.fire = function (source, isHeld) {
	
	if (this.game.time.time < this.nextFire && isHeld) { return; }

	var bullet = new Bullet(game, 200, 300, this.bulletSpeed);
	bullet.x = source.x;
	bullet.y = source.y;
	game.add.existing(bullet);
	this.bulletsRef.add(bullet);
	this.blaster.play(); 
	this.nextFire = this.game.time.time + this.fireRate;

};

var Beam = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 500;
    this.bulletsRef = bulletsRef
    this.coolDown = 10; 
    this.laserSFX = game.add.audio('laser', 0.20);
    return this;
}

Beam.prototype = Object.create(Phaser.Group.prototype);
Beam.prototype.constructor = Beam;

/**
 * Automatically called by World.update
 */
Beam.prototype.update = function() {
    
};

Beam.prototype.fire = function (source) {
	
	if (this.game.time.time < this.nextFire) { return; }
		var right_bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'beam-right', 20, 20);
		right_bullet.x = source.x + 20*5;
		right_bullet.y = source.y;
		//game.add.existing(bullet);
		this.bulletsRef.add(right_bullet);
	for (var i = 1; i < 5; i++){
		var bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'beam', 20, 20);
		bullet.x = source.x + 20*i;
		bullet.y = source.y;
		//game.add.existing(bullet);
		this.bulletsRef.add(bullet);
	}
		var left_bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'beam-left', 20, 20);
		left_bullet.x = source.x + 20;
		left_bullet.y = source.y;
		//game.add.existing(bullet);
		this.bulletsRef.add(left_bullet);
	this.laserSFX.play();
	this.nextFire = this.game.time.time + this.fireRate;

};

var Triple = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Triple', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 300;
    this.bulletsRef = bulletsRef
    return this;
}

Triple.prototype = Object.create(Phaser.Group.prototype);
Triple.prototype.constructor = Triple;

/**
 * Automatically called by World.update
 */
Triple.prototype.update = function() {
    
};

Triple.prototype.fire = function (source, isHeld) {
	
	if (this.game.time.time < this.nextFire && isHeld) { return; }

	// var bullet = new Bullet(game, 200, 300, this.bulletSpeed);
	// bullet.x = source.x;
	// bullet.y = source.y;
	// game.add.existing(bullet);
	// this.bulletsRef.add(bullet);

	var bulletDown = new Bullet(game, 200, 300, this.bulletSpeed, 1);
	bulletDown.x = source.x;
	bulletDown.y = source.y;
	game.add.existing(bulletDown);
	this.bulletsRef.add(bulletDown);

	var bulletUp = new Bullet(game, 200, 300, this.bulletSpeed, -1);
	bulletUp.x = source.x;
	bulletUp.y = source.y;
	game.add.existing(bulletUp);
	this.bulletsRef.add(bulletUp);

	this.nextFire = this.game.time.time + this.fireRate;

};

var Twin = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Twin', false, true, Phaser.Physics.ARCADE);
   	this.blaster = game.add.audio('testblip1', 0.4);
    this.nextFire = 0;
    this.bulletSpeed = 900;
    this.fireRate = 200;
    this.bulletsRef = bulletsRef
    return this;

}

Twin.prototype = Object.create(Phaser.Group.prototype);
Twin.prototype.constructor = Twin;

/**
 * Automatically called by World.update
 */
Twin.prototype.update = function() {
    
};

Twin.prototype.fire = function (source, isHeld) {
	
	if (this.game.time.time < this.nextFire && isHeld) { return; }

	var bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'bullet-md-sprite');
	bullet.x = source.x;
	bullet.y = source.y + 5;
	bullet.frameRate = 7;
	bullet.muted = false;

	
	this.bulletsRef.add(bullet);

	var bulletTwin = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'bullet-md-sprite');
	bulletTwin.x = source.x;
	bulletTwin.y = source.y - 5;
	bullet.frameRate = 7;
	bulletTwin.muted = true;

	this.bulletsRef.add(bulletTwin);

	this.blaster.play(); 
	this.nextFire = this.game.time.time + this.fireRate;

};


var Missile = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Basic', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 400;
    this.fireRate = 500;
    this.bulletsRef = bulletsRef;
    this.missile_sfx = game.add.audio('missile', 0.1);
    return this;
}

Missile.prototype = Object.create(Phaser.Group.prototype);
Missile.prototype.constructor = Missile;

/**
 * Automatically called by World.update
 */
Missile.prototype.update = function() {
    
};

Missile.prototype.fire = function (source) {
	
	if (this.game.time.time < this.nextFire) { return; }

	var bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'missile_sprite');
	bullet.x = source.x;
	bullet.y = source.y;
	bullet.body.gravity.y = 700;
	bullet.tracking = true;
	bullet.isMissile = true;
	game.add.existing(bullet);
	this.bulletsRef.add(bullet);

	var secondBullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'missile_sprite');
	secondBullet.x = source.x;
	secondBullet.y = source.y;
	secondBullet.body.gravity.y = -700;
	secondBullet.tracking = true;
	secondBullet.isMissile = true;
	game.add.existing(secondBullet);
	this.bulletsRef.add(secondBullet);
	this.missile_sfx.play();
	this.nextFire = this.game.time.time + this.fireRate;

	bullet.animations.add('run');
	bullet.animations.play('run',15,true);
	secondBullet.animations.add('run');
	secondBullet.animations.play('run',15,true);
};


var Ring = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Ring', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 900;
    this.fireRate = 150;
    this.bulletsRef = bulletsRef
    this.waveSFX = game.add.audio('wave', 0.25);
    return this;
}

Ring.prototype = Object.create(Phaser.Group.prototype);
Ring.prototype.constructor = Ring;

/**
 * Automatically called by World.update
 */
Ring.prototype.update = function() {

};

Ring.prototype.fire = function (source) {
	
	if (this.game.time.time < this.nextFire) { return; }

	var bullet = new Bullet(game, 200, 300, this.bulletSpeed, 0, 'ring-sprite', 50, 118);
	bullet.x = source.x;
	bullet.y = source.y;
	//bullet.scaleSpeed = .1;
	bullet.scaleSpeed = 5;
	bullet.smoothed = false;
	game.add.existing(bullet);
	this.bulletsRef.add(bullet);
	this.waveSFX.play();
	bullet.animations.add('run', [0,1,2,3,4,5,6,7,6,7,6,7,6,7,6,7,6,7,6,7]);
	bullet.animations.play('run', 15, false);
	bullet.body.setSize(50, 20, 0,0)


	this.nextFire = this.game.time.time + this.fireRate;

};

var BuddyShot = function (game, bulletsRef) {
    Phaser.Group.call(this, game, game.world, 'Basic', false, true, Phaser.Physics.ARCADE);
   
    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 200;
    this.bulletsRef = bulletsRef
    this.blaster = game.add.audio('testblip1', 0.4);
    return this;
}

BuddyShot.prototype = Object.create(Phaser.Group.prototype);
BuddyShot.prototype.constructor = BuddyShot;

/**
 * Automatically called by World.update
 */
BuddyShot.prototype.update = function() {
    
};

BuddyShot.prototype.fire = function (source) {
	
	if (this.game.time.time < this.nextFire) { return; }

	var bullet = new Bullet(game, 200, 300, this.bulletSpeed);
	bullet.x = source.x;
	bullet.y = source.y;
	bullet.body.velocity.y = Math.random()*500 - 250;
	bullet.tracking = true;
	game.add.existing(bullet);
	this.bulletsRef.add(bullet);
	this.blaster.play(); 
	this.nextFire = this.game.time.time + this.fireRate;

};


