'use strict';

const Promise = require('bluebird');

const Zone = require('../models').models.Zone;
const Contact = require('../models').models.Contact;
const ZoneContact = require('../models').models.Disconnect_contact;

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
        include : [
            {
                model: ZoneContact,
                duplicating: false,
                include: [
                    {
                        model: Contact,
                        attributes: ['id', 'name']
                    }
                ]
            },
        ],
        attributes: ['id', 'latitude', 'longitude', 'radius']
    };

    Zone.findAll(query)
        .then(function (result) {
            res.json(refileZoneQueryResult(result));
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send();
        });
};

function refileZoneQueryResult(result) {
    return result.map(function(item) {
        const tempItem = item.dataValues;
        tempItem.contact = tempItem.disconnect_contacts.map(function(item) {
            return item.contact;
        });
        delete tempItem.disconnect_contacts;
        return tempItem;
    });
}