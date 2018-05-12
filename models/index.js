const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

// Session
sequelize.import(path.join(__dirname,'session'));


sequelize.sync()
    .then(() => sequelize.models.quiz.count())
    .then(count => {
        if (!count) {
            return sequelize.models.quiz.bulkCreate([
                { question: "Capital de Italia", answer: "Roma" },
                { question: "Capital de Francia", answer: "París" },
                { question: "Capital de España", answer: "Madrid" },
                { question: "Capital de Portugal", answer: "Lisboa" }
            ]);
        }
    })
    .then(()=>console.log('Ole que te ole con tu BBDD'))
    .catch(error => {
        console.log("eoeoeo", error);
        process.exit(1);
    });

module.exports = sequelize;