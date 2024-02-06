require('dotenv').config();

module.exports ={
  "development": {
    "username": "root",
    "password": null,
    "database": "bdDesarrolloCEPA",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "bdPruebaCEPA",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "bdProduccionCEPA",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}