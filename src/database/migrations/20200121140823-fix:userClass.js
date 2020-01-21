'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 
        'class', {
          type: Sequelize.BOOLEAN,
          allowNull: false
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('users');
  }
};
