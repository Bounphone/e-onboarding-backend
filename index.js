var MongoClient = require('mongodb').MongoClient;
var dotenv = require('dotenv');
const { Db } = require('mongodb');

dotenv.config();

var DB_URL = process.env.DB_URL;
var MY_DB = process.env.MY_DB;

var url = DB_URL + MY_DB;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
