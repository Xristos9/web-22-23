<?php
include "connector.php";
session_start();

// $confirm = $_POST["confirm"];

$result = mysqli_query($link, "SELECT * FROM `categories`");
$categories = array();
if (mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($categories, array('category_id' => $row['category_id'], 'name' => $row['name']));
	}
	echo json_encode($categories, true);
}
