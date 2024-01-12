const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');
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
  await noteData.bulkCreate(noteData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();