'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'firstName',
      {
        type: Sequelize.DataTypes.STRING,
      }
    );
    await queryInterface.addColumn(
      'Users',
      'lastName',
      {
        type: Sequelize.DataTypes.STRING,
      }
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'firstName');
    await queryInterface.removeColumn('User', 'lastName');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
