'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcribes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Subcribes.belongsTo(models.Chanels, {
         as: "chanels",
         foreignKey: {
           name: "chanel",
         },
       });
        Subcribes.belongsTo(models.Chanels, {
          as: "subcribe",
          foreignKey: {
            name: "subcriber",
          },
        });
    }
  };

  Subcribes.init({
    chanel: DataTypes.INTEGER,
    subcriber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subcribes',
  });
  return Subcribes;
};