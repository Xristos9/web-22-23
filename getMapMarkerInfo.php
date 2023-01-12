<?php
include "connector.php";
session_start();

$i = 0;
$array = array();

$query = mysqli_query($link, "SELECT DISTINCT stores.store_id, stores.name, stores.lat,stores.lon,discounts.price FROM stores INNER JOIN discounts ON stores.store_id = discounts.store_id ORDER BY stores.`store_id` ASC");
if (mysqli_num_rows($query) > 0) {
	while ($row = $query->fetch_assoc()) {
		array_push($array, array("id" => $row['store_id'], "store_name" => $row['name'], 'lat' => $row['lat'], 'lon' => $row['lon']));
	}
}
echo json_encode($array, true);
