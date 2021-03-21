// server.js


const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db')
const config         = require('./config')
const bodyParser     = require('body-parser');
const app            = express();
const port = process.env.PORT || 8443;


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
require('./app/routes')(app, client);
app.listen(port, () => {
  console.log('We are live on ' + port);
});