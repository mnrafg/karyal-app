const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class Author extends Model {}

Author.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(50), allowNull: false },
    lastName: { type: DataTypes.STRING(50), allowNull: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING(128), allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "authors",
  }
);

module.exports = Author;
