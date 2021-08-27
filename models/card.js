const {model} = require('mongoose')

const {cardSchema} = require('./schemas')

const Card = model('card', cardSchema)

module.exports = Card
