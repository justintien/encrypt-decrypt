package com.test;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptoUtil {
    private static String encodeHexString(byte[] hashInBytes) {

        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private static byte[] decodeHexString(String str) throws Exception {
        byte[] val = new byte[str.length() / 2];
        for (int i = 0; i < val.length; i++) {
            int index = i * 2;
            int j = Integer.parseInt(str.substring(index, index + 2), 16);
            val[i] = (byte) j;
        }
        return val;
    }

    public static String encrypt(String str, String algorithmPattern, String key, String iv) throws Exception {
        String[] alg = algorithmPattern.split("/");
        SecretKey secretKey = new SecretKeySpec(key.getBytes(), alg[0]);
        Cipher cipher = Cipher.getInstance(algorithmPattern);

        if ("CBC".equals(alg[1].toUpperCase())) {
            cipher.init(
                Cipher.ENCRYPT_MODE,
                secretKey,
                new IvParameterSpec(iv.getBytes())
            );
        } else {
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        }
        byte[] encryptedData = cipher.doFinal(str.getBytes());
        return encodeHexString(encryptedData);
    }

    public static String decrypt(String str, String algorithmPattern, String key, String iv) throws Exception {
        String[] alg = algorithmPattern.split("/");
        SecretKey secretKey = new SecretKeySpec(key.getBytes(), alg[0]);
        Cipher cipher = Cipher.getInstance(algorithmPattern);

        if ("CBC".equals(alg[1].toUpperCase())) {
            cipher.init(
                Cipher.DECRYPT_MODE,
                secretKey,
                new IvParameterSpec(iv.getBytes())
            );
        } else {
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
        }
        byte[] decryptedData = cipher.doFinal(decodeHexString(str));
        return new String(decryptedData, "UTF-8");
    }
}
