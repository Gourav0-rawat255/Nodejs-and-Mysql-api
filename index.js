const mySql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

const user = require("./route/user");
const doctor  = require("./route/doctor");
const login = require("./route/login");
const hospital = require("./route/hospital");
const search = require("./route/search");
const logout = require("./route/logout.js");
const connect = require("./connection/connection");

const app = express()
app.use(express.json())
app.use(user)
app.use(hospital)
app.use(doctor)
app.use(login)
app.use(search)
app.use(logout)
app.use('/uploads',express.static('uploads'));
app.use('/userImage',express.static('userImage'));



app.listen(3003);

