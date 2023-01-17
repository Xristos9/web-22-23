<?php
include "connector.php";
session_start();

$input = $_POST['input'];
// $input = 'ee0022e7b1b34eb2b834ea334cda52e7';
// $input = '5';

$products = array();
if (is_array($input)) {
  for ($i=0; $i<count($input); $i++){
    $result = mysqli_query($link, "SELECT stores.name, stores.lat,stores.lon,products.product_name, products.product_id, products.inventory,discounts.discount_id,discounts.store_id,discounts.user_id,discounts.price,discounts.date, discounts.likes, discounts.dislikes, users.username, users.score, users.overallScore FROM products INNER JOIN discounts ON products.product_id = discounts.product_id INNER JOIN stores ON stores.store_id = discounts.store_id INNER JOIN users ON users.user_id = discounts.user_id WHERE discounts.discount_id = '$input[$i]' ORDER By stores.name ASC
    ");
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($products, array('store_id' => $row['store_id'], 'store_name' => $row['name'], 'lat' => $row['lat'], 'lon' => $row['lon'], 'product_name' => $row['product_name'], 'product_id' => $row['product_id'], 'discount_id' => $row['discount_id'], 'user_id' => $row['user_id'], 'price' => $row['price'], 'date' => $row['date'], 'likes' => $row['likes'], 'dislikes' => $row['dislikes'], 'inventory' => $row['inventory'], 'username' => $row['username'], 'score' => $row['score'], 'overallScore' => $row['overallScore']));
      }
    }
  }
} else {
  $result2 = mysqli_query($link, "SELECT stores.name, stores.lat,stores.lon,products.product_name, products.product_id, discounts.discount_id,discounts.store_id,discounts.user_id,discounts.price,discounts.date FROM products INNER JOIN discounts ON products.product_id = discounts.product_id INNER JOIN stores ON stores.store_id = discounts.store_id WHERE products.category_id = '$input' ORDER By stores.name ASC");
  if (mysqli_num_rows($result2) > 0) {
    while ($row = mysqli_fetch_assoc($result2)) {
      array_push($products, array('store_id' => $row['store_id'], 'store_name' => $row['name'], 'lat' => $row['lat'], 'lon' => $row['lon'], 'product_name' => $row['product_name'], 'product_id' => $row['product_id'], 'discount_id' => $row['discount_id'], 'user_id' => $row['user_id'], 'price' => $row['price'], 'date' => $row['date']));
    }
  }
}
echo json_encode($products, true);
