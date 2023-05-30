const mongoose = require('mongoose');

// added mern-book-search-engine
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-book-search-engine');

module.exports = mongoose.connection;
