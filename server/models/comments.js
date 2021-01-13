"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Chanels, {
        as: "chanels",
        foreignKey: {
          name: "chanelId",
        },
      });
      Comments.belongsTo(models.Videos, {
        as: "video",
        foreignKey: {
          name: "videoId",
        },
      });
    }
  }
  Comments.init(
    {
      comment: DataTypes.STRING,
      videoId: DataTypes.INTEGER,
      chanelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
