package main

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	pw := []byte("p@ssword")
	cost := 12 // default is 10

	// Hash
	hash, err := bcrypt.GenerateFromPassword(pw, cost)
	if err != nil {
		log.Fatal(err)
	}

	// Verify
	err = bcrypt.CompareHashAndPassword(hash, pw)
	fmt.Printf("verify result: %t\n", err == nil)

	err = bcrypt.CompareHashAndPassword(hash, []byte("incorrect"))
	fmt.Printf("verify result: %t\n", err == nil)
}
