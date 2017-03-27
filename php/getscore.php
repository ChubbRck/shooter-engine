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

$query = "SELECT initials, score FROM score WHERE score > 0 ORDER BY score DESC LIMIT 10";
$myArray = array();
if ($result = $conn->query( $query )) {

	while($row = $result->fetch_array(MYSQL_ASSOC)) {
		$myArray[] = $row;
	}
	echo json_encode($myArray);
}

$result->close();
$conn->close();