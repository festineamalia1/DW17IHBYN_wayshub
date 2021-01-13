'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Videos.belongsTo(models.Chanels, {
         as: "chanels",
         foreignKey: {
           name: "chanelId",
         },
       });
       Videos.hasMany(models.Comments, {
         as: "comments",
       });
    }
  };
  Videos.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      description: DataTypes.STRING,
      video: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      chanelId: DataTypes.INTEGER,
      category: DataTypes.ENUM([
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
    {
      sequelize,
      modelName: "Videos",
    }
  );
  return Videos;
};