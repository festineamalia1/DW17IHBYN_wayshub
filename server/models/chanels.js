'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chanels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chanels.hasMany(models.Comments, {
        as: "comments",
      });
      Chanels.hasMany(models.Videos, {
        as: "video",
        foreignKey: "chanelId",
      });
      Chanels.hasMany(models.Subcribes, {
        as: "chanel",
        foreignKey: {
          name: "chanel",
        },
      });
      Chanels.hasMany(models.Subcribes, {
        as: "subcribe",
        foreignKey: {
          name: "subcriber",
        },
      });
    }
  };
  Chanels.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    chanelName: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chanels',
  });
  return Chanels;
};