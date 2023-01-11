<?php
	include "connector.php";
	session_start();

	$result = mysqli_query($link, "SELECT `store_id`,`name`,`lat`,`lon` FROM `stores` ORDER BY `name` ASC");
	$products = array();
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
			array_push($products, array('store_id'=>$row['store_id'], 'store_name'=>$row['name'], 'lat'=>$row['lat'], 'lon'=>$row['lon']));
		}
		echo json_encode($products,true);
	}else{
		// echo 0;
	}
?>