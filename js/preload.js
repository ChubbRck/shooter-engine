var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 

		path = "/wp-content/themes/lycored/dist/images/"
	    path = 'assets/'
		game.time.advancedTiming = true;
			//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		game.stage.backgroundColor = '#171717';
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		// this.preloadBar = this.add.sprite(100, 300, 'preloaderBar');
		this.lycoloading = game.add.sprite(120,120,'lycoloading');
	   	this.lycoloading.anchor.setTo(0.5,0.5);
	   	this.lycoloading.x = 1200/2;
	   	this.lycoloading.y = 600/2;
	    this.lycoloading.animations.add('run');
	    this.lycoloading.animations.play('run',15, true);

	    this.loadingText = game.add.sprite(120,120,'loading-text-v2');
	    this.loadingText.anchor.setTo(0.5,0.5);
	   	this.loadingText.x = 1200/2;
	   	this.loadingText.y = 500;
	   	this.loadingText.smoothed = false;
	   	this.loadingText.animations.add('run');
	    this.loadingText.animations.play('run',3, true);

	    this.dtext = game.add.text(0,0,"d", {fill:'white', font:'22px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
	    this.dtext.alpha = 0.1;

	    //capture the spacebar to prevent the browser from stealing focus 

	    this.nullButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		//	This sets the preloadBar sprite as as loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		// Cutscene assets

		this.game.load.spritesheet('cutscene-frame',  path + 'screens/cutscene-frame.png', 1104, 434, 2);
		this.game.load.image('cutscene-powerups',  path + 'screens/cutscene-powerups.png');
		this.game.load.image('cutscene-buddies',  path + 'screens/cutscene-buddies.png');
	
		// Titles

		this.game.load.image('level-1-title',  path + 'titles/level-1-title.png');
		this.game.load.image('level-1-subtitle',  path + 'titles/level-1-subtitle.png');

		this.game.load.image('level-2-title',  path + 'titles/level-2-title.png');
		this.game.load.image('level-2-subtitle',  path + 'titles/level-2-subtitle.png');

		this.game.load.image('level-3-title',  path + 'titles/level-3-title.png');
		this.game.load.image('level-3-subtitle',  path + 'titles/level-3-subtitle.png');

		// Weapons + Bullets

		this.game.load.spritesheet('beam-left',  path + 'weapons/beam-left.png',20,20,3);
		this.game.load.spritesheet('beam-right',  path + 'weapons/beam-right.png',20,20,3);
		this.game.load.spritesheet('beam',  path + 'weapons/beam.png',20,20,3);
		this.game.load.spritesheet('badbullet-sprite',  path + 'bullets/badbullet-sprite.png', 40, 18, 2);
		this.game.load.spritesheet('bullet-sprite',  path + 'bullets/bullet_sm_sprite.png', 40, 18, 2);
		this.game.load.spritesheet('bullet-md-sprite',  path + 'bullets/bullet_md_sprite.png', 40, 18, 2);
		this.game.load.spritesheet('boss-bullet-sprite',  path + 'bullets/boss-bullet-sprite.png', 120, 80, 3);
		this.game.load.spritesheet('ring-sprite',  path + 'bullets/ring_sprite_v.png', 50,126,8)
		this.game.load.spritesheet('missile_sprite',  path + 'bullets/missile_sprite.png', 36,18,2);

		// Backgrounds

		this.game.load.image('title-bg-back', path + 'backgrounds/title-bg-back.png');
		this.game.load.image('title-bg-middle', path + 'backgrounds/title-bg-middle.png');
		this.game.load.image('title-bg-front', path + 'backgrounds/title-bg-front.png');
		
		this.game.load.image('l1_back',  path + 'backgrounds/l1_back-v2.png');
		this.game.load.image('l1_middle',  path + 'backgrounds/l1_middle-v3.png');
		this.game.load.image('l1_front',  path + 'backgrounds/l1_front-v2.png');

		this.game.load.image('l2_back',  path + 'backgrounds/l2_back-v3.png');
		this.game.load.image('l2_middle_top',  path + 'backgrounds/l2_middle_top.png');
		this.game.load.image('l2_middle_bottom',  path + 'backgrounds/l2_middle_bottom.png');
		this.game.load.image('l2_front_top',  path + 'backgrounds/l2_front_top.png');
		this.game.load.image('l2_front_bottom',  path + 'backgrounds/l2_front_bottom.png');

		this.game.load.image('l3_back',  path + 'backgrounds/l3_back_v2.png');
		this.game.load.image('l3_middle',  path + 'backgrounds/l3_middle.png');
		this.game.load.image('l3_front',  path + 'backgrounds/l3_front.png');

		this.game.load.image('l3_back_s2',  path + 'backgrounds/l3_back_v2.png');
		this.game.load.image('l3_middle_s',  path + 'backgrounds/l3_middle_s2.png');
		this.game.load.image('l3_front_s',  path + 'backgrounds/l3_front_s.png');


		// UI

		this.game.load.spritesheet('healthbar-sprite',  path + 'ui/healthbar.png', 218, 36, 6);
		this.game.load.spritesheet('livesbar-sprite',  path + 'ui/livesbar-v2.png', 128, 32, 5);
		this.game.load.image('uibar-sprite',  path + 'ui/border.png');
		this.game.load.spritesheet('title-start-button',  path + 'ui/title-start-game.png', 227,20,2);
		this.game.load.spritesheet('title-controls',  path + 'ui/title-controls.png', 193,20,2);
		this.game.load.spritesheet('title-high-scores',  path + 'ui/title-high-scores.png', 238,20,2);
		this.game.load.spritesheet('controls-return',  path + 'ui/controls-return.png', 380,20,2);
		this.game.load.spritesheet('cursor-image',  path + 'ui/cursor.png', 59,6,2);
		this.game.load.image('title-copyright',  path + 'ui/title-copyright.png');
		this.game.load.image('controls-screen',  path + 'screens/controls-screen.png');
		this.game.load.image('game-over-text',  path + 'titles/game-over-text.png');
		this.game.load.spritesheet('mute-sprite',  path + 'ui/mute.png', 44, 28, 2);
		this.game.load.image('pause',  path + 'ui/pause.png');
		
		// Wall textures

		this.game.load.image('wall_dark',  path + 'walls/wall_dark.png');
		this.game.load.image('wall_light',  path + 'walls/wall_light.png');
		this.game.load.image('wall_light_top',  path + 'walls/wall_light_top.png');
		this.game.load.image('wall_dark_bottom',  path + 'walls/wall_dark_bottom.png');
		this.game.load.image('wall_green',  path + 'walls/wall_green.png');
		this.game.load.image('wall-border-green',  path + 'walls/wall-border-green.jpg');
		this.game.load.image('wall-border-green',  path + 'walls/wall-border-green.jpg');
		this.game.load.image('wall-3-pattern',  path + 'walls/wall_3_pattern.png');

		this.game.load.image('wall_1_dark',  path + 'walls/wall_1_dark.png');
		this.game.load.image('wall_1_light',  path + 'walls/wall_1_light.png');
		this.game.load.image('wall_1_light_top',  path + 'walls/wall_1_light_top.png');
		this.game.load.image('wall_1_dark_bottom',  path + 'walls/wall_1_dark_bottom.png');
		this.game.load.image('wall_1',  path + 'walls/wall_1.png');
		this.game.load.image('wall_1_border',  path + 'walls/wall_1_border.png');
		this.game.load.image('wall-1-pattern',  path + 'walls/wall_1_pattern.png');

		this.game.load.image('wall_2_dark',  path + 'walls/wall_2_dark.png');
		this.game.load.image('wall_2_light',  path + 'walls/wall_2_light.png');
		this.game.load.image('wall_2_light_top',  path + 'walls/wall_2_light_top.png');
		this.game.load.image('wall_2_dark_bottom',  path + 'walls/wall_2_dark_bottom.png');
		this.game.load.image('wall_2',  path + 'walls/wall_2.png');
		this.game.load.image('wall_2_border',  path + 'walls/wall_2_border.png');
		this.game.load.image('wall-2-pattern',  path + 'walls/wall_2_pattern.png');

		// Misc
		
		this.game.load.image('black',  path + 'misc/black.jpg');
		this.game.load.image('white',  path + 'misc/white.jpg');

		// Screens

		this.game.load.image('pause-screen',  path + 'screens/pause-screen.png');
		this.game.load.spritesheet('pause-resume-text',  path + 'ui/pause-resume.png', 312,20,2);
		this.game.load.spritesheet('pause-return-to-menu-text',  path + 'ui/pause-return-to-menu.png', 380,20,2)
		this.game.load.spritesheet('ss-share-score-text',  path + 'ui/ss-share-score.png', 244,20,2)
		this.game.load.image('scoresummary-frame',  path + 'screens/scoresummary-frame.png');
		this.game.load.image('scoresummary-frame-won',  path + 'screens/scoresummary-frame-won.png');
		this.game.load.image('titlescreen-title',  path + 'screens/titlescreen-title.png');
		this.game.load.image('titlescreen-subtitle',  path + 'screens/titlescreen-subtitle.png');
		this.game.load.image('titlescreen-controls',  path + 'screens/titlescreen-controls.png');
		this.game.load.image('topten-scoreboard',  path + 'screens/topten-scoreboard.png');
		this.game.load.spritesheet('topten-fb-v2',  path + 'screens/topten-fb-v2.png', 346,20,2)
		this.game.load.spritesheet('topten-twitter-v2',  path + 'screens/topten-twitter-v2.png', 323,20,2)
		this.game.load.spritesheet('topten-submit',  path + 'screens/topten-submit.png', 255,20,2)
		this.game.load.spritesheet('share-on-twitter',  path + 'screens/share-on-twitter.png', 323,20,2)
		this.game.load.spritesheet('share-on-facebook',  path + 'screens/share-on-facebook.png', 346,20,2)
		
		this.game.load.image('displayscores-title', path + 'screens/displayscores-title.png');
		this.game.load.spritesheet('titlescreen-title-sheet',  path + 'screens/titlescreen-title-sheet.png',1200,324,7)
			
		// Explosions

		this.game.load.spritesheet('explosion-sprite-a',  path + 'explosions/explosion_enemy_spreadsheet_a.png', 120, 120, 9)
		this.game.load.spritesheet('explosion-sprite-b',  path + 'explosions/explosion_enemy_spreadsheet_b.png', 120, 120, 9)
		this.game.load.spritesheet('explosion-sprite-c',  path + 'explosions/explosion_enemy_spreadsheet_c.png', 120, 120, 9)
		this.game.load.spritesheet('explosion-small-sprite',  path + 'explosions/explosion-small-sprite.png', 30, 30, 6)
		this.game.load.spritesheet('gem-explosion-sprite', path + 'explosions/gem_explosion_sprite.png', 180, 200, 9)
	
		// Buddies

		this.game.load.spritesheet('buddy_ll',  path + 'buddies/buddy_ll.png', 60, 60, 2)
		this.game.load.spritesheet('buddy_ff',  path + 'buddies/buddy_ff.png', 60, 60, 2)
		this.game.load.spritesheet('buddy_lu',  path + 'buddies/buddy_lu.png', 60, 60, 2)
		this.game.load.spritesheet('buddy_ms',  path + 'buddies/buddy_mx.png', 60, 60, 2)

		// Enemies
	
		this.game.load.image('straight-enemy',  path + 'enemies/straight.png');
		this.game.load.image('wave-enemy',  path + 'enemies/wave.png');
		this.game.load.image('bounce-enemy',  path + 'enemies/bounce.png');
		this.game.load.image('static-enemy',  path + 'enemies/static.png');
		this.game.load.image('drop-enemy',  path + 'enemies/drop.png');
		this.game.load.image('cross-enemy',  path + 'enemies/cross.png');
		this.game.load.image('angle-enemy',  path + 'enemies/angle.png');
		this.game.load.spritesheet('dodge-enemy',  path + 'enemies/dodge.png', 60, 60, 2);
		this.game.load.spritesheet('seek-enemy',  path + 'enemies/seek.png', 60, 60, 2);
	    this.game.load.spritesheet('seek-enemy-pink',  path + 'enemies/seek-pink.png', 60, 60, 2);

		this.game.load.spritesheet('miniboss-1',  path + 'enemies/miniboss_1.png', 150, 150, 3);
		this.game.load.spritesheet('miniboss-2',  path + 'enemies/miniboss_2.png', 150, 150, 3);
		this.game.load.spritesheet('miniboss-3',  path + 'enemies/miniboss_3.png', 150, 150, 3);
		this.game.load.spritesheet('spinboss', path + 'enemies/spinboss.png', 400, 400, 3);
		this.game.load.spritesheet('finalboss-base',  path + 'enemies/finalboss-base.png', 262,332,3);
		this.game.load.spritesheet('finalboss-eye',  path + 'enemies/finalboss-eye.png', 68,100,5);
		this.game.load.spritesheet('finalboss-gem', path + 'enemies/finalboss-gem.png', 92, 160, 9);
		
		// Player Graphics

		this.game.load.spritesheet('blake-sprite-v3',  path + 'player/blake-sprite-v3.png', 70, 86, 3);
		this.game.load.image('bubble-sm',  path + 'player/bubble_sm.png');
		this.game.load.image('bubble-md',  path + 'player/bubble_md.png');
		this.game.load.image('bubble-lg',  path + 'player/bubble_lg.png');

		// Powerups

		this.game.load.image('cherry',  path + 'powerups/cherry.png');
		this.game.load.image('grapefruit',  path + 'powerups/grapefruit.png');
		this.game.load.image('orange',  path + 'powerups/orange.png');
		this.game.load.image('watermelon',  path + 'powerups/watermelon.png');
		this.game.load.image('broccoli',  path + 'powerups/broccoli.png');
		this.game.load.image('cabbage',  path + 'powerups/cabbage.png');
		this.game.load.image('carrot',  path + 'powerups/carrot.png');
		this.game.load.image('pumpkin',  path + 'powerups/pumpkin.png');
		this.game.load.spritesheet('lycocoin-spritesheet',  path + 'powerups/lycocoin-spritesheet.png', 60, 60, 6);
		
		// Audio
		
		game.load.audio('wave',  path + 'audio/wave.mp3');
		game.load.audio('cutscenetrack',  path + 'audio/debrieffinal.mp3');
		game.load.audio('laser',  path + 'audio/laser.mp3');
		game.load.audio('gametrack',  path + 'audio/gametrack.mp3');
		game.load.audio('bosstrack',  path + 'audio/bosstrack.mp3');
		game.load.audio('titletrack',  path + 'audio/titletrack.mp3');
		game.load.audio('testblip1',  path + 'audio/testblip.mp3');
		game.load.audio('missile',  path + 'audio/missile1.mp3');
		game.load.audio('powerup',  path + 'audio/powerup.mp3');
		game.load.audio('explosion1',  path + 'audio/explosion1.mp3');
		game.load.audio('bosslaser',  path + 'audio/bosslaser-faster.mp3');

		// Voiceover

		game.load.audio('vo-haha',  path + 'audio/vo-haha.mp3');
		game.load.audio('vo-lutina-v3',  path + 'audio/vo-lutina-v3.mp3');
		game.load.audio('vo-masterxanthan',  path + 'audio/vo-masterxanthan.mp3');
		game.load.audio('vo-lordlycopene',  path + 'audio/vo-lordlycopene.mp3');
		game.load.audio('vo-needahand',  path + 'audio/vo-needahand.mp3');
		game.load.audio('vo-niceshooting',  path + 'audio/vo-niceshooting.mp3');
		game.load.audio('vo-letsdothis',  path + 'audio/vo-letsdothis.mp3');
		game.load.audio('vo-ahoythere', path + 'audio/vo-ahoythere.mp3');
		game.load.audio('vo-perhaps', path + 'audio/vo-perhaps.mp3');
		game.load.audio('vo-fightofluene', path + 'audio/vo-fightofluene.mp3');
		game.load.audio('vo-blasterupgrade', path + 'audio/vo-blasterupgrade.mp3');
		game.load.audio('vo-speedup', path + 'audio/vo-speedup.mp3');
		game.load.audio('vo-1up', path + 'audio/vo-1up.mp3');
		game.load.audio('vo-gameover',  path + 'audio/vo-gameover.mp3');
		game.load.audio('vo-nomnom',  path + 'audio/vo-nomnom.mp3');
		game.load.audio('vo-seeya',  path + 'audio/vo-seeya.mp3');
		game.load.audio('vo-ouch',  path + 'audio/vo-ouch.mp3');


		// Fonts

		game.load.bitmapFont('tandysoft', path + 'fonts/tandysoft.png',  path + 'fonts/tandysoft.fnt');
		game.load.bitmapFont('coders', path + 'fonts/coders.png',  path + 'fonts/coders.fnt');
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}