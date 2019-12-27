const assert = require('assert');  
const crypto = require('./cryptoUtil.js');

const testStr = "jiapan"

function testDesEcb(str) {
    const config = {  
        algorithm: 'des-ecb',
        autoPad: true,
        key: '01234567',
        iv: null,
        strEncoding: 'utf8',
        cipherEncoding: 'hex'
    }
    
    
    const encryptStr = crypto.encrypt(str, config)
    const decryptStr = crypto.decrypt(encryptStr, config)
    assert.equal(encryptStr, '09a89287a8dc1b52', `${config.algorithm} fail`);
    assert.equal(str, decryptStr, `${config.algorithm} fail`);
}

function testDesCbc(str) {
    const config = {  
        algorithm: 'des-cbc',
        autoPad: true,
        key: '01234567',
        iv: '12345678',
        strEncoding: 'utf8',
        cipherEncoding: 'hex'
    }
    
    
    const encryptStr = crypto.encrypt(str, config)
    const decryptStr = crypto.decrypt(encryptStr, config)
    assert.equal(encryptStr, 'bcbeaf968bc9a44e', `${config.algorithm} fail`);
    assert.equal(str, decryptStr, `${config.algorithm} fail`);
}

function test3DesEcb(str) {
    const config = {  
        algorithm: 'des-ede3',
        autoPad: true,
        key: '0123456789abcd0123456789',
        iv: null,
        strEncoding: 'utf8',
        cipherEncoding: 'hex'
    }
    
    
    const encryptStr = crypto.encrypt(str, config)
    const decryptStr = crypto.decrypt(encryptStr, config)
    assert.equal(encryptStr, '491bc5877a7aa428', `${config.algorithm} fail`);
    assert.equal(str, decryptStr, `${config.algorithm} fail`);
}

function test3DesCbc(str) {
    const config = {  
        algorithm: 'des-ede3-cbc',
        autoPad: true,
        key: '0123456789abcd0123456789',
        iv: '12345678',
        strEncoding: 'utf8',
        cipherEncoding: 'hex'
    }
    
    
    const encryptStr = crypto.encrypt(str, config)
    const decryptStr = crypto.decrypt(encryptStr, config)
    assert.equal(encryptStr, '0b6afce98a2be6de', `${config.algorithm} fail`);
    assert.equal(str, decryptStr, `${config.algorithm} fail`);
}

function testaAesCbc(str) {
    const config = {  
        algorithm: 'aes-128-cbc',
        autoPad: true,
        key: 'jiapanivjiapaniv',
        iv: 'jiapanivjiapaniv',
        strEncoding: 'utf8',
        cipherEncoding: 'hex'
    }
    
    const encryptStr = crypto.encrypt(str, config)
    const decryptStr = crypto.decrypt(encryptStr, config)
    assert.equal(encryptStr, 'edf76c29bde09eb5d0fc23c72bc4fcff', `${config.algorithm} fail`);
    assert.equal(str, decryptStr, `${config.algorithm} fail`);
}

// 微信小程序iv,message解密: AES/CBC/PKCS7Padding
function testaWeixinAesCbcDecrypt() {
    var appId = 'wx4f4bc4dec97d474b'
    var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    var encryptedData = 
        'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
        'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
        '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
        '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
        'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
        'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
        '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
        'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
        '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
        '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
        'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
        '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
        '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
        'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
        'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
        '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
        'Db/XcxxmK01EpqOyuxINew=='
    var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    const config = {  
        algorithm: 'aes-128-cbc',
        autoPad: true,
        key: Buffer.from(sessionKey, 'base64'),
        iv: Buffer.from(iv, 'base64'),
        strEncoding: 'binary',
        cipherEncoding: 'utf8'
    }
    
    
    const decryptStr = crypto.decrypt(Buffer.from(encryptedData, 'base64'), config)

    var json = JSON.parse(decryptStr)
    assert.equal(json.watermark.appid, appId, `${config.algorithm} fail`);
}

function testAll() {
    testDesEcb(testStr)
    testDesCbc(testStr)
    test3DesEcb(testStr)
    test3DesCbc(testStr)
    testaAesCbc(testStr)
    testaWeixinAesCbcDecrypt()

    console.log('testAll passed!!')
}

testAll()