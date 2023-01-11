<?php
	include "connector.php";
	session_start();

	$data = json_decode($_POST["data"], true);
	// print_r($data);

	foreach($data as $row){

		$query = "INSERT INTO prices (product_id, price, date) VALUES ('".$row['id']."','".$row['price']."', '".$row['date']."')";

		if (mysqli_query($link, $query)) {
			// echo "New record created successfully";
		} else {
			// echo "Error: " . $query . mysqli_error($link);
		}
	}

	echo 1;
?>