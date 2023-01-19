<?php
include "connector.php";
session_start();

$id = $_SESSION['user_id'];

$old = $_POST['oldPassword'];
$new = $_POST['newPassword'];

$result = mysqli_query($link, "SELECT password FROM users WHERE user_id='$id' AND password='$old'");

if (mysqli_num_rows($result) === 1) {
	$result2 = mysqli_query($link, "UPDATE users SET password='$new' WHERE user_id='$id'");
	echo 0;
} else {
	echo 1;
	exit();
}
