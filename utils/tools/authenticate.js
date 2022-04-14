// import module
require('dotenv').config()
const jwt = require("jsonwebtoken");

// import env variables
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

// create token with expiration date
const createToken = (username) => {
  return jwt.sign({ username: username }, TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
};
// create a refresh token with no expire date
const createRefreshToken = (username) => {
    return jwt.sign({ username: username }, TOKEN_SECRET_KEY);
}
// cerate access tokens
const create = (username) => {
    auth = {
        accessToken : createToken(username),
        refreshToken : createRefreshToken(username),
        expiresIn : '1 hour'
    }
    return auth
}
// create verify authentication
const authentication = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.sendStatus(401)
    }else{
        jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();   
        }); 
    }
}
// verify tokens
const verify = (token) => {
    let userFromToken;
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
        if (err) return false;
        userFromToken = user
    }); 
    return userFromToken
}
// refresh token
const refreshToken = (refreshToken) => {
    const user = verify(refreshToken)
    if(user){
        auth = {
            accessToken : createToken(user.username),
            expiresIn : '1 hour'
        }
        return auth
    }else{
        return
    }
}

module.exports = {
    createToken,
    create,
    authentication,
    verify,
    refreshToken
}