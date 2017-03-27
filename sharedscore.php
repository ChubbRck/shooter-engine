<?php
$score = (int) $_GET['score'];
//$hash = $_GET['hash'];
$secret = 'superman37';

// if ( md5( $secret.$hash ) != $hash || $score > 1000000) {
// 	//header(404, 'Page Not Found');
// 	//exit();
// }
$levels = array(
		'BLAST CADET' => 0,
		'JUNIOR BLASTER' => 60000,
		'PHYTO WARRIOR'	=> 100000,
		'CYTO DEFENDER'	=> 120000,
		'LYCO BLASTER' => 150000,
		'CARO CRUSHER' => 200000,
		'ION ERASER' => 250000,
		'SWARM TROOPER' => 300000,
		'POWER BLASTER' => 350000,
		'MASTER BLASTER' => 400000,
		'BETA BLASTER' => 500000
);

$badge_filtered = array_filter($levels, function($i) use ($score) {
	return $i < $score;
});

end($badge_filtered);
$badge = key($badge_filtered);
?>
<!DOCTYPE html>
<head>
	<meta property="og:title" content="Play Lycored's Beta Blasters!" />
	<meta property="og:description" content="I scored <?php echo $score; ?> and earned the rank of <?php echo $badge; ?>. Play now to fight the Free Radicals and defeat evil Emperor Oxide with your beta-carotene blaster!"/>
	<meta property="og:site_name" content="Play Lycored's Beta Blasters!"/>
	<meta property="og:url" content="http://lycored.com/sharedscore.php?score=<?php echo $score; ?>" />
	<meta property="og:image" content="none" />
	<meta property="og:image:type" content="image/jpeg" />
</head>

<body>

<script>
window.location.replace("http://lycored.com/holistic-production");
</script>
</body>

</html>