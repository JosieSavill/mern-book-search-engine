const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-book-search-engine', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true, // Replace with useCreateIndexes: true
//   useFindAndModify: false, // Replace with useFindAndModify: false
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected successfully');
});

// Rest of the code...

module.exports = db;
