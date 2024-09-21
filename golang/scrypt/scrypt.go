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
	incorrPw := []byte("incorrect")

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
	var hash, hash2, incorrHash []byte
	if hash, err = scrypt.Key(pw, salt, cost, r, p, keyLen); err != nil {
		log.Fatal(err)
	}
	if hash2, err = scrypt.Key(pw, salt, cost, r, p, keyLen); err != nil {
		log.Fatal(err)
	}
	if incorrHash, err = scrypt.Key(incorrPw, salt, cost, r, p, keyLen); err != nil {
		log.Fatal(err)
	}

	// Verify
	match := subtle.ConstantTimeCompare(hash, hash2) == 1
	fmt.Printf("verify result: %t\n", match)

	match = subtle.ConstantTimeCompare(hash, incorrHash) == 1
	fmt.Printf("verify result: %t\n", match)
}

func genRandBytes(len int) ([]byte, error) {
	b := make([]byte, len)
	if _, err := rand.Read(b); err != nil {
		return nil, err
	}
	return b, nil
}
