'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Baca semua file model dalam folder ini
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&        // bukan file tersembunyi
    file !== basename &&              // bukan file index.js sendiri
    file.slice(-3) === '.js'          // hanya file .js
  )
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelFunc = require(modelPath); // bisa jadi function atau bukan

    if (typeof modelFunc === 'function') {
      const model = modelFunc(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️  File ${file} bukan model yang valid (bukan fungsi ekspor).`);
    }
  });

// Panggil associate jika tersedia
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
