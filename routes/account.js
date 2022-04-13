// import modules
require('dotenv').config()
const express = require('express')
const router = express.Router()

// import all functions
const accountFunctions = require('../utils/functions/accountFunctions')
const authenticate = require('../utils/authenticate')

// import env variables
const NEW_VERIFY_LINK = process.env.NEW_VERIFY_LINK

// routes functions
// register
const register = async (req,res) => {
    try{
        // get fields values from the request body
        const { username, password, email, department } = req.body
        // check if values are vailed
        if(username && password && email && department){
            // try to register user
            await accountFunctions.registerUser(username,password,email,department,res)
        }else{
            res.send({msg : "empty fields"})
        }
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
    
}
// verify email
const verifyEmail = async (req,res) => {
    try{
        // get token from request
        const {token} = req.params
        // verify token
        const user = authenticate.verify(token)
        if(user){
            // activate user 
            await accountFunctions.activateUser(user.username,res)
        }else{
            res.redirect(NEW_VERIFY_LINK)
        }
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
}
// login
const login = async (req,res) => {
    try{
        // get fields values from the request body
        const { username, password } = req.body
        // check if values are vailed
        if(username && password){
            // try to login and send auth token
            await accountFunctions.LoginUser(username,password,res)
        }else{
            res.send({msg : "empty fields"})
        }
    }catch(err){
        res.send({msg : `error : ${err}`})
    }
}

// routes
router.post('/reg',register)
router.get('/verify/:token',verifyEmail)
router.post('/login',login)

module.exports = router