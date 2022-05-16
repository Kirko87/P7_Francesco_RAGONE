const express = require('express');
const app = express();
const userIdRoutes = require('./routes/userData');
const userWrtRoutes = require ('./routes/userWritingZone');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());


app.use("/Groupomania", userIdRoutes);
app.use("/Groupomania", userWrtRoutes);



app.use('/images', express.static(path.join(__dirname, 'images')));






module.exports = app;