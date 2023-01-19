<?php
include "connector.php";
session_start();

$data = json_decode($_POST["data"], true);

foreach ($data as $index) {
  echo $index;
  $query = "UPDATE users SET score = " . $index['score'] . ", overallScore = " . $index['overallScore'] . ", tokens = " . $index['tokens'] . ", overallTokens = " . $index['overallTokens'] . " WHERE user_id = " . $index['user_id'] . "";


  if (mysqli_query($link, $query)) {
    echo "Updated successfully";
  } else {
    echo "Error: " . $query . mysqli_error($link);
  }
}
