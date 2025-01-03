'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://example.com/image1.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://example.com/image11.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://example.com/image2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://example.com/image3.jpg',
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
