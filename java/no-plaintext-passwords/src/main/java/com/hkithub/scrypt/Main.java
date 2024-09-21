package com.hkithub.scrypt;

import java.security.SecureRandom;
import java.util.Arrays;

import org.bouncycastle.crypto.generators.SCrypt;

public class Main {
    public static void main(String[] args) {
        String password = "p@ssword";
        String incorrectPassword = "incorrect";
        int saltLength = 32;
        int n = 32768;
        int r = 8;
        int p = 1;
        int dkLen = 32;

        byte[] salt = generateSalt(saltLength);

        // Hash
        byte[] hash = SCrypt.generate(password.getBytes(), salt, n, r, p, dkLen);
        byte[] hash2 = SCrypt.generate(password.getBytes(), salt, n, r, p, dkLen);
        byte[] incorrectHash = SCrypt.generate(incorrectPassword.getBytes(), salt, n, r, p, dkLen);
        
        // Verify
        System.out.printf("verify result: %b\n", Arrays.equals(hash, hash2));
        System.out.printf("verify result: %b\n", Arrays.equals(hash, incorrectHash));
    }

    private static byte[] generateSalt(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[length];
        secureRandom.nextBytes(salt);
    
        return salt;
    }
}
