const User = require('./User');
const Note = require('./Note');
const Contact = require('./Contact');

User.hasMany(Contact, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Contact.belongsTo(User, {
    foreignKey: 'user_id'
});

Contact.hasMany(Note, {
    foreignKey: 'contact_id',
    onDelete: 'CASCADE'
});

Note.belongsTo(Contact, {
    foreignKey: 'contact_id'
});


module.exports = { User, Note, Contact };
