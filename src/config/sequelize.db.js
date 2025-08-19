const { Sequelize } = require('sequelize');
const env = require('./env');

module.exports = new Sequelize({
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});