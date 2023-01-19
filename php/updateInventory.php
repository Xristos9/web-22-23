<?php
include "connector.php";
session_start();

$id = $_POST["id"];

$result = mysqli_query($link, "UPDATE `products` SET `inventory`='Yes'  WHERE `product_id`='$id'");
