const express = require('express');
const router = express.Router();
var app = express();
var path = require('path');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const location = require('location')

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var partials = require('express-partials');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var quizService = "localhost:3001";





router.get('/', (req, res, next) => {
    

    res.render('index');


});


// //////////// Routes for the resource /quizzes /////////////////

//GET all quizzes
router.get('/quizzes', (req, res, next) => {

    fetch("http://" + quizService + "/api/quizzes")
        .then(res => res.json())
        .then((out) => {
            res.render('quizzes/index', {out})
                       
        }).catch(err => {throw err});
});


var port = process.env.PORT || 3000;





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(methodOverride('_method', {methods: ["POST", "GET"]}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());


app.use(router)
app.listen(port);