<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require 'phar://cloudconvert-php.phar/vendor/autoload.php';
use \CloudConvert\Api;

$query = $_GET["q"];
$url = "http://api.giphy.com/v1/stickers/translate?s=" . $query . "&api_key=dc6zaTOxFJmzC";
$result = json_decode(file_get_contents($url), true);

$gif = $result['data']['images']['fixed_height_small']['url'];

$api = new Api("K6ntrr7tSU2vr3L3x3zlsyBXWFuZCYL-rFnezS3cWFTzml5izdkS796Yx3oT9u6YBfh3jCuxl4UQxamX7qUj4g");
 
$api->convert([
    "inputformat" => "gif",
    "outputformat" => "webm",
    "input" => "upload",
    "save" => true,
    "callback"=> "http://google.com",
    "file" => fopen($gif, 'r'),
])
->wait()
->download('assets/dynamic/fart.webm');
?>