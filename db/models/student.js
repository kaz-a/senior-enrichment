const Sequelize = require('sequelize'),
  db = require('../index');

const Student = db.define("student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: './images/profile.png' 
  }
});

module.exports = Student;