const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = new express();

//Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(`Mongoose Error: ${err}`));

//Loading Third Party Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

//Importing Routes

const testRoute = require("./Routes/testRoute");

//Routes

app.use("/api", testRoute);

//Port

port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The app is running at port ${port}`);
});
