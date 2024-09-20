package main

import (
	"crypto/rand"
	"crypto/subtle"
	"fmt"
	"log"

	"golang.org/x/crypto/scrypt"
)

func main() {
	pw := []byte("p@ssword")
	saltLen := 32
	cost := 32768
	r := 8
	p := 1
	keyLen := 32

	salt, err := genRandBytes(saltLen)
	if err != nil {
		log.Fatal(err)
	}

	// Hash
	hash, err := scrypt.Key(pw, salt, cost, r, p, keyLen)
	if err != nil {
		log.Fatal(err)
	}

	// Verify
	hash2, _ := scrypt.Key(pw, salt, cost, r, p, keyLen)
	match := subtle.ConstantTimeCompare(hash, hash2) == 1
	fmt.Printf("verify result: %t\n", match)

	hash3, _ := scrypt.Key([]byte("incorrect"), salt, cost, r, p, keyLen)
	match = subtle.ConstantTimeCompare(hash, hash3) == 1
	fmt.Printf("verify result: %t\n", match)
}

func genRandBytes(len int) ([]byte, error) {
	b := make([]byte, len)
	if _, err := rand.Read(b); err != nil {
		return nil, err
	}
	return b, nil
}
