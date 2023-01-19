<?php
include "connector.php";
session_start();


$product_id = $_POST['product'];
$date = $_POST['date'];
$user_id = $_SESSION['user_id'];
// echo $user_id;
// $product_id = 840;

$result = array();
$array = array();
$query = mysqli_query($link, "SELECT * FROM `prices` WHERE `product_id` = '$product_id' AND `date` <= '$date' ORDER BY `date` ASC");
if (mysqli_num_rows($query) > 0) {
  while ($row = $query->fetch_assoc()) {
    array_push($array, array('price' => $row['price'], 'date' => $row['date']));
  }
}

$array2 = array();
$query = mysqli_query($link, "SELECT * FROM `discounts` WHERE `user_id` = '$user_id'");
if (mysqli_num_rows($query) > 0) {
  while ($row = $query->fetch_assoc()) {
    array_push($array2, array('product_id' => $row['product_id'], 'store_id' => $row['store_id'], 'price' => $row['price']));
  }
}

array_push($result, $array, $array2);
echo json_encode($result, true);
