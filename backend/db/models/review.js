'use strict';
// const {
//   Model
// } = require('sequelize');
const { Model, Validator } = require('sequelize');

const sequelize = require('../../config/database');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review.belongsTo(models.User, { foreignKey: 'userId' });
      // Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
      // Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', as: 'images' });
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review'
  });
  return Review;
};