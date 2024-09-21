package com.hkithub.argon2id;

import java.security.SecureRandom;
import java.util.Arrays;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;

public class Main {
    public static void main(String[] args) {
        String password = "p@ssword";
        String incorrectPassword = "incorrect";
        int saltLength = 32;
        int iterations = 2;
        int memLimit = 66536;
        int hashLength = 32;
        int parallelism = 1;

        byte[] salt = generateSalt(saltLength);
        Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withVersion(Argon2Parameters.ARGON2_VERSION_13)
                .withIterations(iterations)
                .withMemoryAsKB(memLimit)
                .withParallelism(parallelism)
                .withSalt(salt);
        Argon2BytesGenerator generator = new Argon2BytesGenerator();
        generator.init(builder.build());

        // Hash
        byte[] hash = generateHash(generator, password, hashLength);
        byte[] hash2 = generateHash(generator, password, hashLength);
        byte[] incorrectPasswordHash = generateHash(generator, incorrectPassword, hashLength);

        // Verify
        System.out.printf("verify result: %b\n", Arrays.equals(hash, hash2));
        System.out.printf("verify result: %b\n", Arrays.equals(hash, incorrectPasswordHash));
    }

    private static byte[] generateHash(Argon2BytesGenerator generator, String password, int hashLength) {
        byte[] hash = new byte[hashLength];
        generator.generateBytes(password.getBytes(), hash, 0, hash.length);
        return hash;
    }

    private static byte[] generateSalt(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[length];
        secureRandom.nextBytes(salt);

        return salt;
    }
}