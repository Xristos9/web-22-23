<?php
session_start();
include "connector.php";

$user_id = $_SESSION['user_id'];

$result = array();
$query = mysqli_query($link, "SELECT * FROM discounts INNER JOIN stores ON stores.store_id = discounts.store_id INNER JOIN products ON products.product_id = discounts.product_id WHERE discounts.user_id = '$user_id'");
if (mysqli_num_rows($query) > 0) {
  while ($row = mysqli_fetch_assoc($query)) {
    array_push($result, array('name' => $row['name'], 'price' => $row['price'], 'product_name' => $row['product_name'], 'likes' => $row['likes'], 'dislikes' => $row['dislikes'], 'date' => $row['date'], 'inventory' => $row['inventory']));
  }
}

echo json_encode($result, true);
