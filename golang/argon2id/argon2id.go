package main

import (
	"crypto/rand"
	"crypto/subtle"
	"fmt"
	"log"

	"golang.org/x/crypto/argon2"
)

func main() {
	pw := []byte("p@ssword")
	saltLen := 16
	var time uint32 = 3
	var memory uint32 = 19 * 1024
	var threads uint8 = 2
	var keyLen uint32 = 32

	salt, err := genRandBytes(saltLen)
	if err != nil {
		log.Fatal(err)
	}

	// Hash
	hash := argon2.IDKey([]byte(pw), salt, time, memory, threads, keyLen)

	// Verify
	hash2 := argon2.IDKey([]byte(pw), salt, time, memory, threads, keyLen)
	match := subtle.ConstantTimeCompare(hash, hash2) == 1
	fmt.Printf("verify result: %t\n", match)

	hash3 := argon2.IDKey([]byte("incorrect"), salt, time, memory, threads, keyLen)
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
