package com.test;

import java.util.Scanner;

public class Main {
	public static void main(String[] args) throws Exception {
		Scanner input = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = input.nextLine();
		try {
			// 加密
			System.out.println("加密 - ");
			String encrypt1 = CryptoUtil.encrypt(str, "DES/ECB/PKCS5Padding", "01234567", null);
			String encrypt2 = CryptoUtil.encrypt(str, "DES/CBC/PKCS5Padding", "01234567", "12345678");
			String encrypt3 = CryptoUtil.encrypt(str, "DESede/ECB/PKCS5Padding", "0123456789abcd0123456789", null);
			String encrypt4 = CryptoUtil.encrypt(str, "DESede/CBC/PKCS5Padding", "0123456789abcd0123456789", "12345678");
        	System.out.printf("DES/ECB/PKCS5Padding: %s\n", encrypt1);
			System.out.printf("DES/CBC/PKCS5Padding: %s\n", encrypt2);
			System.out.printf("DESede/ECB/PKCS5Padding: %s\n", encrypt3);
			System.out.printf("DESede/CBC/PKCS5Padding: %s\n", encrypt4);


			// 解密
			System.out.println("解密 - ");
        	System.out.printf("DES/ECB/PKCS5Padding: %s\n", CryptoUtil.decrypt(encrypt1, "DES/ECB/PKCS5Padding", "01234567", null));
			System.out.printf("DES/CBC/PKCS5Padding: %s\n", CryptoUtil.decrypt(encrypt2, "DES/CBC/PKCS5Padding", "01234567", "12345678"));
			System.out.printf("DESede/ECB/PKCS5Padding: %s\n", CryptoUtil.decrypt(encrypt3, "DESede/ECB/PKCS5Padding", "0123456789abcd0123456789", null));
			System.out.printf("DESede/CBC/PKCS5Padding: %s\n", CryptoUtil.decrypt(encrypt4, "DESede/CBC/PKCS5Padding", "0123456789abcd0123456789", "12345678"));
  		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
