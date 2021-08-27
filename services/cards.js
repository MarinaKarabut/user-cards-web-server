const {Card} = require('../models')

const getAll = (filter = {}) => {
  return Card.find(filter)
}

const getOne = filter => {
  return Card.findOne(filter)
}

const add = body => {
  return Card.create(body)
}

const getById = body => {
  return Card.findById(body)
}

module.exports = {
  add,
  getOne,
  getAll,
  getById,
}
