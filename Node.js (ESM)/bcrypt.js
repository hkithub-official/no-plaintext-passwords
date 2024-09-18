const bcrypt = require('bcrypt');

// Sync
const hash = bcrypt.hashSync('INPUT_PASSWORD', 10);
console.log(hash);

// Async (callback)
bcrypt.hash('INPUT_PASSWORD', 10, (err, hash) => {
    console.log(hash)
});

// Async (promise)
async function main() {
    const hash = await bcrypt.hash('INPUT_PASSWORD', 10);
    console.log(hash);
}
main();
