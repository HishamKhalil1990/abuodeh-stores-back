// import modules
require("dotenv").config();
const express = require("express");
const bodyBarser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client')

// import env variables
const PORT = process.env.PORT || 3005;

// import router
const accountRouter = require("./routes/account");

// create, customize app
const app = express();
app.use(bodyBarser.json());
app.use(cors());
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("connected");
});

// create prisma client
const prisma = new PrismaClient();

// main routes
app.use("/account", accountRouter);

// exports
module.exports = prisma