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
api.post("/students", (req, res, next) => {
  Student.create(req.body)
  .then(data => {
    console.log(req.body)
    res.send(data)
  })
  .catch(next);
})


api.post("/campuses", (req, res, next) => {
  Campus.create(req.body)
  .then(data => {
    res.send(data)
  })
  .catch(next);
})

// DELETE api/students/:id
api.delete("/students/:id", (req, res, next) => {
  Student.destroy({ where: { id: +req.params.id }})
  .then(data => {
    res.sendStatus(204)
  })
  .catch(next);
})

// DELETE api/campuses/:id
api.delete("/campuses/:id", (req, res, next) => {
  Campus.destroy({ where: { id: +req.params.id }})
  .then(data => {
    res.sendStatus(204)
  })
  .catch(next);
})


module.exports = api



