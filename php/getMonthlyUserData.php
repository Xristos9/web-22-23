<?php
include "connector.php";
session_start();

$result = array();
$query = mysqli_query($link, "SELECT * FROM `users` WHERE 1 ORDER BY `user_id` ASC");
if (mysqli_num_rows($query) > 0) {
  while ($row = $query->fetch_assoc()) {
    array_push($result, array('user_id' => $row['user_id'], 'username' => $row['username'], 'score' => $row['score'], 'overallScore' => $row['overallScore'], 'tokens' => $row['tokens'], 'overallTokens' => $row['overallTokens']));
  }
}

echo json_encode($result, true);
