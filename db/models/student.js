const Sequelize = require('sequelize'),
  db = require('../index');

const Student = db.define("student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = Student;