const express = require('express');
const router = express.Router();
var app = express();
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var partials = require('express-partials');


const quizController = require('./controller/quizController');


// Autoload for routes using :quizId
router.param('quizId', quizController.load);

// Routes for the resource /quizzes
router.get('/api/quizzes', quizController.index);

const port = 3001;


app.use(router)
app.listen(port);