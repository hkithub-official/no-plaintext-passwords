import bcrypt from "bcrypt";

// Hash
bcrypt.hash('INPUT_PASSWORD', 10, (err, hash) => {
    console.log(hash)

    // Verify
    bcrypt.compare('INPUT_PASSWORD', hash, (err, result) => {
        console.log(result)
    });
});

