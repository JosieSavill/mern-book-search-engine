const User = require('./User');

// added:
const bookSchema = require('./Book')

//const Book = model('Book', bookSchema);

module.exports = { User, bookSchema };
