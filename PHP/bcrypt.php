<?php
// Hash
$hash = password_hash("INPUT_PASSWORD", PASSWORD_BCRYPT, [
  'cost' => 12, // Optional. Default is 10 for php <= 8.3.x  
]);
echo $hash;
echo "\n";

// Verify
echo password_verify("INPUT_PASSWORD", $hash,) ? 'true' : 'false';
echo "\n";
echo password_verify("BAD_PASSWORD", $hash) ? 'true' : 'false';
echo "\n";
