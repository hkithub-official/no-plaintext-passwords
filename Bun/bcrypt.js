// Hash
const hash = await Bun.password.hash("INPUT_PASSWORD");
console.log(hash);

// Verify
const result = await Bun.password.verify("INPUT_PASSWORD", hash);
console.log(result);
