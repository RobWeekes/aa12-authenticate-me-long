'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        // id: 1,
        spotId: 1,
        userId: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        // id: 2,
        spotId: 2,
        userId: 2,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        // id: 3,
        spotId: 3,
        userId: 3,
        startDate: new Date(),
        endDate: new Date(),
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
  }
};
