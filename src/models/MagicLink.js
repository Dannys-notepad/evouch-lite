const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.db');

class MagicLink extends Model {}

MagicLink.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // PK
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users', // table name
        key: 'id'
      },
      onDelete: 'CASCADE'
      // ❌ no primaryKey here
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
  },
  {
    sequelize,
    modelName: 'MagicLink',
    timestamps: true,
    tableName: 'magic_links',
    paranoid: true
  }
);

// Associations
MagicLink.associate = function (models) {
  MagicLink.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
  });
};

module.exports = MagicLink;