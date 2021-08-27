const {Schema} = require('mongoose')

const geoSchema = Schema({
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
})

module.exports = geoSchema
