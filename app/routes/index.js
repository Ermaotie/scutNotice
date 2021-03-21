// const noteRoutes = require('./otherPath');
const tool = require('../../index');
module.exports = function(app, db) {
  // Other route groups could go here, in the future
  app.post('/', (req, res) => {
    // You'll create your note here.
    tool();
    res.send('Hello')
  });
};