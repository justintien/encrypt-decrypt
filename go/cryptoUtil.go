package main

import (
	"bytes"
	"crypto/cipher"
	"crypto/des"
	"encoding/hex"
	"fmt"
)

func DesEcbEncrypt(str, key string) string {
	strByte := []byte(str)
	keyByte := []byte(key)
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	bs := block.BlockSize()
	//对明文数据进行补码
	strByte = PKCS5Padding(strByte, bs)
	if len(strByte)%bs != 0 {
		panic("Need a multiple of the blocksize")
	}
	out := make([]byte, len(strByte))
	dst := out
	for len(strByte) > 0 {
		//对明文按照blocksize进行分块加密
		//必要时可以使用go关键字进行并行加密
		block.Encrypt(dst, strByte[:bs])
		strByte = strByte[bs:]
		dst = dst[bs:]
	}
	return fmt.Sprintf("%x", out)
}

func DesEcbDecrypt(str, key string) string {
	strByte, err := hex.DecodeString(str)
	if err != nil {
		panic(err)
	}
	keyByte := []byte(key)
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	bs := block.BlockSize()
	if len(strByte)%bs != 0 {
		panic("crypto/cipher: input not full blocks")
	}
	out := make([]byte, len(strByte))
	dst := out
	for len(strByte) > 0 {
		block.Decrypt(dst, strByte[:bs])
		strByte = strByte[bs:]
		dst = dst[bs:]
	}
	out = PKCS5UnPadding(out)
	return string(out)
}

func DesCbcEncrypt(str, key, iv string) string {
	strByte := []byte(str)
	keyByte := []byte(key)
	ivByte := []byte(iv)
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	strByte = PKCS5Padding(strByte, block.BlockSize())

	mode := cipher.NewCBCEncrypter(block, ivByte)
	out := make([]byte, len(strByte))
	mode.CryptBlocks(out, strByte)
	return fmt.Sprintf("%x", out)
}

func DesCbcDecrypt(str, key, iv string) string {
	keyByte := []byte(key)
	ivByte := []byte(iv)
	strByte, err := hex.DecodeString(str)
	if err != nil {
		panic(err)
	}
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	mode := cipher.NewCBCDecrypter(block, ivByte)
	plaintext := make([]byte, len(strByte))
	mode.CryptBlocks(plaintext, strByte)
	plaintext = PKCS5UnPadding(plaintext)
	return string(plaintext)
}

func TripleDesEcbEncrypt(str, key string) string {
	strByte := []byte(str)
	keyByte := []byte(key)

	block, err := des.NewTripleDESCipher(keyByte)
	if err != nil {
		panic(err)
	}

	bs := block.BlockSize()

	strByte = PKCS5Padding(strByte, block.BlockSize())
	if len(strByte)%bs != 0 {
		panic("Need a multiple of the blocksize")
	}
	out := make([]byte, len(strByte))
	dst := out
	for len(strByte) > 0 {
		block.Encrypt(dst, strByte[:bs])
		strByte = strByte[bs:]
		dst = dst[bs:]
	}
	return fmt.Sprintf("%x", out)
}

func TripleDesCbcEncrypt(str, key, iv string) string {
	strByte := []byte(str)
	keyByte := []byte(key)
	ivByte := []byte(iv)

	block, err := des.NewTripleDESCipher(keyByte)
	if err != nil {
		panic(err)
	}
	strByte = PKCS5Padding(strByte, block.BlockSize())

	mode := cipher.NewCBCEncrypter(block, ivByte)
	out := make([]byte, len(strByte))
	mode.CryptBlocks(out, strByte)
	return fmt.Sprintf("%x", out)
}

// func TripleDesDecrypt(encrypted string, key, iv []byte, unPaddingFunc func([]byte) []byte) (string, error) {
// 	e, err := hex.DecodeString(strings.ToLower(encrypted))
// 	if err != nil {
// 		return "", err
// 	}
// 	block, err := des.NewTripleDESCipher(key)
// 	if err != nil {
// 		return "", err
// 	}
// 	blockMode := cipher.NewCBCDecrypter(block, iv)
// 	origData := make([]byte, len(e))
// 	blockMode.CryptBlocks(origData, e)
// 	origData = unPaddingFunc(origData)
// 	if string(origData) == "unpadding error" {
// 		return "", errors.New("unpadding error")
// 	}
// 	return string(origData), nil
// }

//明文补码算法
func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
	padding := blockSize - len(ciphertext)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(ciphertext, padtext...)
}

//明文减码算法
func PKCS5UnPadding(origData []byte) []byte {
	length := len(origData)
	unpadding := int(origData[length-1])
	return origData[:(length - unpadding)]
}
