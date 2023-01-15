<?php

include "connector.php";
session_start();

$store = $_POST['store'];
$price = $_POST['price'];
$product = $_POST['product'];
$user_id = 6;

$query = "INSERT INTO `discounts`(`product_id`, `store_id`, `user_id`, `price`) VALUES ('$product', '$store', '$user_id', '$price')";
if (mysqli_query($link, $query)) {
  // echo "New record created successfully";
  echo 1;
} else {
  echo "Error: " . $query . mysqli_error($link);
}

