'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        id: 1,
        userId: 1,  // Demo-lition user
        spotId: 1,  // First spot
        review: 'This was an awesome spot!',
        stars: 5,
        createdAt: new Date('2023-11-19 20:39:36'),
        updatedAt: new Date('2023-11-19 20:39:36')
      },
      {
        id: 2,
        userId: 2,  // FakeUser1
        spotId: 2,  // Second spot
        review: 'This was an okay spot.',
        stars: 3,
        createdAt: new Date('2023-11-19 20:39:36'),
        updatedAt: new Date('2023-11-19 20:39:36')
      },
      {
        id: 3,
        userId: 3,  // FakeUser2
        spotId: 3,  // Third spot
        review: 'This was a horrible spot.',
        stars: 1,
        createdAt: new Date('2023-11-19 20:39:36'),
        updatedAt: new Date('2023-11-19 20:39:36')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: ['1, 2, 3'] }
    }, {});
  }
};
