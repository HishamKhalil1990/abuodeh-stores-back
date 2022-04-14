// import modules
require('dotenv').config()
const hash = require('../tools/encryption');
const authenticate = require('../tools/authenticate')
const sendEmail = require('../tools/email');

// import env variables
const BASE_URL = process.env.BASE_URL
const VERIFIED_LINK = process.env.VERIFIED_LINK

// register function
const registerUser = async (username,password,email,department,res) => {
    try{
        // check if username or email is registered (not finished)
        const registered = false
        // if username is not registered create a new one 
        if(!registered){
            const user = await createUser(username,password,email,department,res)
            // user created successfully send varification email
            if(user){
                // send email
                await emailVerify(username,email,res)
            }else{
                res.send({msg : 'could not create user'})
            }
        }else{
            res.send({msg : 'username or email is used'})
        }
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
}
// create user function
const createUser = async (username,password,email,department,res) => {
    // check email validty
    const extenion = email.split('@')[1]
    if(extenion === 'abuodehbros.com'){
        // create a user (not finished)
        const encryptedPassword = hash.encrypt(password)

        // return user (not finished)
        return true
    }
}
// activate user
const activateUser = async (username,res) => {
    // activate it (not finished)

    // render the sign in page
    res.redirect(VERIFIED_LINK)
}
// login function
const LoginUser = async (username,password,res) => {
    try{
        // search for user using username (not finished)

        // decrypt the found user's password (not finished)
        const decryptPassword = password
        // check for matching passwords (not finished)
        if(password == decryptPassword){
            // create and send tokens
            const auth = authenticate.create(username)
            res.send({auth})
        }
        return true
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
}
// repeat sending
const repeatSending = async (username,email,password,res) => {
    // check if the user exist (not finished)
    const user = true 
    if(user){
        // send email
       await  emailVerify(username,email,res)
    }else{
        res.send({msg : 'user does not exist'})
    }
}
// send verification email function
const emailVerify = async (username,email,res) => {
    // check email vaildty
    const extenion = email.split('@')[1]
    if(extenion === 'abuodehbros.com'){
        // create email objects
        const subject = "verification link"
        const token = authenticate.createToken(username)
        const text = `${BASE_URL}account/verify/${token}`
        // send it
        await sendEmail(text,subject,email,res)
    }else{
        res.send({msg : 'used email is not vaild'})
    }
}
// change password
const changePassword = async (email,username,password,res) => {
    let user;
    if(username){
        // check if user exist (not finished)
        user = true
    }else if(email){
        // check if user exist (not finished)
        user = true
    }
    if(user){
        // change the user password (not finished)
        
        // if email exists send email
        if(email){
            // create email objects
            const subject = "password changed"
            const text = `your password has been changed`
            // send it
            await sendEmail(text,subject,email,res)
        }
    }else{
        res.send({msg : 'invaild email'})
    }
}

module.exports = {
    registerUser,
    createUser,
    activateUser,
    LoginUser,
    repeatSending,
    changePassword
}