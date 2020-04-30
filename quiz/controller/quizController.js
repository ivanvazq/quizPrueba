const Sequelize = require("sequelize");
const options = {logging: false, operatorsAliases: false};
const sequelize = new Sequelize("sqlite:quiz.sqlite", options);

//const {models} = require("../models");
const quizModel = sequelize.import('../model/quizModel');


const quiz = sequelize.define(  // define Quiz model (table quizzes)
    'quiz',
    {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        author: Sequelize.STRING
    }
);

sequelize.sync() // Syncronize DB and seed if needed
    .then(() => quiz.count())
    .then(count => {
        if (count === 0) {
            return quiz.bulkCreate([
                {question: "Capital of Italy", answer: "Rome", author: "admin"},
                {question: "Capital of France", answer: "Paris", author: "admin"},
                {question: "Capital of Spain", answer: "Madrid", author: "pepe"},
                {question: "Capital of Portugal", answer: "Lisbon", author: "admin"}
            ])
                .then(c => console.log(`DB filled with ${c.length} quizzes.`));
        } else {
            console.log(`DB exists & has ${count} quizzes.`);
        }
    })
    .catch(console.log);

    // Autoload el quiz asociado a :quizId
exports.load = (req, res, next, quizId) => {

    quiz.findByPk(quizId)
    .then(quiz => {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            throw new Error('There is no quiz with id=' + quizId);
        }
    })
    .catch(error => next(error));
};


// GET /quizzes
exports.index = (req, res, next) => {

    quiz.findAll()
    .then(quizzes => {
        res.send({quizzes});
    })
    .catch(error => next(error));
};




