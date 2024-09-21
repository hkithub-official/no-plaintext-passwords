package com.hkithub.bcrypt;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Main {
    public static void main(String[] args) {
        String password = "p@ssword";
        String incorrectPassword = "incorrect";

        // Hash
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode(password);
        String incorrectHash = encoder.encode(incorrectPassword);

        // Verify
        boolean match = encoder.matches(password, hash);
        System.out.printf("verify result: %b\n", match);

        boolean match2 = encoder.matches(password, incorrectHash);
        System.out.printf("verify result: %b\n", match2);
    }

}