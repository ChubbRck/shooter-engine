<?php
error_reporting(-1);
ini_set('display_errors', 'On');
// Full-size master image URL
$sourceImageUrl = 'http://media4.giphy.com/media/JoaeMGYYkHpC/100.gif';

// Comma-separated options string
$options = 'format=webm';

// Settings needed to switch to the POST method
$postContext = stream_context_create([
    'http' => [
        'method' => 'POST',
    ],
]);

// Get image data from the API
$imageData = file_get_contents(
    'https://im2.io/bjgzgbzvtk/' . $options . '/' . $sourceImageUrl,
    false, $postContext);

// At this point $imageData contains resized/optimized image
// You can save it to the disk on the server
file_put_contents('image-optimized.webm', $imageData);