const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dev', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection: db } = mongoose;

db.on('connected', () => {
  console.log(`Connection to mongoDB successful`);
});

db.on('error', (error) => {
  console.log(`db error: ${error}`);
  console.error(error);
});

db.on('disconnected', () => {
  console.log(`db disconnect:`);
  console.debug('MongoDB disconnected');
});

module.exports = db;