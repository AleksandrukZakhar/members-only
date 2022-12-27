const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");

const indexRouter = require("./routes/index.js");

const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");

const setUpDb = require("./setup.js");
const setUpMiddleWares = require("./setup.js");
const setUpPassport = require("./setup.js");
const setUpHTTPErrorHandlers = require("./setup.js");

require("dotenv").config();

setUpDb();

const app = express();

const User = require("./models/user.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

setUpMiddleWares();
setUpPassport();
setUpHTTPErrorHandlers();

module.exports = app;
