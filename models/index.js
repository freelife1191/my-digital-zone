/**
 * Created by YoungKim on 2016. 8. 29..
 */

'use strict';

const Index = require('sequelize');

const db = {};

const sequelize = new Index('teamsixdb', 'teamsix', '1879asdf', {
    host: 'teamsixdbinstance.cazekigadpwz.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

const User = sequelize.import('./user');
const Zone = sequelize.import('./zone');
const Contact = sequelize.import('./contact');
const Disconnect_contact = sequelize.import('./disconnect_contact');

Zone.hasMany(Disconnect_contact, {foreignKey: 'zone_id', onDelete: 'cascade'});
Disconnect_contact.belongsTo(Zone, {foreignKey: 'zone_id', onDelete : 'cascade'});
Contact.hasMany(Disconnect_contact, {foreignKey: 'contact_id', onDelete: 'cascade'});
Disconnect_contact.belongsTo(Contact, {foreignKey: 'contact_id', onDelete : 'cascade'});

// Order is important
User.sync().then(function () {
    return Zone.sync();
}).then(function () {
    return Contact.sync();
}).then(function() {
    return Disconnect_contact.sync();
}).then(function() {
    sequelize.sync();
});

db.sequelize = sequelize;
db.models = {};

db.models.User = User;
db.models.Zone = Zone;
db.models.Contact = Contact;
db.models.Disconnect_contact = Disconnect_contact;

module.exports = db;