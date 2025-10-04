const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    authMethod: {
      type: DataTypes.ENUM('google', 'magic_link'),
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    tableName: 'users',
    paranoid: true
  }
);

// Define associations
User.associate = function(models) {
  User.hasMany(models.MagicLink, {
    foreignKey: 'userId',
    as: 'magicLinks', // Added alias for consistency
    onDelete: 'CASCADE'
  });
  
  User.hasMany(models.Event, {
    foreignKey: 'userId',
    as: 'events', // Added alias for consistency
    onDelete: 'CASCADE'
  });
};

module.exports = User;