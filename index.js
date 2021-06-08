'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/router'));


app.listen(8089, function() {
    console.log('Express app listening on port 8089');
})

module.exports = app;
