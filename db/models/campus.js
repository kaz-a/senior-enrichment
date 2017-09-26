const Sequelize = require('sequelize'),
  db = require('../index');

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "default.png"
  }
});

module.exports = Campus;