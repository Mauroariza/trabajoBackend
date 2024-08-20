'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('devices', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: false, // o true, dependiendo de si es obligatorio
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('devices', 'imageUrl');
  }
};
