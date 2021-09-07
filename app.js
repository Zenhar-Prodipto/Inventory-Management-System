const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressValidator = require("express-validator");

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
app.use(expressValidator());

//Importing Routes

const AuthorizationRoute = require("./Routes/Authorization");
const ProductRoute = require("./Routes/Product");
const WarehouseRoute = require("./Routes/Warehouse");

//Routes
app.use("/api", AuthorizationRoute);
app.use("/api", ProductRoute);
app.use("/api", WarehouseRoute);
//Port

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The app is running at port ${port}`);
});
