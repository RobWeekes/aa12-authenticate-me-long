'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',  // Refers to the Users table
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',  // Refers to the Spots table
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // validate: {
        //   min: 1,
        //   max: 5,
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, options);
  },
      // added columns for user, spot, and reviewImages
    //   User: {
    //     id: {
    //       allowNull: false,
    //       autoIncrement: true,
    //       primaryKey: true,
    //       type: Sequelize.INTEGER
    //     },
    //     firstName: {
    //       type: Sequelize.STRING
    //     },
    //     lastName: {
    //       type: Sequelize.STRING
    //     },
    //   },
    //   Spot: {
    //     id: {
    //       allowNull: false,
    //       autoIncrement: true,
    //       primaryKey: true,
    //       type: Sequelize.INTEGER
    //     },
    //     ownerId: {
    //       type: Sequelize.INTEGER
    //     },
    //     address: {
    //       type: Sequelize.STRING
    //     },
    //     city: {
    //       type: Sequelize.STRING
    //     },
    //     state: {
    //       type: Sequelize.STRING
    //     },
    //     country: {
    //       type: Sequelize.STRING
    //     },
    //     lat: {
    //       type: Sequelize.DECIMAL
    //     },
    //     lng: {
    //       type: Sequelize.DECIMAL
    //     },
    //     name: {
    //       type: Sequelize.STRING
    //     },
    //     price: {
    //       type: Sequelize.DECIMAL
    //     },
    //     previewImage: {
    //       type: Sequelize.STRING
    //     },
    //   },
    // },
      // Create the ReviewImages table
  //   await queryInterface.createTable('ReviewImages', {
  //     // ReviewImages: [
  //       // {
  //         id: {
  //           allowNull: false,
  //           autoIncrement: true,
  //           primaryKey: true,
  //           type: Sequelize.INTEGER
  //         },
  //         reviewId: {
  //           type: Sequelize.INTEGER,
  //           allowNull: false,
  //           references: {
  //             model: 'Reviews',  // Refers to the Reviews table
  //             key: 'id',
  //           },
  //           onDelete: 'CASCADE',
  //           onUpdate: 'CASCADE',
  //         },
  //         url: {
  //           type: Sequelize.STRING,
  //           allowNull: false,
  //       },
  //       createdAt: {
  //         type: Sequelize.DATE,
  //         allowNull: false,
  //         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  //       },
  //       updatedAt: {
  //         type: Sequelize.DATE,
  //         allowNull: false,
  //         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  //       },
  //     // 
  //   });
  // },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('Reviews');
    // await queryInterface.dropTable('ReviewImages');
    options.tableName = "Reviews";
    return queryInterface.dropTable(options);
  }
};