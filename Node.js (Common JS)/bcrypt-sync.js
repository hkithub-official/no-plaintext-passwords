const bcryptSync = require('bcrypt');

// Hash
const hash = bcryptSync.hashSync('INPUT_PASSWORD', 10);
console.log(hash);

// Verify
const result = bcryptSync.compareSync('INPUT_PASSWORD', hash);
console.log(result);
