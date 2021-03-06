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

var quizService = "quiz:3001" || "localhost:3001";





router.get('/', (req, res, next) => {
    

    res.render('index');


});


// //////////// Routes for the resource /quizzes /////////////////

//GET all quizzes
router.get('/quizzes', (req, res, next) => {

    fetch("http://quiz:3001/api/quizzes")
        .then(res => res.json())
        .then((out) => {
            res.render('quizzes/index', {out})
                       
        }).catch(err => {throw err});
});

router.get('/quizzes/new', (req, res, next) => {

    fetch('http://'+ quizService +'/api/quizzes/new')
        .then(res => res.json())
        .then((out) => {
            res.render('quizzes/new', out);
        }).catch(err => {throw err});

 });

router.post('/quizzes', (req, res, next) => {

    const {question, answer} = req.body;
    const author = res.locals.user;

    let xhr = new XMLHttpRequest();
    let url = 'http://quiz:3001/api/quizzes';
    xhr.open("POST", url, true);
    // console.log(question)
    var data = JSON.stringify({question, answer, author});
    console.log(data)
    xhr.send(data);
    res.redirect('/quizzes');
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
app.listen(3000, () => {
    console.log("Frontend service started on port " + 3000);
});