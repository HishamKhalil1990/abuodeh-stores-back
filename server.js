// import modules
require('dotenv').config()
const express = require('express')
const bodyBarser = require('body-parser')
const cors = require('cors')

// import env variables
const PORT = process.env.PORT || 3005

// import router
const accountRouter = require('./routes/account')

// create, customize app
const app = express()
app.use(bodyBarser.json())
app.use(cors())
app.listen(PORT,(err) => {
    if(err) throw err
    console.log("connected")
})

// main routes
app.use('/account',accountRouter)