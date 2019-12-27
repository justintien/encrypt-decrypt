const crypto = require('crypto');

const defaultConfig = {  
    algorithm: 'des-ede3', // 3des-ecb  
    autoPad: true,
    key: '0123456789abcd0123456789', // 3des-ecb must be 24 length
    iv: null,
    strEncoding: 'utf8', // 明文編碼
    cipherEncoding: 'hex' // 密文編碼
}

function encrypt (str, config = null) {
    if (config == null) {
        config = defaultConfig
    }

    const { algorithm, autoPad, key, iv, strEncoding, cipherEncoding } = config
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    cipher.setAutoPadding(autoPad);

    let encrypted = cipher.update(str, strEncoding, cipherEncoding);
    encrypted += cipher.final(cipherEncoding);

    return encrypted;
}

function decrypt (str, config = null) {
    if (config == null) {
        config = defaultConfig
    }

    const { algorithm, autoPad, key, iv, strEncoding, cipherEncoding } = config

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    decipher.setAutoPadding(autoPad);

    let decrypted = decipher.update(str, cipherEncoding, strEncoding);
    decrypted += decipher.final(strEncoding);

    return decrypted;
}

module.exports = {
    encrypt, decrypt
}