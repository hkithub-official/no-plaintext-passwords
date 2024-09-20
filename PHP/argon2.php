<?php
// Configuration Reference:
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id

// Hash
// Argon2id available since PHP 7.3.0
$hash = password_hash("INPUT_PASSWORD", PASSWORD_ARGON2ID, [
  'memory_cost' => 19456, // m=19456. Optional. Default is PASSWORD_ARGON2_DEFAULT_MEMORY_COST
  'time_cost' => 2, // t=2. Optional. Default is PASSWORD_ARGON2_DEFAULT_TIME_COST
  'threads' => 1, // p=1. Optional. Default is PASSWORD_ARGON2_DEFAULT_THREADS
]);
echo $hash;
echo "\n";

// Verify
echo password_verify("INPUT_PASSWORD", $hash) ? 'true' : 'false';
echo "\n";
echo password_verify("BAD_PASSWORD", $hash) ? 'true' : 'false';
echo "\n";
