<?php
include "connector.php";
session_start();

$categories = json_decode($_POST["categories"], true);
$subcategories = json_decode($_POST["subcategories"], true);
$products = json_decode($_POST["products"], true);
// print_r($categories);
// print_r($subcategories);
// print_r($products);

foreach ($categories as $category) {

	$query = "INSERT INTO categories (category_id, name) VALUES ('" . $category['id'] . "', '" . $category['name'] . "')";

	if (mysqli_query($link, $query)) {
		// echo "New record created successfully";
	} else {
		// echo "Error: " . $query . mysqli_error($link);
	}
}

foreach ($subcategories as $subcategory) {

	$query2 = "INSERT INTO subcategories (subcategory_id, category_id, name) VALUES ('" . $subcategory['id'] . "', '" . $subcategory['categoryId'] . "', '" . $subcategory['name'] . "')";

	if (mysqli_query($link, $query2)) {
		// echo "New record created successfully";
	} else {
		// echo "Error: " . $query2 . mysqli_error($link);
	}
}

foreach ($products as $product) {

	$query3 = "INSERT INTO products (product_id, name, category_id, subcategory_id) VALUES ('" . $product['id'] . "', '" . $product['name'] . "', '" . $product['category'] . "', '" . $product['subcategory'] . "')";

	if (mysqli_query($link, $query3)) {
		// echo "New record created successfully";
	} else {
		// echo "Error: " . $query3 . mysqli_error($link);
	}
}
echo 1;
