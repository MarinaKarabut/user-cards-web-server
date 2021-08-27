const {Schema, SchemaTypes} = require('mongoose')
const subSchema = require('./adressSubSchema')
const companySubSchema = require('./companySubSchema')

const cardSchema = Schema({
  user: {type: SchemaTypes.ObjectId, ref: 'user'},
  id: {
    type: Number,
    required: [true, 'Id is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  username: {
    type: String,
    required: [true, 'userName is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  website: {
    type: String,
    required: [true, 'Website is required'],
  },
  address: {
    type: subSchema,
    default: {},
  },
  company: {
    type: companySubSchema,
    default: {},
  },
})

module.exports = cardSchema
