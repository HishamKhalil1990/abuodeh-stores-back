// import module
const CryptoJs = require('crypto-js')

// create password encryption function
const encrypt = (password) => {
    return CryptoJs.AES.encrypt(password,'secret key 123').toString();
}
// create encrypted-password decryption function
const decrypt = (encryptedPassword) => {
    return CryptoJs.AES.decrypt(encryptedPassword,'secret key 123').toString(CryptoJs.enc.Utf8)
}

module.exports = {
    encrypt,
    decrypt
}