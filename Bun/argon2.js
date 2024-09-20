// Configuration Reference:
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id

// Hash
// For synchronous hashing, use Bun.password.hashSync
const hash = await Bun.password.hash("INPUT_PASSWORD", {
  algorithm: "argon2id", // Optional. Default is "argon2id"
  memoryCost: 19456, // Optional, 19 MiB. Default is 65536 (64MiB)
  timeCost: 2, // Optional. Default is 2
  parallelism: 1, // Optional. Default is 1
});
console.log(hash);

// Verify
// For synchronous verification, use Bun.password.verifySync
const result = await Bun.password.verify("INPUT_PASSWORD", hash);
console.log(result);

const result2 = await Bun.password.verify("BAD_PASSWORD", hash);
console.log(result2);
