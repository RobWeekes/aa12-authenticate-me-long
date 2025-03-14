'use strict';

// const { Model, Validator } = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
    SpotImage.init({
        spotId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false
        },
        preview: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      }, {
        sequelize,
        modelName: 'SpotImage'
    });
    return SpotImage;
  };
