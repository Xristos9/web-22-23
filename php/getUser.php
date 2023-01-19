<?php
session_start();
include "connector.php";

$user_id = $_SESSION['user_id'];

$result = array();
$query = mysqli_query($link, "SELECT * FROM users WHERE user_id='$user_id'");
if (mysqli_num_rows($query) === 1) {
  $row = mysqli_fetch_assoc($query);
  array_push($result, array('username' => $row['username'], 'score' => $row['score'], 'overallScore' => $row['overallScore'], 'tokens' => $row['tokens'], 'overallTokens' => $row['overallTokens']));
}

echo json_encode($result, true);
