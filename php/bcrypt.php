<?php
// Hash
$hash = password_hash("INPUT_PASSWORD", PASSWORD_BCRYPT);
echo $hash;

echo "\n";

// Verify
echo password_verify("INPUT_PASSWORD", $hash);



