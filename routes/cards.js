const express = require('express')

const {useAuth} = require('../middleware')

const {cards: ctrl} = require('../controllers')

const router = express.Router()

router.post('/', useAuth, express.json(), ctrl.add)
router.get('/', useAuth, ctrl.getCards)

module.exports = router
