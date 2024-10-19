const { Sequelize } = require('sequelize');


const dbConfig = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "UJ@wal123",
    DB: "getbitusr_transactions",
    dialect: process.env.dialect,
    dialectOptions: {
      supportBigNumbers: false,
      useUTC: true, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    timezone: "+05:30",
    pool: {
      max: 5,
      min: 0,
      acquire: 500000,
      idle: 10000,
    },
  };

const sequelize = new Sequelize(dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: "mysql",
      // dialectOptions: { useUTC: true },
      logging: false,
      // Port: 5432,
      port: 3306,
      timezone: "+05:30",
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    });

module.exports = sequelize;
