const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const userObjRoute = require ('./routes/userSpace');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());


app.use("/Groupomania", userRoutes);
app.use("/Groupomania/users", userObjRoute);

app.use('/images', express.static(path.join(__dirname, 'images')));






module.exports = app;