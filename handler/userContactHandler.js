'use strict';

const Promise = require('bluebird');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teamsixdb', 'teamsix', '1879asdf', {
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

const Contact = sequelize.import('../models/contact');

exports.uploadContact = function (req, res) {
    const contactList = req.body.contact;

    Promise.all(createContactPromises(req.body.id, contactList))
        .then(function() {
            res.status(200).send();
        })
        .catch(function() {
            res.status(500).send();
        })
};

function createContactPromises(user_id, contact_list) {
    const promiseArray = [];

    const contactNum = contact_list.length;
    for (let i = 0; i < contactNum; i++) {
        const contactRecord = {
            user_id: user_id,
            name: contact_list[i]
        };

        promiseArray.push(Contact.create(contactRecord));
    }

    return promiseArray;
}