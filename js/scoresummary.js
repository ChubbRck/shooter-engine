// scoresummary.js -- After the game over text, this score summary screen displays to show the score. It also shows if the player beats the game.
var ScoreSummary = function(game){};

ScoreSummary.prototype = {

	create: function(){
		// Make the world larger than the screen to allow for a 'rumble' shake
		game.world.resize(1300,700);
		game.camera.x=0;
		game.camera.y=0;
		game.stage.backgroundColor = '#333333';
		this.menuShown = false;
		this.returning = false;
		// game.ranks = [
		// 	{"label": "PHYTO-DEFENDER", "threshold":0},
		// 	{"label" :"PHYTO-WARRIOR", "threshold":10000},
		// 	{"label" : "ION DEFENDER", "threshold":30000},
		// 	{"label" : "ION ERASER", "threshold":50000},
		// 	{"label" : "CYTO BLASTER", "threshold":75000},
		// 	{"label" : "JUNIOR BLASTER", "threshold":120000},
		// 	{"label" : "MASTER BLASTER", "threshold":175000}
		// ];

	   	// this.titleBackground = game.add.sprite(0, 0, 'spacebg');
	   	if (game.level == 4){
	   		this.cutsceneBackground = game.add.sprite(600+45,250,'scoresummary-frame-won'); // make this dynamic
	   	} else {
	   		this.cutsceneBackground = game.add.sprite(600+45,250,'scoresummary-frame'); // make this dynamic
	   	}

	   	this.cutsceneBackground.anchor.setTo(0.5,0.5);

	   	// this.cutsceneBackground.animations.add('run');
	   	// this.cutsceneBackground.animations.play('run', 2, true);
	   
	    this.playerRank = this.determineRank(game.score);
		this.introtext = game.add.text(268+45,250,game.score, {fill:'white', font:'46px Coders', align: 'center', wordWrap: true, wordWrapWidth:650, });
		this.introtext.anchor.setTo(0,0.5)
		this.introtext.x = 268 + 45 - this.introtext.width/2;
		this.introtext.smoothed = false;
		this.rankText = game.add.text(840+45,250,this.determineRank(game.score), {fill:'white', font:'32px Coders', align: 'center', wordWrap: true, wordWrapWidth:650, });
		this.rankText.anchor.setTo(0,0.5)
		this.rankText.x = 840 + 45 - this.rankText.width/2;
		this.rankText.smoothed = false;


    //   	this.shareScoreButton = this.game.add.button(600, 490, 'ss-share-score-text', this.shareScore, this, 1,0,1);
	  	// this.shareScoreButton.anchor.setTo(0.5,0)
	  	// this.shareScoreButton.alpha = 1.0;
  	
  		// this.shareScoreButton.smoothed = false;

  		this.shareScoreTwitterButton = this.game.add.button(340, 490, 'share-on-twitter', this.shareScoreTwitter, this, 1,0,0);
	  	this.shareScoreTwitterButton.anchor.setTo(0.5,0)
	  	this.shareScoreTwitterButton.alpha = 1.0;
  		this.shareScoreTwitterButton.smoothed = false;

  		this.shareScoreFbButton = this.game.add.button(850, 490, 'share-on-facebook', this.shareScoreFb, this, 1,0,0);
	  	this.shareScoreFbButton.anchor.setTo(0.5,0)
	  	this.shareScoreFbButton.alpha = 1.0;
  		this.shareScoreFbButton.smoothed = false;

  		this.returnToMenuButton = game.add.button(600,540,'pause-return-to-menu-text', this.returnToTitle, this, 1,0,0);
  		this.returnToMenuButton.anchor.setTo(0.5,0)
  		this.returnToMenuButton.alpha =1.0;
		

		this.blackCurtain = game.add.sprite(0,0, 'black');
      	this.blackCurtain.alpha = 1;

      	game.add.tween(this.blackCurtain).to( { alpha: 0 }, 1000, "Linear", true);
		
     // 	game.time.events.add(8000, this.returnToTitle, this);
      	// Draw text based on level 
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

	update: function(){
	
		
		
	},
	shareScoreTwitter: function(){
		//var string = "I just scored " + game.score + " points and earned the rank of " + this.playerRank + " at Beta Blasters!";
		var key = "superman37";
		//var hash = md5(game.score.toString() + key); // "2063c1608d6e0baf80249c42e2be5804"
		var string = "I scored " + game.score + " on @LycoredLtd’s Beta Blasters! and earned the rank of " + this.playerRank + ". Try and top that. Play now at&url=http://lycored.com/holistic-production"
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

	returnToTitle: function(){
		//reset game score
		if (!this.returning){
			this.returning = true;
			game.score = 0;
			var tween = game.add.tween(this.blackCurtain).to( { alpha: 1 }, 1000, "Linear", true);
			tween.onComplete.add(function(){ this.game.state.start('GameTitle'); }, this);
		}
	},

	
}