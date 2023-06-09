const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-book-search-engine'
 
);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected successfully');
});

// Rest of the code...

module.exports = db;
