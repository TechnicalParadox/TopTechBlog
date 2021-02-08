require('dotenv').config();

const Sequelize = require('sequelize');

// Nested ternary operation to initialize sequelize
const sequelize = process.env.JAWSDB_URL ? // If the server is live on heroku
  // Sequelize will connect to JAWSDB_URL
  new Sequelize(process.env.JAWSDB_URL)
  : // Otherwise
  process.env.USE_LIVE === "1" ? // If we want to use the live database
    // Sequelize will connect to LIVE_DB_HOST
    new Sequelize(process.env.LIVE_DB_NAME, process.env.LIVE_DB_USER, process.env.LIVE_DB_PW,
    {
      host: process.env.LIVE_DB_HOST,
      port: process.env.LIVE_DB_PORT,
      dialect: 'mysql',
      dialectOptions:
      {
        decimalNumbers: true
      }
    })
    : // Otherwise
    // Sequelize will connect to LOCAL_DB
    new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USER, process.env.LOCAL_DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true
      },
    });

module.exports = sequelize;
