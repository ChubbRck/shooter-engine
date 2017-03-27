// gameover.js -- describes the game over state
var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){
  		var sg = this;
  		console.log("Score was " + game.score)
	},

	restartGame: function(){
		this.game.state.start("Level1");
	}
	
}