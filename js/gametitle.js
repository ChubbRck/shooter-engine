// gametitle.js -- The title screen state
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		
		// Make the world larger than the screen to allow for a 'rumble' shake
		// game.world.resize(1300,700);
		game.camera.x=0;
		game.camera.y=0;	
		game.version = "1.3"
		// Set some global variables to be carried across scenes
		game.score = 0;
		game.level = 1;
		game.explosionCounter = 0;
		game.difficulty = 1;
		game.buddyCounter = Math.floor((Math.random() * 4));
		 // game.buddyCounter = 2;
		game.weaponType = 1;
		game.sound.mute = true;
		game.playerSpeed = 0;
		game.introSlide = 1;
		game.scoreMultiplier = 1.0;
		game.lives = 3;
		game.activePlayers = [];
		game.playerData = []
		game.topScores;
		game.levels = [level1_data, level2_data, level3_data]
		game.bonuses = [
			{"amountNeeded": 50000, "achieved": false},
			{"amountNeeded": 100000, "achieved": false},
			{"amountNeeded": 200000, "achieved": false},
			{"amountNeeded": 300000, "achieved": false},
			{"amountNeeded": 400000, "achieved": false},
			{"amountNeeded": 500000, "achieved": false},
			{"amountNeeded": 600000, "achieved": false},
			{"amountNeeded": 700000, "achieved": false},
			{"amountNeeded": 800000, "achieved": false},
			{"amountNeeded": 900000, "achieved": false},
			{"amountNeeded": 1000000, "achieved": false},
			{"amountNeeded": 1100000, "achieved": false},
			{"amountNeeded": 1200000, "achieved": false}
      	]

      	game.ranks = [
			{"label": "BLAST CADET", "threshold":0},
			{"label" :"JUNIOR BLASTER", "threshold":60000},
			{"label" : "PHYTO WARRIOR", "threshold":100000},
			{"label" : "CYTO DEFENDER", "threshold":120000},
			{"label" : "LYCO BLASTER", "threshold":150000},
			{"label" : "CARO CRUSHER", "threshold":200000},
			{"label" : "ION ERASER", "threshold":250000},
			{"label" : "SWARM TROOPER", "threshold":300000},
			{"label" : "POWER BLASTER", "threshold":350000},
			{"label" : "MASTER BLASTER", "threshold":400000},
			{"label" : "BETA BLASTER", "threshold":500000},
		];

	this.menuShown = false;
	this.choiceMade = false;
	// // this.titleBackground = game.add.sprite(0, 0, 'spacebg');
	// this.bgtile = game.add.tileSprite(0, 0, 1200, 600, 'title-bg-back');
 //    this.bgtile.fixedToCamera = true;
 //    this.bgtile.autoScroll(-300,0); // on level 1 it is -20, 0

 //    this.middle = game.add.tileSprite(0, 600-471, 1200, 471, 'title-bg-middle');
 //    this.middle.fixedToCamera = true;
 //    this.middle.autoScroll(-400,0); // on level 2 it is -65, 0 (was 85 on lv 2)
 //    // this.mountain.anchor.setTo(0.5,1.0);

 //    this.front = game.add.tileSprite(0, 600-140, 1200, 140, 'title-bg-front');
 //    this.front.fixedToCamera = true;
 //    this.front.autoScroll(-500,0);


   	this.logo = game.add.sprite(game.width/2,215, 'titlfescreen-title');
   	this.logo.anchor.setTo(0.5,0.5);
	this.logo.smoothed = false;

	this.titleLogo = game.add.sprite(game.width/2,200, 'titlesfcreen-title-sheet');
   	this.titleLogo.anchor.setTo(0.5,0.5);
	this.titleLogo.smoothed = false;
	this.titleLogo.animations.add('run', [6,6,6,6,6,0,1,2,3,4,5,6]);
	this.titleLogo.animations.play('run', 11);
	this.titleLogo.scale.x = 0.1;
	this.titleLogo.scale.y = 0.1;


	this.subtitle = game.add.sprite(-1800,300, 'titlescrfeen-subtitle');
   	this.subtitle.anchor.setTo(0.5,0.5);
	this.subtitle.smoothed = false;
	
	var logoTween = game.add.tween(this.titleLogo.scale).to({x: 1.1, y: 1.1}, 500, "Linear")
	.to( { x: 1.0, y: 1.0 }, 1000, "Linear")
	.start();


	// var titleTween = game.add.tween(this.logo).to({x: 600}, 500, "Linear")
	// .start();

	// var subtitleTween = game.add.tween(this.subtitle).to({x: 600}, 500, "Linear")
	// .start();
	


	this.shaking = false;
	this.hasShook = false;
	this.invisPlatform = game.add.sprite(0,350, 'black');
	this.invisPlatform.width = 1200;
	this.invisPlatform.alpha = 0;
	this.invisPlatform.height = 10;
	this.game.physics.arcade.enable(this.invisPlatform);
	this.invisPlatform.body.immovable = true;
	this.timeCheck = game.time.now;
   

    this.playButton = this.game.add.button(game.width/2, 350, 'title-start-button', this.startGame, this, 1,0,1);
  	this.playButton.anchor.setTo(0.5,0)
  	this.playButton.alpha = 0;
  	
  	this.playButton.smoothed = false;

  	this.controlsButton = this.game.add.button(game.width/2, 400, 'title-controls', this.showControls, this, 1,0,1);
  	this.controlsButton.anchor.setTo(0.5,0)
  	this.controlsButton.alpha = 0;

  	this.controlsButton.smoothed = false;

  	this.highScoreButton = this.game.add.button(game.width/2, 450, 'title-high-scores', this.showHighScores, this, 1,0,1);
  	this.highScoreButton.anchor.setTo(0.5,0)
  	this.highScoreButton.alpha = 0;

  	this.highScoreButton.smoothed = false;


  	this.copyrightText = this.game.add.sprite(game.width/2, 550, 'titdle-copyright');
  	this.copyrightText.anchor.setTo(0.5,0)
  	this.copyrightText.alpha = 0;
 
  	this.copyrightText.smoothed = false;

  	this.soundToggle = this.game.add.button(game.width-80, game.height-70, 'mute-sprite', this.toggleMute, this);
    this.soundToggle.width = 44;
    this.soundToggle.height = 28;
    this.soundToggle.frame = 1;
    this.soundToggle.fixedToCamera = true;
   

	this.blackCurtain = game.add.sprite(0,0, 'black');
  	this.blackCurtain.alpha = 0;

  	this.controlsScreen = game.add.group();
  	this.controlsBg = game.add.sprite(0,0,'controls-screen');
  	this.controlsReturnText = game.add.button(game.width/2,485,'controls-return', this.hideControls, this, 1,0,1);
  	this.controlsReturnText.anchor.setTo(0.5,0);
  	this.controlsScreen.alpha = 0;
  	this.controlsReturnText.input.enabled = false;

  	this.controlsScreen.add(this.controlsBg);
  	this.controlsScreen.add(this.controlsReturnText);

  	this.versionText = game.add.text(2,603,"V"+game.version, {fill:'white', font:'16px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
	this.versionText.anchor.setTo(0,1)
	this.versionText.alpha = 0.3;

	if (!game.musicAlreadyPlaying){
  		this.titletrack = game.add.audio('titletrack', 0.4);
		this.titletrack.loop = true;
		this.titletrack.play();
	}

	this.whiteCurtain = game.add.sprite(0,0, 'white');
  	this.whiteCurtain.alpha = 0;

  	var tween = game.add.tween(this.whiteCurtain).to( { alpha: .01}, 490, "Linear")
  	.to( { alpha: 1.0 }, 10, "Linear")
	.to( { alpha: 0}, 1000, "Linear")
	.start();


	this.retrieveScores();
},

	update: function(){
		game.physics.arcade.collide(this.logo, this.invisPlatform, this.toggleShake, null, this);

		if (game.time.now - this.timeCheck > 3000){
			if (!this.menuShown){
		 		this.menuShown = true;
		 		game.add.tween(this.playButton).to( { alpha: 1 }, 1000, "Linear", true);
		 		game.add.tween(this.controlsButton).to( { alpha: 1 }, 1000, "Linear", true);
		 		game.add.tween(this.highScoreButton).to( { alpha: 1 }, 1000, "Linear", true);
		 		game.add.tween(this.copyrightText).to( { alpha: 1 }, 1000, "Linear", true);
		 	}
		}

		this.shakeScreen();
	},

	toggleShake: function(){
		if (!this.hasShook){
			this.shaking = true;
			this.hasShook = true;
			game.time.events.add(Phaser.Timer.SECOND * .25, this.stopShaking, this).autoDestroy = true;
		}
	},

	stopShaking: function(){ this.shaking = false; },
	shakeScreen: function(){
		// if (this.shaking){
		// 	game.camera.x += Math.random()*10-5;
		//  	game.camera.y += Math.random()*10-5;
		// } else{
		// 	game.camera.x = 0;
		// 	game.camera.y = 0;
		// }
	},


	startGame: function(){
		if (this.choiceMade){return;}
		this.choiceMade = true;
		var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 1000, "Linear", true);
		this.titletrack.fadeOut(900)
		game.musicAlreadyPlaying = false;
		tween.onComplete.add(this.launchFirstLevel, this);
		// ga('send', 'event', 'betablasters', 'startedGame');
		game.timeStarted = Math.floor(game.time.time / 60000); // Time started, in seconds.
	},

	showHighScores: function(){
		game.musicAlreadyPlaying = true;
		// ga('send', 'event', 'betablasters', 'viewedHighScores');
		this.game.state.start("DisplayScores");
	},
	showControls: function(){
		this.playButton.input.enabled = false;
		this.controlsButton.input.enabled = false;
		this.highScoreButton.input.enabled = false;
		this.controlsReturnText.input.enabled = true;
		var tween = game.add.tween(this.controlsScreen).to( { alpha: 1 }, 200, "Linear", true);
		// ga('send', 'event', 'betablasters', 'viewedControls');
	},

	hideControls: function(){
		this.playButton.input.enabled = true;
		this.controlsButton.input.enabled = true;
		this.highScoreButton.input.enabled = true;
		this.controlsReturnText.input.enabled = false;
		var tween = game.add.tween(this.controlsScreen).to( { alpha: 0 }, 200, "Linear", true);
	},

	toggleMute: function(){ 
    	game.sound.mute = !game.sound.mute;
    	// ga('send', 'event', 'betablasters', 'hitMuteButton'); 
    	if (game.sound.mute){
      		this.soundToggle.frame = 2;
    	} else {
       		this.soundToggle.frame = 1;
    	}
  	},

	launchFirstLevel: function(){
		// for now, go right to gameplay

		//this.game.state.start("Cutscene");
		this.game.state.start("Gameplay");
	},

	retrieveScores: function(){
		// for now, disable scoreboard functionality.
		// var request = new XMLHttpRequest();
		// var path = "php/getscore.php";
		// //var path = "/wp-content/themes/lycored/getscore.php"
		// request.open('GET', path, true);

		// request.onload = function(){
		// 	if (request.status >= 200 && request.status < 400){
		// 		// Suceess
		// 		var data = JSON.parse(request.responseText);
		// 		console.log(data);
		// 		game.topScores = data;
		// 		// launch timer to go to score screen
		// 	} else {
		// 		// we reached our target server but error
		// 	}

		//};
	

		// request.onerror = function(){
		// 	// error
		// };

		// request.send();
	}
}