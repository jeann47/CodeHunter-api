'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('posts', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },  
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        mainImg: {
          type: Sequelize.STRING,
          allowNull: false
        },
        images: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true
        },
        texts: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        videoLink: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        type: {  
          type: Sequelize.STRING,
          allowNull: false
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
      return queryInterface.dropTable('posts');
  }
};
