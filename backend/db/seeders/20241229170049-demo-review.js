'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,  // Demo-lition user
        spotId: 1,  // First spot
        review: 'This was an awesome spot!',
        stars: 5,
        createdAt: new Date('2025-03-15'),
        updatedAt: new Date('2025-03-15')
      },
      {
        userId: 2,  // FakeUser1
        spotId: 2,  // Second spot
        review: 'This was an okay spot.',
        stars: 3,
        createdAt: new Date('2025-04-20'),
        updatedAt: new Date('2025-04-20')
      },
      {
        userId: 3,  // FakeUser2
        spotId: 3,  // Third spot
        review: 'This was a horrible spot.',
        stars: 1,
        createdAt: new Date('2025-05-25'),
        updatedAt: new Date('2025-05-25')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /*
     * Add commands to revert seed here.
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
