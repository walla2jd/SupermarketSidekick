<?php

DEFINE ('DB_USER', 'root');
DEFINE ('DB_PSWD', 'Seniord14!');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'grocery');

$dbcon = myslqi_connect(DB_HOST, DB_USER, DB_PSWD, DB_NAME);

if (!$dbcon) {
    die('error');
    }

echo 'success'
?>