// Configuration Reference:
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt

// Hash
// For synchronous hashing, use Bun.password.hashSync
const hash = await Bun.password.hash("INPUT_PASSWORD", {
  algorithm: "bcrypt",
  cost: 12, // Optional. Default is 10.
});
console.log(hash);

// Verify
// For synchronous verification, use Bun.password.verifySync
const result = await Bun.password.verify("INPUT_PASSWORD", hash);
console.log(result);

const result2 = await Bun.password.verify("BAD_PASSWORD", hash);
console.log(result2);
