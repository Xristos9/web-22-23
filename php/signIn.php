<?php
session_start();
include "connector.php";

$result = array();
$username = $_POST['username'];
$pass = $_POST['password'];

$query = mysqli_query($link, "SELECT * FROM users WHERE username='$username' AND password='$pass' ");
if (mysqli_num_rows($query) === 1) {
	$row = mysqli_fetch_assoc($query);
	array_push($result, array('username' => $row['username'], 'user_id' => $row['user_id'], 'isAdmin' => $row['isAdmin']));
	$_SESSION['isAdmin'] = $row['isAdmin'];
	$_SESSION['username'] = $row['username'];
	$_SESSION['user_id'] = $row['user_id'];
	if ($row['isAdmin']) {
		echo json_encode($result, true);
		exit();
	} else {
		echo json_encode($result, true);
		exit();
	}
} else {
	echo 2;
	exit();
}
