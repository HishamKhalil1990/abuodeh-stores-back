// import modules
require("dotenv").config();
const hash = require("../tools/encryption");
const authenticate = require("../tools/authenticate");
const sendEmail = require("../tools/email");
const { PrismaClient } = require("@prisma/client");

// create prisma client
const prisma = new PrismaClient();

// import env variables
const BASE_URL = process.env.BASE_URL;
const VERIFIED_LINK = process.env.VERIFIED_LINK;
const PASS_GENERATOR = process.env.PASS_GENERATOR;

// register function
const registerUser = async (username, password, email, department, res) => {
  try {
    // create user
    const user = await createUser(username, password, email, department, res);
    // if user created successfully send varification email
    if (user) {
      // send email
      await emailVerify(username, email, res);
    } else {
      res.send({ msg: "could not create user" });
    }
  } catch (err) {
    res.send({ msg: `username or email is used` });
  }
};

// create user function
const createUser = async (username, password, email, department, res) => {
  let status = false;
  // check email validty
  const extenion = email.split("@")[1];
  if (extenion === "abuodehbros.com") {
    // create a user
    const encryptedPassword = hash.encrypt(password);
    const returned = await prisma.user.create({
      data: {
        username,
        email,
        password: encryptedPassword,
        department,
      },
    });
    // return user
    if (returned) {
      status = true;
    }
  }
  return status;
};

// activate user
const activateUser = async (username, res) => {
  try {
    // activate it
    await prisma.user.update({
      where: { username },
      data: { status: true },
    });
    // render the sign in page
    res.redirect(VERIFIED_LINK);
  } catch (err) {
    console.log(err);
  }
};

// login function
const LoginUser = async (username, password, res) => {
  try {
    // search for user using username
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    //decrypt password
    const decryptPassword = hash.decrypt(user.password);
    // create and send tokens
    if (decryptPassword == password) {
      const auth = authenticate.create(username);
      res.send({ auth });
    } else {
      res.send({ msg: "invalid username or password" });
    }
  } catch (err) {
    res.send({ msg: "invalid username or password" });
  }
};

// repeat sending
const repeatSending = async (username, email, res) => {
  try {
    // check if the user exist
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    // send email
    if (email == user.email) {
      await emailVerify(username, email, res);
    } else {
      res.send({ msg: "invalid username or email" });
    }
  } catch (err) {
    res.send({ msg: "invalid username or email" });
  }
};

// send verification email function
const emailVerify = async (username, email, res) => {
  // check email vaildty
  const extenion = email.split("@")[1];
  if (extenion === "abuodehbros.com") {
    // create email objects
    const subject = "verification link";
    const token = authenticate.createToken(username);
    const text = `${BASE_URL}account/verify/${token}`;
    // send it
    await sendEmail(text, subject, email, res);
  } else {
    res.send({ msg: "used email is not vaild" });
  }
};

// change password
const changePassword = async (email, username, newPassword, password, res) => {
  if (email) {
    try {
      // create new random password
      let newPassword = "";
      for (let i = 0; i <= 12; i++) {
        const randomNumber = Math.floor(Math.random() * PASS_GENERATOR.length);
        newPassword += PASS_GENERATOR.substring(randomNumber, randomNumber + 1);
      }
      const encryptedPassword = hash.encrypt(newPassword);
      // check the user exist
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if(user.username == username){
          // update the user
          await prisma.user.update({
            where: {
                username,
            },
            data: {
              password: encryptedPassword,
            },
          });
          // create email objects
          const subject = "password changed";
          const text = `your new password is ${newPassword}`;
          // send email using email objects
          await sendEmail(text, subject, email, res);
      }else{
        res.send({ msg: "invalid username or email" });
      }
    } catch (err) {
      res.send({ msg: "invalid username or email" });
    }
  }
};

module.exports = {
  registerUser,
  createUser,
  activateUser,
  LoginUser,
  repeatSending,
  changePassword,
};
