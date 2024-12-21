'use strict';
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
        type: Sequelize.STRING
      },
      stars: {
        type: Sequelize.INTEGER
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
      // added columns for user, spot, and reviewImages
      User: {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
      },
      Spot: {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER
        },
        address: {
          type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        country: {
          type: Sequelize.STRING
        },
        lat: {
          type: Sequelize.DECIMAL
        },
        lng: {
          type: Sequelize.DECIMAL
        },
        name: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.DECIMAL
        },
        previewImage: {
          type: Sequelize.STRING
        },
      },
      ReviewImages: [
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          url: {
            type: Sequelize.STRING
          }
        },
      ]
      // 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};