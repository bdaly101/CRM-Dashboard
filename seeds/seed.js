const sequelize = require('../config/connection');
const { User, Contact, Note } = require('../models');

const userData = require('./userData.json');

// TODO: Make Seeds Data for each
const contactData = require('./contactData.json');
const noteData = require('./noteData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await Contact.bulkCreate(contactData, {
    individualHooks: true,
    returning: true,
  });

  await Note.bulkCreate(noteData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();