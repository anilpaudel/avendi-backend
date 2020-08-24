const mongoose = require('mongoose');

const mongoOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connect = () =>
  mongoose.createConnection(process.env.MONGODB_URL, mongoOptions);

const connectToMongoDB = () => {
  const db = connect(process.env.MONGODB_URL);
  db.on('open', () => {
    console.info(
      `Mongoose connection open to ${JSON.stringify(process.env.MONGODB_URL)}`
    );
  });
  db.on('error', (err) => {
    console.info(
      `Mongoose connection error: ${err} with connection info ${JSON.stringify(
        process.env.MONGODB_URL
      )}`
    );
    process.exit(0);
  });
  return db;
};

module.exports = connectToMongoDB();
