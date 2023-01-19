<?php
include "connector.php";
session_start();

$firstDate = $_POST["firstDate"];
$lastDate = $_POST["lastDate"];

$discounts = array();
$query = mysqli_query($link, "SELECT `discount_id`,`date` FROM `discounts` WHERE `date`> '$firstDate' AND `date` < '$lastDate' ORDER BY `date` ASC");
if (mysqli_num_rows($query) > 0) {
  while ($row = mysqli_fetch_assoc($query)) {
    array_push($discounts, array('discount_id' => $row['discount_id'], 'date' => $row['date']));
  }
}
echo json_encode($discounts, true);
