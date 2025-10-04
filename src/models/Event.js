const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.db');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING, 
      allowNull: false,
      references: {
        model: 'users', // Changed to lowercase table name
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: DataTypes.STRING,
    about: DataTypes.STRING,
    location: DataTypes.STRING,
    day: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER, 
    venueType: {
      type: DataTypes.ENUM('physical', 'virtual', 'hybrid'),
      allowNull: false,
      defaultValue: 'physical'
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    magic_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    magic_token_expiry: {
      type: DataTypes.DATE,
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
    modelName: 'Event', 
    timestamps: true,
    tableName: 'events',
    paranoid: true
  }
);

Event.associate = function(models) {
  Event.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user', // Changed to lowercase for consistency
    onDelete: 'CASCADE'
  });
};

module.exports = Event;