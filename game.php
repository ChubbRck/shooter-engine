<?php
// error_reporting(-1);
// ini_set('display_errors', 'On');
require 'phar://cloudconvert-php.phar/vendor/autoload.php';
use \CloudConvert\Api;
$api = new Api("K6ntrr7tSU2vr3L3x3zlsyBXWFuZCYL-rFnezS3cWFTzml5izdkS796Yx3oT9u6YBfh3jCuxl4UQxamX7qUj4g");

$query = $_GET["powerup_one"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/powerup_one.webm');
} else {
	// don't convert
}

$query = $_GET["powerup_two"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/powerup_two.webm');
} else {
	// don't convert
}

$query = $_GET["companion"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/companion.webm');
} else {
	// don't convert
}

$query = $_GET["enemy_one"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/enemy_one.webm');
} else {
	// don't convert
}

$query = $_GET["enemy_two"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/enemy_two.webm');
} else {
	// don't convert
}

$query = $_GET["enemy_three"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);
$gif = $result['data']['images']['fixed_height_small']['url'];
$gifExists = isset($gif);

if ($gifExists) {
	$api->convert([
	    "inputformat" => "gif",
	    "outputformat" => "webm",
	    "input" => "upload",
	    "save" => true,
	    "callback"=> "http://google.com",
	    "file" => fopen($gif, 'r'),
	])
	->wait()
	->download('assets/dynamic/enemy_three.webm');
} else {
	// don't convert
}

?>



<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>Shooter Engine Template</title>
	<link rel="stylesheet" href="css/fonts.css" type="text/css" media="screen" />

	<script type="text/javascript" src="js/md5.js"></script>
	<script type="text/javascript" src="js/phaser277.min.js"></script>
	<script type="text/javascript" src="js/phaser-debug.js"></script>
	<script type="text/javascript" src="js/level_data.js"></script>
	<script type="text/javascript" src="js/classes/Explosion.js"></script>
	<script type="text/javascript" src="js/classes/Powerup.js"></script>
	<script type="text/javascript" src="js/classes/Bullet.js"></script>
	<script type="text/javascript" src="js/classes/Weapons.js"></script>
	<script type="text/javascript" src="js/classes/Enemies.js"></script>
	<script type="text/javascript" src="js/classes/Buddy.js"></script>
	<script type="text/javascript" src="js/classes/Player.js"></script>
	<script type="text/javascript" src="js/boot.js"></script>
	<script type="text/javascript" src="js/preload.js"></script>
	<script type="text/javascript" src="js/gametitle.js"></script>
	<script type="text/javascript" src="js/gameplay.js"></script>
	<script type="text/javascript" src="js/gameover.js"></script>
	<script type="text/javascript" src="js/scoresummary.js"></script>
	<script type="text/javascript" src="js/toptenscore.js"></script>
	<script type="text/javascript" src="js/displayscores.js"></script>
	<script type="text/javascript" src="js/cutscene.js"></script>
    
    <style type="text/css">
        body {
            margin: 0;
            text-align: center;
        }
        p{
        	/*display:none;*/
        	position: absolute;
        	left:-9999px;
        	font-family: "Tandysoft";
        }
        p.coders{
        	font-family:"Coders";
        }
    </style>

    <script type="text/javascript">
		(function() {
		
				//Create a new game that fills the screen
				game = new Phaser.Game(1280,720, Phaser.AUTO, 'game-container');
				
				//Add all states
				game.state.add("Boot", Boot);
				game.state.add("Preload", Preload);
				game.state.add("GameTitle", GameTitle);
				game.state.add("Gameplay", Gameplay);
				game.state.add("GameOver", GameOver);
				game.state.add("Cutscene", Cutscene);
				game.state.add("ScoreSummary", ScoreSummary);
				game.state.add("TopTenScore", TopTenScore);
				game.state.add("DisplayScores", DisplayScores);
				//Start the first state
				game.state.start("Boot");

		})();
    </script>
    	
</head>
<body><p>.</p><p class = "coders">.</p>
	<div id = "game-container"></div>
</body>
</html>
