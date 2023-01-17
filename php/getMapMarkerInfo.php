<?php
include "connector.php";
session_start();

$array = array();
$result = array();
$unique_id = array();
$discounts = array();

$query = mysqli_query($link, "SELECT stores.store_id, stores.name, stores.lat,stores.lon,discounts.discount_id FROM stores INNER JOIN discounts ON stores.store_id = discounts.store_id ORDER BY stores.store_id ASC");
if (mysqli_num_rows($query) > 0) {
  while ($row = $query->fetch_assoc()) {
    array_push($array, array("id" => $row['store_id'], "store_name" => $row['name'], 'lat' => $row['lat'], 'lon' => $row['lon'], 'discount_id' => $row['discount_id']));
    array_push($unique_id, $row['store_id']);
  }
}

$unique_id = array_unique($unique_id);

foreach ($unique_id as $key => $value) {
  $discounts = [];
  for ($i = 0; $i < count($array); $i++) {
    if ($value == $array[$i]['id']) {
      array_push($discounts, $array[$i]['discount_id']);
      $name = $array[$i]['store_name'];
      $lat = $array[$i]['lat'];
      $lon = $array[$i]['lon'];
    }
  }
  array_push($result, array("id" => $value, "store_name" => $name, 'lat' => $lat, 'lon' => $lon, 'discount_id' => $discounts));
}

echo json_encode($result, true);
