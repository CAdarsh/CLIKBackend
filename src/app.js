const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 


const uri = 'mongodb+srv://adarsh:eaUNvic6gESuY5Q@cluster0.mgwoh.mongodb.net/<clikIndia>?retryWrites=true&w=majority';

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

const middlewares = require('./middlewares');
const index = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(express.static('public'));
app.set('view engine', ejs);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', index);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
