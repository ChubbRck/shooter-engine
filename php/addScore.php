<?php
// Database credentials

if ($_SERVER['SERVER_NAME'] == 'localhost') {
	$servername = "localhost";
	$username = "lycogame";
	$password = "superman37";
	$dbname = "lycogame";
} else if ($_SERVER['SERVER_NAME'] == 'lycogame-shooter.madwell.net') {
	$servername = "localhost";
	$username = "lycogame";
	$password = "superman37";
	$dbname = "lycogame";
}
else {
	$servername = $_SERVER['RDS_HOSTNAME'];
	// $servername = 'aac0n94wy8lo.cgommacqbldw.us-west-2.rds.amazonaws.com'
	$username = $_SERVER['RDS_USERNAME'];
	$password = $_SERVER['RDS_PASSWORD'];
	$dbname = $_SERVER['RDS_DB_NAME'];
}

// Create connection
$conn = new mysqli ( $servername, $username, $password, $dbname );

// Check connection
if ($conn->connect_error) {
	die ( "Connection failed: " . $conn->connect_error );
}

// These are our variables.
$initials = $_POST['initials'];
$score = $_POST['score'];
$json = $_POST["data"];
$hash = $_POST['hash'];

// key
$secretKey = "a.length&&(d=a.shift());";

// We md5 hash our results.
$expected_hash = md5 ( $initials . $score . $secretKey );

$initials = clean_initials( $initials );

// If what we expect is what we have:
if( $expected_hash == $hash) {

	$query = "INSERT INTO score SET initials = '$initials', score = '$score', ts = CURRENT_TIMESTAMP";
	
	// prepare and bind
	$stmt = $conn->prepare ( "INSERT INTO score (initials, score) VALUES (?, ?)" );
	$stmt->bind_param ( "si", $initials, $score );
	$stmt->execute ();
	$stmt->close ();
	$conn->close ();

}


/**
 * Remove bad words from leaderboard initials
 * @param string $string user's initials
 * @return string cleaned initials
 */
function clean_initials($string) {
	$string = strtolower($string);
	$badwords = array('ass', 'fuc', 'fuk', 'fuq', 'fux', 'fck', 'coc', 'cok', 'coq', 'kox', 'koc', 'kok', 'koq', 'cac', 'cak', 'caq', 
			'kac', 'kak', 'kaq', 'dic', 'dik', 'diq', 'dix', 'dck', 'pns', 'psy', 'fag', 'fgt', 'ngr', 'nig', 'cnt', 
			'knt', 'sht', 'dsh', 'twt', 'bch', 'cum', 'clt', 'kum', 'klt', 'suc', 'suk', 'suq', 'sck', 'lic', 'lik', 
			'liq', 'lck', 'jiz', 'jzz', 'gay', 'gey', 'gei', 'gai', 'vag', 'vgn', 'sjv', 'fap', 'prn', 'lol', 'jew', 
			'joo', 'gvr', 'pus', 'pis', 'pss', 'snm', 'tit', 'fku', 'fcu', 'fqu', 'hor', 'slt', 'jap', 'wop', 'kik', 'kyk', 
			'kyc', 'kyq', 'dyk', 'dyq', 'dyc', 'kkk', 'jyz', 'prk', 'prc', 'prq', 'mic', 'mik', 'miq', 'myc', 'myk', 'myq', 
			'guc', 'guk', 'guq', 'giz', 'gzz', 'sex', 'sxx', 'sxi', 'sxe', 'sxy', 'xxx', 'wac', 'wak', 'waq', 'wck', 'pot', 
			'thc', 'vaj', 'vjn', 'nut', 'std', 'lsd', 'poo', 'azn', 'pcp', 'dmn', 'orl', 'anl', 'ans', 'muf', 'mff', 'phk', 'phc', 
			'phq', 'xtc', 'tok', 'toc', 'toq', 'mlf', 'raq', 'rck', 'sac', 'sak', 'saq',	 'pms', 'nad', 'ndz', 'nds', 
			'wtf', 'sol', 'sob', 'fob', 'sfu');
	if ( in_array($string, $badwords ) ) {
		$string = 'win';
	}
	return strtoupper($string);
	return $string;
}

