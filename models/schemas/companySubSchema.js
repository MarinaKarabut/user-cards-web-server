const {Schema} = require('mongoose')

const companySchema = Schema({
  name: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  bs: {
    type: String,
  },
})

module.exports = companySchema
