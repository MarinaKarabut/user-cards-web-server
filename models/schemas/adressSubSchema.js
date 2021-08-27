const {Schema} = require('mongoose')
const subSchema = require('./geoSubSchema')

const adressSchema = Schema({
  street: {
    type: String,
  },
  suite: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  geo: {
    type: subSchema,
    default: {},
  },
})

module.exports = adressSchema
