require('dotenv').config()
const { Sequelize } = require('sequelize');


const db =  new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALECT, 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     },
  });

module.exports =  db;

