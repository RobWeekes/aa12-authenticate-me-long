'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const generateDates = (endDate) => {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setDate(end.getDate() - 1); // booking starts 1 day before review
  return { start, end };
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dates1 = generateDates('2025-03-15');
    const dates2 = generateDates('2025-04-20');
    const dates3 = generateDates('2025-05-25');

    await Booking.bulkCreate([
      {
        // id: 1,
        spotId: 1,
        userId: 1,
        startDate: dates1.start,
        endDate: dates1.end
      },
      {
        // id: 2,
        spotId: 2,
        userId: 2,
        startDate: dates2.start,
        endDate: dates2.end
      },
      {
        // id: 3,
        spotId: 3,
        userId: 3,
        startDate: dates3.start,
        endDate: dates3.end
      },
      {
        // id: 4, added to test "Get all User's Bookings"
        spotId: 2,
        userId: 1,
        startDate: dates1.start,
        endDate: dates1.end
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

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
      spotId: { [Op.in]: [1, 2, 3] },
    }, {});
  }
};
