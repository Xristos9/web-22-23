<?php
include "connector.php";
session_start();

$id = $_POST["id"];
$count = $_POST["count"];
$username = $_POST["username"];
$control = $_POST["control"];
$score = 0;

if ($control == 1) {
  $result = mysqli_query($link, "UPDATE `discounts` SET `likes`='$count'  WHERE `discount_id`='$id'");
  $result2 = mysqli_query($link, "SELECT `score` FROM `users` WHERE `username` = '$username'");
  while ($row = mysqli_fetch_assoc($result2)) {
    $score = $row['score'];
  };
  $score = $score + 5;
  $result3 = mysqli_query($link, "UPDATE `users` SET `score`= '$score' WHERE `username`= '$username'");
} else {
  echo $control;
  $result4 = mysqli_query($link, "UPDATE `discounts` SET `dislikes`='$count'  WHERE `discount_id`='$id'");
  $result5 = mysqli_query($link, "SELECT `score` FROM `users` WHERE `username` = '$username'");
  while ($row = mysqli_fetch_assoc($result5)) {
    $score = $row['score'];
  };
  if ($score != 0) {
    $score = $score - 1;
    $result6 = mysqli_query($link, "UPDATE `users` SET `score`= '$score' WHERE `username`= '$username'");
  }
}
