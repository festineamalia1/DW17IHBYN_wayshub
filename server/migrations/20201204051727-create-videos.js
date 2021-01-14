'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Videos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },
      viewCount: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.ENUM([
          "way & Style",
          "Music",
          "Education",
          "Entertainment",
          "Comedy",
          "Film",
          "Travelling & Events",
          "Gaming",
          "News",
          "Pets & Animals",
          "Science & Technology",
          "Sports",
          "Autos & Vehicles",
        ]),
      },
      chanelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Chanels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Videos');
  }
};