'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await Spot.bulkCreate([
            {
                id: 1,
                ownerId: 1,
                address: "123 Disney Lane",
                city: "San Francisco",
                state: "California",
                country: "United States of America",
                lat: 37.7645358,
                lng: -122.4730327,
                name: "App Academy",
                description: "Place where web developers are created",
                price: 123,
            },
            {
                id: 2,
                ownerId: 2,
                address: "124 Disney Lane",
                city: "San Francisco",
                state: "California",
                country: "United States of America",
                lat: 38.7645358,
                lng: -123.4730327,
                name: "App Academy",
                description: "Place where web developers are created",
                price: 124,
            },
            {
                id: 3,
                ownerId: 3,
                address: "125 Disney Lane",
                city: "San Francisco",
                state: "California",
                country: "United States of America",
                lat: 39.7645358,
                lng: -124.4730327,
                name: "App Academy",
                description: "Place where web developers are created",
                price: 125,
            },

        ], { validate: true });
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            id: { [Op.in]: [1, 2, 3] }
        }, {});
    }
};
