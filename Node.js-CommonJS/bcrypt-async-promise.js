const bcrypt = require('bcrypt');

async function main() {
    // Hash
    const hash = await bcrypt.hash('INPUT_PASSWORD', 10);
    console.log(hash);

    // Verify
    const result = await bcrypt.compare('INPUT_PASSWORD', hash);
    console.log(result);
}
main();
