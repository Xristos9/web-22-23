<?php
session_start();
include "connector.php";


$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$result = mysqli_query($link, "SELECT * FROM users WHERE username='$username'");
$result2 = mysqli_query($link, "SELECT * FROM users WHERE email='$email'");

if (mysqli_num_rows($result) > 0) {
	echo 0;
	exit();
} elseif (mysqli_num_rows($result2) > 0) {
	echo 1;
	exit();
} else {
	$result3 = mysqli_query($link, "INSERT INTO users(username, password, email) VALUES('$username', '$password', '$email')");

	if ($result3) {
		echo 2;
		exit();
	} else {
		echo 3;
		exit();
	}
}
