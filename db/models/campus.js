const Sequelize = require('sequelize'),
  db = require('../index');

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    defaultValue: "Terra"
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "/images/default.png"
  }
});

module.exports = Campus;