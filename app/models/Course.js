const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Author = require("./Author");

class Course extends Model {}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(60), allowNull: false },
    description: {
      type: DataTypes.STRING(350),
      allowNull: true,
      defaultValue: "N/A",
    },
    intro: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "N/A",
    },
    icon: { type: DataTypes.STRING(30), allowNull: false },
    thumbnail: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "courses",
  }
);

Author.hasMany(Course);
Course.belongsTo(Author);

module.exports = Course;
