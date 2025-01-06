'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', as: 'SpotReviews' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', as: 'SpotImages' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId', as: 'SpotBookings' });
    }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -90,
          max: 90,
          isDecimal: true
        }
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
          isDecimal: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          min: {
            args: [0],
            msg: "Price per day must be a positive number"
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Spot',
      defaultScope: {
        attributes: {
          exclude: [],
        }
      }
    }
  );
  return Spot;
};
