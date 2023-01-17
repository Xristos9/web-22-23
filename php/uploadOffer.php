<?php

include "connector.php";
session_start();

$store = $_POST['store'];
$price = $_POST['price'];
$product = $_POST['product'];
$points = $_POST['points'];
$user_id = 6;
$score = 0;

$query = mysqli_query($link, "SELECT `score` FROM `users` WHERE `user_id`= '$user_id'");
while ($row = mysqli_fetch_assoc($query)) {
  $score = $row['score'];
};
$score = $score + $points;
$query2 = mysqli_query($link, "UPDATE `users` SET `score`= '$score' WHERE `user_id`= '$user_id'");

$query3 = "INSERT INTO `discounts`(`product_id`, `store_id`, `user_id`, `price`) VALUES ('$product', '$store', '$user_id', '$price')";
if (mysqli_query($link, $query3)) {
  // echo "New record created successfully";
  echo 1;
} else {
  echo "Error: " . $query . mysqli_error($link);
}

