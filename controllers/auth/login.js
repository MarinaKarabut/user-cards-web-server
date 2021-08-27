const jwt = require('jsonwebtoken')
require('dotenv').config()

const {users: service} = require('../../services')
const {auth} = require('../../utils/validationSchemas')

const login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const {error} = auth.validSchemaAuth.validate({email, password})
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad request',
      })
    }
    const user = await service.getOne({email})
    if (!user || !user.validatePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect email or password',
      })
      return
    }
    const id = user._id
    const payload = {id}
    const {TOKEN_KEY} = process.env

    const token = jwt.sign(payload, TOKEN_KEY)
    await service.update(id, {token})

    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email: user.email,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
