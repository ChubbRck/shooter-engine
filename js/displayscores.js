// displayscores.js -- Display the top 10 scores on the online leaderboard.


var DisplayScores = function(game){};

DisplayScores.prototype = {

	create: function(){	

		// Make the world larger than the screen to allow for a 'rumble' shake
		game.world.resize(1300,700);
		game.camera.x=0;
		game.camera.y=0;
		game.stage.backgroundColor = '#333333';
		this.skipped = false;
		this.returning = false;
	   	// this.titleBackground = game.add.sprite(0, 0, 'spacebg');
	   	this.cutsceneBackground = game.add.sprite(600,75,'displayscores-title'); // make this dynamic
	   	this.cutsceneBackground.anchor.setTo(0.5,0.5);
	   	this.cutsceneBackground.smoothed = false;

	   	this.skipButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	this.skipButton.onDown.add(function(){this.skipScene()}, this);
		
		this.firstInitial = game.add.bitmapText(494,385,'tandysoft'," ", 49);
	    this.firstInitial.anchor.setTo(0,0.5)

	 

		

      
		
     // 	game.time.events.add(8000, this.returnToTitle, this);
      	// Draw text based on level 
      	for (i=0; i<game.topScores.length;i++){
      // 		var eachInitials = game.add.bitmapText(335,150 + i*35,'tandysoft',i+1 + ". " + game.topScores[i]["initials"]+" . . . . . . . . . . "+ this.numberWithCommas(game.topScores[i]["score"]), 32);
	    	// eachInitials.anchor.setTo(0,0.5)
	    	// eachInitials.smoothed = false;
	    	var offset = 0;
	    	if (i == 9){
	    		offset = -10;
	    	}

	    	var eachInitials = game.add.bitmapText(335+offset,150 + i*40,'tandysoft',i+1 + ". " + game.topScores[i]["initials"], 32);
	    	eachInitials.anchor.setTo(0,0.5)
	    	eachInitials.smoothed = false;

	    	var dots = game.add.bitmapText(435,150+i*40,'tandysoft'," . . . . . . . . . . . ", 32);
	    	dots.anchor.setTo(0,0.5)
	    	dots.smoothed = false;

	    	var score = game.add.bitmapText(725,150 + i*40,'tandysoft',this.numberWithCommas(game.topScores[i]["score"]), 32);
	    	score.anchor.setTo(0,0.5)
	    	score.smoothed = false;
		}

		this.skipText = game.add.text(600,570,"HIT SPACEBAR TO SKIP", {fill:'#999999', font:'20px Coders', align: 'center', wordWrap: true, wordWrapWidth:700, });
		this.skipText.anchor.setTo(0.5,0.5);

		this.blackCurtain = game.add.sprite(0,0, 'black');
      	this.blackCurtain.alpha = 1;

      	game.add.tween(this.blackCurtain).to( { alpha: 0 }, 1000, "Linear", true);
	},

	
	determineRank: function(){
		 var determinedRank = "null rank";
		 for (i = 0; i < game.ranks.length; i++) { 
		 	if (game.score >= game.ranks[i]["threshold"]){
		 		determinedRank = game.ranks[i]["label"];
		 	}
		 }

		 return determinedRank; 
	},

	numberWithCommas: function(score){
    	return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	

	update: function(){
		
		
	},

	// submitScore: function(){
	// 	// Post the score to the table. 
	// 	var request = new XMLHttpRequest();
	// 	data = {
 //        	"initials": "EEE",
 //        	"score": 123456
 //    	}
 //    	var path = "php/addScore.php"
 //    	//var path = "/wp-content/themes/lycored/addScore.php"
	// 	request.open('POST', path, true);
	// 	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// 	request.send(JSON.stringify(data));

	// },

	skipScene: function(){
		console.log("trying to skip scene " + this.skipped)
		if (!this.skipped){
			this.skipped = true;


			this.returnToTitle();
		}
	},

	shutdown: function(){

	},
	returnToTitle: function(){
		//reset game score
		if (!this.returning){
			this.returning = true;
			//game.score = 0;
			var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 1000, "Linear", true);
			tween.onComplete.add(function(){ this.game.state.start('GameTitle'); }, this);
		}
	},

	
}