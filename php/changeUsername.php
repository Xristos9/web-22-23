<?php
include "connector.php";
session_start();

$id = $_SESSION['user_id'];


$new = $_POST['newUsername'];

$result2 = mysqli_query($link, "UPDATE users SET username='$new' WHERE user_id='$id'");
$_SESSION['username'] = $new;
echo 0;
