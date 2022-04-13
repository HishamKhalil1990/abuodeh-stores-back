// import modules
require('dotenv').config()
const hash = require('../encryption');
const authenticate = require('../authenticate')
const sendEmail = require('../email')

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
            const encryptedPassword = hash.encrypt(password)
            const user = await createUser(username,encryptedPassword,email,department,res)
            // user created successfully send varification email
            if(user){
                const subject = "verification link"
                const token = authenticate.createToken(username)
                const text = `${BASE_URL}account/verify/${token}`
                sendEmail(text,subject,email,res)
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
    // create a user (not finished)

    // return user (not finished)
    return true
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

        // check for matching passwords (not finished)
        if(password){
            // create and send tokens
            const auth = authenticate.create(username)
            res.send({auth})
        }
        return true
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
}

module.exports = {
    registerUser,
    createUser,
    activateUser,
    LoginUser
}