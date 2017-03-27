// toptenscore.js -- If a player gets a top 10 score, they are prompted for three initials to post to the db.

// Wall.prototype = Object.create(Phaser.Sprite.prototype);
// Wall.prototype.constructor = Wall;

// Wall.prototype.disposeCheck = function () {
//     if (this.x + this.width < (game.camera.x - 50)) { this.kill(); }
// };

// /**
//  * Automatically called by World.update
//  */
// Wall.prototype.update = function() {
// 	this.disposeCheck();
// 	this.wallsRef.bringToTop(this.child);
// 	this.wallsRef.bringToTop(this.rightSide);
// 	this.wallsRef.bringToTop(this.leftSide);
// 	this.wallsRef.bringToTop(this.topSide);
// 	this.wallsRef.bringToTop(this.bottomSide);
// };

var TopTenScore = function(game){};

TopTenScore.prototype = {

	create: function(){

		

		// Make the world larger than the screen to allow for a 'rumble' shake
		game.world.resize(1300,700);
		game.camera.x=0;
		game.camera.y=0;
		game.stage.backgroundColor = '#ffffff';
		this.menuShown = false;
		this.returning = false;
		this.acceptingInput = true;
		this.initials = [];
		this.counter = 0;

		this.letters = [
		"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

		// Remove key bindings from earlier in the game (mute and pause)
		game.input.keyboard.removeKey(Phaser.Keyboard.P);
		game.input.keyboard.removeKey(Phaser.Keyboard.M);

		game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
		this.deleteKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		this.deleteKey.onDown.add(this.deleteInitial, this);
		this.places = [
			"1ST PLACE",
			"2ND PLACE",
			"3RD PLACE",
			"4TH PLACE",
			"5TH PLACE",
			"6TH PLACE",
			"7TH PLACE",
			"8TH PLACE",
			"9TH PLACE",
			"10TH PLACE"
		]

	   	// this.titleBackground = game.add.sprite(0, 0, 'spacebg');
	   	this.cutsceneBackground = game.add.sprite(600,250,'topten-scoreboard'); // make this dynamic
	   	this.cutsceneBackground.anchor.setTo(0.5,0.5);
	   	this.cutsceneBackground.smoothed = false;

	   	// this.cutsceneBackground.animations.add('run');
	   	// this.cutsceneBackground.animations.play('run', 2, true);
	   
	   	//find out where this score ranks
	   	this.whichPlace = null;
	   	for (i=0; i<game.topScores.length; i++){
      		// is score greater than this score?
      		if (game.score > game.topScores[i]["score"]){
        		this.whichPlace = i + 1; 
        		break;
      		} 
    	}

    	// move everything in the array back one 

    
    		
    

	    this.playerRank = this.determineRank(game.score);
	    var scoreString = this.numberWithCommas(game.score);
		

		this.firstInitial = game.add.bitmapText(494,385,'tandysoft'," ", 49);
	    this.firstInitial.anchor.setTo(0,0.5)

	    this.firstCursor = game.add.sprite(476,411,'cursor-image');
	    this.firstCursor.anchor.setTo(0,0.5);
	   	this.firstCursor.smoothed = false;
	    this.firstCursor.animations.add('blink');
	    this.firstCursor.animations.play('blink', 5, true);

	    this.secondCursor = game.add.sprite(562,411,'cursor-image');
	    this.secondCursor.anchor.setTo(0,0.5);
	   	this.secondCursor.smoothed = false;
	    this.secondCursor.animations.add('blink');
	    // this.secondCursor.animations.play('blink', 5, true);

	    this.thirdCursor = game.add.sprite(648,411,'cursor-image');
	    this.thirdCursor.anchor.setTo(0,0.5);
	   	this.thirdCursor.smoothed = false;
	    this.thirdCursor.animations.add('blink');
	    // this.thirdCursor.animations.play('blink', 5, true);

	    this.firstInitial.anchor.setTo(0,0.5)

	    this.secondInitial = game.add.bitmapText(582,385,'tandysoft'," ", 49);
	    this.secondInitial.anchor.setTo(0,0.5)

	    this.thirdInitial = game.add.bitmapText(668,385,'tandysoft'," ", 49);
	    this.thirdInitial.anchor.setTo(0,0.5)

	    this.placeText = game.add.bitmapText(600,76,'tandysoft',this.places[this.whichPlace-1], 49);
	    this.placeText.anchor.setTo(0.5,0.5)
	    this.placeText.smoothed = true;
	    this.placeText.originalX = 600;
	    this.placeText.originalY = 76;

		this.scoreText = game.add.bitmapText(500,225,'tandysoft', scoreString, 49);
		  // sg.scoreText = game.add.bitmapText(1190, -3, 'tandysoft','SCORE ' + game.score ,41);
		this.scoreText.anchor.setTo(0,0.5)
		this.scoreText.x = 660;
		this.scoreText.y = 233;
		this.scoreText.originalX = 660;
		this.scoreText.originalY = 233;
		this.scoreText.smoothed = false;
		this.rankText = game.add.text(840+45,250,this.determineRank(game.score), {fill:'white', font:'24px Coders', align: 'center', wordWrap: true, wordWrapWidth:650, });
		this.rankText.anchor.setTo(0,0.5)
		this.rankText.x = 580
		this.rankText.y = 151;
		this.rankText.originalX = 580;
		this.rankText.originalY = 151;
		this.rankText.smoothed = false;
		this.rankText.alpha = 1;

      	this.shareScoreTwitterButton = this.game.add.button(340, 490, 'topten-twitter-v2', this.shareScoreTwitter, this, 1,0,1);
	  	this.shareScoreTwitterButton.anchor.setTo(0.5,0)
	  	this.shareScoreTwitterButton.alpha = 1.0;
  		this.shareScoreTwitterButton.smoothed = false;

  		this.shareScoreFbButton = this.game.add.button(850, 490, 'topten-fb-v2', this.shareScoreFb, this, 1,0,1);
	  	this.shareScoreFbButton.anchor.setTo(0.5,0)
	  	this.shareScoreFbButton.alpha = 1.0;
  	
  		this.shareScoreFbButton.smoothed = false;

  		this.submitScoreButton = game.add.button(600,550,'topten-submit', this.submitScore, this, 1,0,1);
  		this.submitScoreButton.anchor.setTo(0.5,0)
  		this.submitScoreButton.alpha =1.0;
  		this.submitScoreButton.smoothed = false;
		this.submitScoreButton.y = 1300;

		this.blackCurtain = game.add.sprite(0,0, 'black');
      	this.blackCurtain.alpha = 1;

      	game.add.tween(this.blackCurtain).to( { alpha: 0 }, 1000, "Linear", true);
		
     // 	game.time.events.add(8000, this.returnToTitle, this);
      	// Draw text based on level 
	},

	deleteInitial: function(){
		console.log("initial deleted")
		this.initials.splice(-1,1)
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

	keyPress: function(char){
		// loop through the acceptable characters. If the key press corresponds to one of those, enter it in the next initial spot.
		// console.log(char);
		// console.log(char.keyCode);
		for (var i = 0; i < this.letters.length; i++){
        	var acceptableCharacter = this.letters[i];
       

        	if (char.toUpperCase() === acceptableCharacter){
        		// enter it in the current initial spot, if allowed, and move on!
        		if (this.acceptingInput){
        			this.initials.push(this.letters[i]);
        		}
        	}
    	}

	},

	update: function(){
		this.counter += 1;
			this.placeText.scale.x = 1.1 + Math.sin(this.counter/(75))*0.1;
			this.placeText.scale.y = 1.1 + Math.sin(this.counter/(75))*0.1;
		if(this.counter % 3 == 0){
			// this.placeText.x = this.placeText.originalX + Math.random()*5 - 2.5;
			// this.placeText.y = this.placeText.originalY + Math.random()*5 - 2.5;

			this.rankText.x = this.rankText.originalX + Math.random()*2 - 1;
			this.rankText.y = this.rankText.originalY + Math.random()*2 - 2;

			this.scoreText.x = this.scoreText.originalX + Math.random()*2 - 1;
			this.scoreText.y = this.scoreText.originalY + Math.random()*2 - 2;
		}
		//console.log(this.initials);
		if (this.initials.length > 2){ this.acceptingInput = false; this.submitScoreButton.y = 550 } else { this.acceptingInput = true; this.submitScoreButton.y = 1300 }

		if (this.initials[0]){
			this.firstInitial.text = this.initials[0];
		} else {
			this.firstInitial.text = " "
		}

		if (this.initials[1]){
			this.secondInitial.text = this.initials[1];
		} else {
			this.secondInitial.text = " "
		}

		if (this.initials[2]){
			this.thirdInitial.text = this.initials[2];
		} else {
			this.thirdInitial.text = " "
		}

		switch(this.initials.length){
			case 0: this.firstCursor.animations.play('blink', 5, true); this.secondCursor.frame = 0; this.thirdCursor.frame = 0; break;
			case 1: this.secondCursor.animations.play('blink', 5, true); this.firstCursor.frame = 0; this.thirdCursor.frame = 0; break;
			case 2: this.thirdCursor.animations.play('blink', 5, true); this.secondCursor.frame = 0; this.firstCursor.frame = 0; break;
			case 3: this.firstCursor.frame = 0; this.secondCursor.frame = 0; this.thirdCursor.frame = 0; break;
			break;
		}





		
	},

	submitScore: function(){
		// Post the score to the table. 
		var request = new XMLHttpRequest();
		var path = "php/addScore.php"
		//var path = "/wp-content/themes/lycored/getscore.php";

		var initials = this.initials[0] + this.initials[1] + this.initials[2];
		var score = game.score;
		var secret = "a.length&&(d=a.shift());";
		var md5 = CryptoJS.MD5( initials + score + secret );

		newData = {"initials":initials,"score":game.score};
		game.topScores.splice(this.whichPlace-1, 0, newData);
		game.topScores = game.topScores.splice(0,10);
		console.log(game.topScores);
		request.open('POST', path, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send( 'initials=' + initials + '&score=' + score + '&hash=' + md5 );

		this.proceedState();

	},

	shareScoreTwitter: function(){
		//var string = "I just scored " + game.score + " points and earned the rank of " + this.playerRank + " at Beta Blasters!";
		var key = "superman37";
		//var hash = md5(game.score.toString() + key); // "2063c1608d6e0baf80249c42e2be5804"
		var string = "I scored " + game.score + " on @LycoredLtd’s Beta Blasters! and earned the rank of " + this.playerRank + ". Try and top that. Play now at&url=http://bit.ly/1OQ6uvH";
		//var url = "http://twitter.com/share?text=" + string + "&url=http://www.lycored.com&hashtags=lycored,betablasters"
		var url = "http://twitter.com/share?text=" + string;
        var windowName = "Share Your Score";
        var left = (screen.width/2)-350;
        var top = (screen.height/2)-200;
        var windowSize = "width=765,height=500,top="+top+",left="+left;
        window.open(url, windowName, windowSize);
        ga('send', 'event', 'betablasters', 'sharedTwitter')
	},

	shareScoreFb: function(){
		//Open facebook modal
		var hash = "s"
		var encodedString = encodeURIComponent("http://www.lycored.com/sharedscore/?score=" + game.score);
		var url = "https://www.facebook.com/sharer.php?m2w&s=100&p[url]="+encodedString; 
        var windowName = "Share Your Score";
        var left = (screen.width/2)-350;
        var top = (screen.height/2)-200;
        var windowSize = "width=600,height=257,top="+top+",left="+left;
        window.open(url, windowName, windowSize);
        ga('send', 'event', 'betablasters', 'sharedFacebook')
	},

	proceedState: function(){
		//reset game score
		if (!this.returning){
			this.returning = true;
			game.score = 0;
			var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 1000, "Linear", true);
			tween.onComplete.add(function(){ this.game.state.start('DisplayScores'); }, this);
		}
	},

	
}