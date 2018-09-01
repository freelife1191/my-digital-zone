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

const Zone = sequelize.import('../models/zone');
const ZoneContact = sequelize.import('../models/disconnect_contact');

exports.setZone = function (req, res) {
    const zone = {
        user_id : req.body.user_id,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        radius : req.body.radius
    };

    const bannedContactList = req.body.contact;

    Zone.create(zone)
        .then(function(result) {
            console.log(result.dataValues.id);
            return Promise.all(createContactPromises(result.dataValues.id, bannedContactList));
        })
        .then(function() {
            res.status(200).send();
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send();
        });
};

function createContactPromises(zone_id, contact_list) {
    const promiseArray = [];

    const contactNum = contact_list.length;
    for (let i = 0; i < contactNum; i++) {
        const bannedContactRecord = {
            zone_id: zone_id,
            contact_id: contact_list[i]
        };

        promiseArray.push(ZoneContact.create(bannedContactRecord));
    }

    return promiseArray;
}

exports.getZoneList = function (req, res) {
    const query = {
        where: {
            user_id: req.params.user_id
        },
        attributes: ['id', 'latitude', 'longitude', 'radius']
    };

    Zone.findAll(query)
        .then(function (result) {
            res.json(result);
        })
        .catch(function () {
            res.status(500).send();
        });
};