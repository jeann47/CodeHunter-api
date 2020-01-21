'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        login: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        pic: {
          type: Sequelize.STRING,
          allowNull: true
        },
        bio: {
          type: Sequelize.STRING,
          allowNull: false
        },
        //Social
          email: {
            type: Sequelize.STRING,
            allowNull: false
          },
          gitHub: {
            type: Sequelize.STRING,
            allowNull: true
          },
          stackOverflow: {
            type: Sequelize.STRING,
            allowNull: true
          },
          linkedIn: {
            type: Sequelize.STRING,
            allowNull: true
          },
          instagram: {
            type: Sequelize.STRING,
            allowNull: true
          },
        //End Social
        techs: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        notes: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
