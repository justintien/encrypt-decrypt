# encrypt-decrypt

> 加密解密編碼學習 (go/java/nodejs)

- DES/ECB/PKCS5Padding
- DES/CBC/PKCS5Padding
- DESede/ECB/PKCS5Padding
- DESede/CBC/PKCS5Padding
- 微信小程序解密: AES/CBC/PKCS7Padding for nodejs only

```text
// 設定
testStr = "jiapan"
key = "01234567" // for des
key = "0123456789abcd0123456789" // for 3des
iv = null // for ebc
iv = "12345678" // for cbc

should got encrypt hex text:

DES/ECB/PKCS5Padding: 09a89287a8dc1b52
DES/CBC/PKCS5Padding: bcbeaf968bc9a44e
DESede/ECB/PKCS5Padding: 491bc5877a7aa428
DESede/CBC/PKCS5Padding: 0b6afce98a2be6de
```

