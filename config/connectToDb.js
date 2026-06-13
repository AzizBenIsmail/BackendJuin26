const mongoose = require('mongoose');

module.exports.connectToDb = () => {
  mongoose.connect(process.env.mongoURI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
}
