<?php
	include "connector.php";
	session_start();

	$query = mysqli_query($link, "SELECT stores.store_id, stores.name, stores.lat,stores.lon,discounts.price,products.product_name FROM stores
	INNER JOIN discounts ON stores.store_id = discounts.store_id
	INNER JOIN products ON products.product_id = discounts.product_id");
	$array = array();
	if (mysqli_num_rows($query) > 0) {
		while($row = $query->fetch_assoc()) {
			// echo $row['store_id'];
			array_push($array, array("id" => $row['store_id'], "store_name" => $row['name'],"lat" => $row['lat'],"lon" => $row['lon'],"price" => $row['price'],"product" => $row['product_name']));
		}
	}

	echo json_encode($array,true);


?>