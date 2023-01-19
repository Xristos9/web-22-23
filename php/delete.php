<?php

session_start();
include "connector.php";

if (isset($_POST['boolval'])) {

	$query = "DELETE FROM `stores`";
	// $query2 = "DELETE FROM `categories`";
	// $query3 = "DELETE FROM `discounts`";
	// $query4 = "DELETE FROM `prices`";
	// $query5 = "DELETE FROM `products`";
	// $query6 = "DELETE FROM `subcategories`";

	if ($link->query($query) === TRUE) {
		echo 1;
	} else {
		echo 3;
		echo "Error deleting record: " . $link->error;
	}
} else {
	echo 2;
}
