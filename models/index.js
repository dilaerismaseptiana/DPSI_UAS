// models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.js')[env];
const db = {};

let sequelize;
if (process.env.DATABASE_URL) {
  // Jika menggunakan DATABASE_URL dari variabel lingkungan
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql', // Sesuaikan dengan jenis database yang Anda gunakan
    ssl: {
      rejectUnauthorized: false // Hanya diperlukan jika Anda menghubungkan ke database dengan SSL
    }
  });
} else {
  // Jika tidak menggunakan DATABASE_URL, gunakan konfigurasi lainnya
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Hanya diperlukan jika Anda menghubungkan ke database dengan SSL
      }
    }
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = db;
