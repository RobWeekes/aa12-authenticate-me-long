'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        // id: 1,
        spotId: 1,
        userId: 1,
        startDate: new Date('2031-01-01'),
        endDate: new Date('2031-01-02'),
      },
      {
        // id: 2,
        spotId: 2,
        userId: 2,
        startDate: new Date('2031-02-15'),
        endDate: new Date('2031-02-16'),
      },
      {
        // id: 3,
        spotId: 3,
        userId: 3,
        startDate: new Date('2031-03-20'),
        endDate: new Date('2031-03-21'),
      },
      {
        // id: 4, added to test "Get all User's Bookings"
        spotId: 2,
        userId: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
      spotId: { [Op.in]: [1, 2, 3] },
  }, {});
  }
};
