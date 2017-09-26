'use strict'
const api = require('express').Router()
const db = require('../db'),
  models = require('../db/models'),
  Student = models.Student,
  Campus = models.Campus;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))


// GET api/students
api.get("/students", (req, res, next) => {
  Student.findAll({ 
    include: [ Campus ],
    order: [ "id" ] 
  })
  .then(data => {
    res.send(data)
  })
  .catch(next);
})

// GET api/campuses
api.get("/campuses", (req, res, next) => {
  Campus.findAll({ include: [ Student ] })
  .then(data => {
    res.send(data);
  })
  .catch(next);
})

// GET api/students/:id
api.get("/students/:id", (req, res, next) => {
  Student.findById(+req.params.id)
  .then(data => {
    res.send(data)
  })
  .catch(next);
})

// GET api/campuses/:id
api.get("/campuses/:id", (req, res, next) => {
  Campus.findById(+req.params.id, { include: [ Student ]})
  .then(data => {
    res.send(data)
  })
  .catch(next);
})

// POST api/student
api.post("/api/students", (req, res, next) => {
  // Student.create(req.body)
  // .then(data => {
  //   res.send(data)
  // })
  // .catch(next);

  Student.create({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(student => {
    console.log("student created:", student)
    res.send(student)
  })
  .catch(next)

  // Author.findOrCreate({
  //   where: {
  //     name: req.body.name || 'Cody'
  //   }
  // })
  // .spread(author => {
  //   const message = Message.build(req.body);
  //   message.setAuthor(author, { save: false });
  //   return message.save()
  //     .then(message => {
  //       message = message.toJSON();
  //       message.author = author;
  //       return message;
  //     });
  // })
  // .then(message => {
  //   res.json(message);
  // })
  // .catch(next);

})

// DELETE api/students/:id
api.delete("/api/students/:id", (req, res, next) => {
  Task.destroy({ where: { id: req.params.id }})
  .then((result) => {
    console.log("deleting...", result)
    res.sendStatus(204)
  })
  .catch(next);
});



module.exports = api



