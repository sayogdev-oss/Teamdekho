<?php

$API_KEY_SECRET = "TeamDekhosfu_default_secret";
$TeamDekho_URL = "https://sfu.teamdekho.com/api/v1/meetings";
//$TeamDekho_URL = "http://localhost:3010/api/v1/meetings";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $TeamDekho_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, true);

$headers = [
    'authorization:' . $API_KEY_SECRET,
    'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo "Status code: $httpcode \n";

if ($response) {
    echo json_encode(json_decode($response), JSON_PRETTY_PRINT);
} else {
    echo "Failed to retrieve data.\n";
}
