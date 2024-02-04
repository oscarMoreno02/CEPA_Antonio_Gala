require('dotenv').config();

module.exports ={
  "development": {
    "username": "root",
    "password": null,
    "database": "bd_desarrollo",
    "host": "127.0.0.1",
    "dialect": mysql
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "bd_prueba",
    "host": "127.0.0.1",
    "dialect": mysql
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "bd_produccion",
    "host": "127.0.0.1",
    "dialect": mysql
  }
}