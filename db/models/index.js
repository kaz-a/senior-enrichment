'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is required everywhere

// This is also probably a good place for you to set up your associations

const db = require('../index'),
  Student = require('./student'),
  Campus = require('./campus');

Student.belongsTo(Campus);
Campus.hasMany(Student);

db.sync({ force: true })
.then(() => {
  return Promise.all([
    Student.create({ name: "Foo", email: "foo@email.com" }),
    Student.create({ name: "Bar", email: "bar@gmail.com" }),
    Student.create({ name: "Kazz", email: "kazz@email.com" }),
    Campus.create({ name: "Mars", image: "./images/mars.png" }),
    Campus.create({ name: "Luna", image: "./images/luna.png" }),
    Campus.create({ name: "Terra", image: "./images/terra.png" }),
    Campus.create({ name: "Titan", image: "./images/titan.png"})
  ])
})
.then(([student1, student2, student3, campus1, campus2]) => {
  return Promise.all([
    student1.setCampus(campus1),
    student2.setCampus(campus2),
    student3.setCampus(campus2)
  ])   
})
.catch(err => {
  console.log(err);
});


module.exports = {
  Student,
  Campus
}