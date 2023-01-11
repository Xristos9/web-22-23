<?php
	include "connector.php";
	session_start();

  $category = $_POST['category'];

	$result = mysqli_query($link, "SELECT `subcategory_id`,`name` FROM `subcategories` WHERE `category_id` = '$category'");
	$products = array();
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
			array_push($products, array('subcategory_id'=>$row['subcategory_id'], 'name'=>$row['name']));
		}
		echo json_encode($products,true);
	}
	
?>