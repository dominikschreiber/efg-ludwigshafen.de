<?php
header("Content-type: text/plain");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (file_put_contents(getcwd() . "/telemetry.csv", "\n" . file_get_contents('php://input'), FILE_APPEND)) {
    http_response_code(200);
  } else {
    http_response_code(500);
  }
} else {
  http_response_code(401);
}
?>