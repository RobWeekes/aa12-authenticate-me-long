'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2031-01-01'),
        endDate: new Date('2031-01-02'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2031-02-15'),
        endDate: new Date('2031-02-16'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2031-03-20'),
        endDate: new Date('2031-03-21'),
      },
      {
        // added to test "Get all User's Bookings"
        spotId: 2,
        userId: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] },
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
