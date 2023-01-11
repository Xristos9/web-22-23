<?php
	include "connector.php";
	session_start();

	$subcategory = $_GET['subcategory'];
	// $subcategory = 'b3992eb422c2495ca02dd19de9d16ad1';
 	$products = array();
	if ($subcategory == 1){
		$result = mysqli_query($link, "SELECT `product_id`, `product_name` FROM `products`");
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_assoc($result)) {
				array_push($products, array('product_id'=>$row['product_id'], 'product_name'=>$row['product_name']));
			}
		}
	} else {
		$result2 = mysqli_query($link, "SELECT `product_id`, `product_name` FROM `products` WHERE `subcategory_id` = '$subcategory'");
		if (mysqli_num_rows($result2) > 0) {
			while($row = mysqli_fetch_assoc($result2)) {
				array_push($products, array('product_id'=>$row['product_id'], 'product_name'=>$row['product_name']));
			}
		}
	}
	echo json_encode($products,true);

?>