<?php
// Hash
$hash = password_hash("INPUT_PASSWORD", PASSWORD_ARGON2ID);
echo $hash;

echo "\n";

// Verify
echo password_verify("INPUT_PASSWORD", $hash);
