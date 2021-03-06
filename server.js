// server.js


const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db')
const conf           = require('./config')
const bodyParser     = require('body-parser');
const app            = express();
const port = process.env.PORT || 8443;


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

const mongoClient = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(err => {
  if(err) {
    throw err;
  } else{
    const mongodb = mongoClient.db(db.dbName);
  require('./app/routes')(app, mongodb,conf);
  app.listen(port, () => {
  console.log('We are live on ' + port);
});
  }
  
})
