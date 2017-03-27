var Boot = function(game){

};
  
Boot.prototype = {

	preload: function(){
		//  Here we load the assets required for our preloader (in this case a background and a loading bar)
		path = "/wp-content/themes/lycored/dist/images/"
		path = 'assets/'
   
        this.game.load.spritesheet('lycoloading', path + 'misc/lycoloading-v2.png', 240, 240, 27);
        this.game.load.spritesheet('loading-text-v2', path + 'ui/loading-text-v2.png', 153, 27, 4);
	},
	
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}
}