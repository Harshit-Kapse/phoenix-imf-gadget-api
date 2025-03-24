// require essential packages, files and values
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { sqlize, connectToDb } = require("./config/database");
const cookieParser = require("cookie-parser");

// connecting to database postgres using sequelize
async function connect() {
    await connectToDb();
}

connect();

// specifing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// requiring route for gadgets
const gadgetRoute = require("./routes/gadgetRoute");

// importing route for auth
const authRoute = require("./routes/authRoute");

// specifying route
app.use("/gadget", gadgetRoute);
app.use("/gadget-auth", authRoute);

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});