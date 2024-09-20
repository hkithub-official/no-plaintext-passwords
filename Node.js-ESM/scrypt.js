import { scryptSync, randomBytes } from "node:crypto";

const SALT_LENGTH = 32;
const KEY_LENGTH = 64;
const ENCODING = "base64url";

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#scrypt
function hashingSync(password) {
  const salt = randomBytes(SALT_LENGTH).toString(ENCODING);
  const options = {
    N: 32768, // N=2^15
    r: 8, // r=8
    p: 3, // p=3
    maxmem: KEY_LENGTH * 32768 * 8 * 3, // KEY_LENGTH * N * r * p
  };
  const hash = scryptSync(password, salt, KEY_LENGTH, options);
  const config = `N=${options.N},r=${options.r},p=${options.p}`;
  return `$scrypt$${config}$${salt}$${hash.toString(ENCODING)}`;
}

function verifySync(password, storedHash) {
  const [, , config, salt, firstHash] = storedHash.split("$");
  const { N, r, p } = config.split(",").reduce((acc, item) => {
    const [key, value] = item.split("=");
    acc[key] = parseInt(value, 10);
    return acc;
  }, {});
  const secondHash = scryptSync(password, salt, KEY_LENGTH, {
    N,
    r,
    p,
    maxmem: KEY_LENGTH * N * r * p,
  }).toString(ENCODING);
  return secondHash === firstHash;
}

const hash = hashingSync("INPUT_PASSWORD");
console.log(hash);

console.log(verifySync("INPUT_PASSWORD", hash)); // true
console.log(verifySync("BAD_PASSWORD", hash)); // false
