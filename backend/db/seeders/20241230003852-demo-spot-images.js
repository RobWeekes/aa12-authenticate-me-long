'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49949604/original/8acb8c6d-e279-4116-9520-e7bb71257be8.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      // added to test Spot Images
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTg0MTA3NDE3ODYyOTM3OTky/original/5607f1fd-3769-4547-a632-96b847383202.jpeg?im_w=720&im_format=avif',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47903680/original/517ae0d4-a747-4147-8554-32cf90764d85.jpeg?im_w=720&im_format=avif',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1005914845377005142/original/d81ac237-84ff-4884-b9d6-506891b14184.jpeg?im_w=720&im_format=avif',
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
