// cutscene.js -- An inter-level cutscene state. Uses a global variable (game.level) to determine which cutscene to play.
var Cutscene = function(game){};

Cutscene.prototype = {

	create: function(){
		// Make the world larger than the screen to allow for a 'rumble' shake
		game.world.resize(1300,700);
		game.camera.x=0;
		game.camera.y=0;
		game.stage.backgroundColor = '#333333';
		this.menuShown = false;
		this.skipped = false;
		this.introSlide = game.introSlide;

		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	this.fireButton.onDown.add(function(){this.skipScene()}, this);

	   	// this.titleBackground = game.add.sprite(0, 0, 'spacebg');
	   	this.cutsceneBackground = game.add.sprite(600,300,'cutscene-frame'); // make this dynamic
	   	this.cutsceneBackground.anchor.setTo(0.5,0.5);

	   	this.cutsceneBackground.animations.add('run');
	   	this.cutsceneBackground.animations.play('run', 2, true);


	   
	  	switch (game.level){
	  		case 1: //starting game
	  			switch (this.introSlide){
	  				case 1:
	  				  	game.cutscenetrack = game.add.audio('cutscenetrack', 0.6);
   		 				game.cutscenetrack.loop = true;
	  				  	game.cutscenetrack.play();
	  					this.introtext = game.add.text(390,120,"[MESSAGE FROM ADMIRAL ALPHA]\n\nCAPTAIN BLAKE C. TRISPORA, THANK GOODNESS YOU'RE HERE!\n\nAS YOU KNOW, OUR CELLS HAVE BEEN INVADED BY AN ARMY OF NASTY HEMOGOBLINS AND FREE RADICALS LED BY THE EVIL EMPEROR OXIDE. WE'VE BEEN BATTLING THEM FOR DAYS BUT TO NO AVAIL.\n\nTO QUOTE A FAMOUS PRINCESS, \"YOU ARE OUR ONLY HOPE.\"", {fill:'white', font:'24px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
      					this.introtext.anchor.setTo(0,0)
      				break;
      				case 2:
      					this.cutsceneBackground.alpha = 0;
      					this.powerupCutscene = game.add.sprite(600,300, 'cutscene-powerups');
      					this.powerupCutscene.anchor.setTo(0.5,0.5)
      				break;
      				case 3:
      					this.cutsceneBackground.alpha = 0;
	  					this.powerupCutscene = game.add.sprite(600,300, 'cutscene-buddies');
      					this.powerupCutscene.anchor.setTo(0.5,0.5)
      				break;
      				case 4:
	  					this.introtext = game.add.text(390,120,"[MESSAGE FROM ADMIRAL ALPHA]\n\nAPPROACHING THE OUTER CELL WALL. PREPARE FOR INSERTION DROP.\n\nLOCK AND LOAD, CAPTAIN BLAKE! WATCH OUT FOR THOSE HEMOGOBLINS.\n\nGODSPEED AND GOOD LUCK.", {fill:'white', font:'24px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
      					this.introtext.anchor.setTo(0,0)
      				break;

      			}
      		break;
	  		case 2: //entering level 2
	  		   	game.cutscenetrack = game.add.audio('cutscenetrack', 0.2);
   		 		game.cutscenetrack.loop = true;
	  		  	game.cutscenetrack.play();
	  			this.introtext = game.add.text(390,120,"[MESSAGE FROM ADMIRAL ALPHA]\n\nCONGRATS, BLAKE. YOU MADE IT INSIDE THE CELL MATRIX.\n\nWE'VE HEARD REPORTS OF MAJOR FREE RADICAL ACTIVITY NEAR YOUR POSITION AND A POSSIBLE SIGHTING OF OXIDOSA, THE RUTHLESS FREE RADICAL WARRIOR PRINCESS.\n\nKEEP YOUR EYES OPEN AND YOUR BLASTERS ON!", {fill:'white', font:'24px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
      			this.introtext.anchor.setTo(0,0)
      		break;
      		case 3: //entering level 3
      		   	game.cutscenetrack = game.add.audio('cutscenetrack', 0.2);
   		 		game.cutscenetrack.loop = true;
      			game.cutscenetrack.play();
      			this.introtext = game.add.text(390,120,"[MESSAGE FROM ADMIRAL ALPHA]\n\nNICE SHOOTING, CAPTAIN BLAKE. TALK ABOUT TAKING CARO BUSINESS!\n\nWELCOME TO THE CELL NUCLEUS. YOU'VE MADE IT FARTHER THAN ANY OF OUR OTHER AGENTS.\n\nLET'S FLUSH THESE RADICALS ONCE AND FOR ALL. EMPEROR OXIDE, YOU BETA WATCH OUT. I'VE GOT MY ION YOU!", {fill:'white', font:'24px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
      			this.introtext.anchor.setTo(0,0)
      		break;
      		case 4: // game has been beaten
      		   	game.cutscenetrack = game.add.audio('cutscenetrack', 0.2); // change to victory track
   		 		game.cutscenetrack.loop = true;
      			this.introtext = game.add.text(390,120,"[MESSAGE FROM ADMIRAL ALPHA]\n\nYOU DID IT! YOU DEFEATED ALL THE FREE RADICALS AND HEMOGOBLINS. YOU PUT THEM WHERE THEY BELONG: IN THE BLAST TENSE. WHO SAYS THERE'S NO SUCH THING AS A FREE (RADICAL) LUNCH?\n\nTHANKS TO YOU, WE'RE NOW FREE OF EMPEROR OXIDE'S REIGN OF TERROR AND THE SAFETY OF OUR CELLS IS ASSURED.", {fill:'white', font:'24px Coders', align: 'left', wordWrap: true, wordWrapWidth:700, });
      			this.introtext.anchor.setTo(0,0)
      			// Just go right to score summary screen
      			this.game.state.start('ScoreSummary')
      		break;

      	}

		this.skipText = game.add.text(600,570,"HIT SPACEBAR TO SKIP", {fill:'#999999', font:'20px Coders', align: 'center', wordWrap: true, wordWrapWidth:700, });
		this.skipText.anchor.setTo(0.5,0.5);

		this.blackCurtain = game.add.sprite(0,0, 'black');

      	this.blackCurtain.alpha = 1;

      	if (game.level == 1) {
      		game.add.tween(this.blackCurtain).to( { alpha: 0 }, 500, "Linear", true);
		} else {
			game.add.tween(this.blackCurtain).to( { alpha: 0 }, 2000, "Linear", true);
		}
      	this.proceedTimer = game.time.events.add(20000, this.startNextLevel, this);
      	// Draw text based on level 
	},

	update: function(){
	
		// check for cutscene skip
		
	},

	skipScene: function(){
		if (!this.skipped){
			this.skipped = true;

			//cancel timer
			
			game.time.events.remove(this.proceedTimer);

			this.startNextLevel();
		}
	},


	startNextLevel: function(){
		if (game.level == 1 && this.introSlide != 4){
			var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 500, "Linear", true);
			game.introSlide += 1;
			tween.onComplete.add(function(){ this.game.state.start('Cutscene'); }, this);

		} else if (game.level == 4){
			// Game has been beaten! Go to game over screen.
			this.game.state.start('ScoreSummary')

		} else {
			var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 1000, "Linear", true);
			game.cutscenetrack.fadeOut(500);
			game.introSlide = 1;
			tween.onComplete.add(function(){ this.game.state.start('Gameplay'); }, this);
		}
		
	},

	
}