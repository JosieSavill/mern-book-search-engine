const db = require('../config/connection');
const { User, bookSchema } = require('../models');
const userSeeds = require('./userSeeds.json');

(async () => {
  try {
    await db;

    // Delete all existing users
    await User.deleteMany({});

    // Create new users from the seed data
    await User.create(userSeeds);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Close the database connection
    db.close();
  }
})();
