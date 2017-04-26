<?php
error_reporting(-1);
ini_set('display_errors', 'On');
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