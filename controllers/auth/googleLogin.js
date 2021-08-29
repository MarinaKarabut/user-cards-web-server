const {OAuth2Client} = require('google-auth-library')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {nanoid} = require('nanoid')
const {auth} = require('../../utils/validationSchemas')
const {users: service} = require('../../services')

const {REACT_APP_GOOGLE_CLIENT_ID} = process.env
const client = new OAuth2Client(REACT_APP_GOOGLE_CLIENT_ID)

const googleLogin = async (req, res, next) => {
  const {tokenId} = req.body
  try {
    const {error} = await auth.validSchemaAuthGoogle.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad request',
      })
    }
    const result = await client.verifyIdToken({idToken: tokenId, audience: REACT_APP_GOOGLE_CLIENT_ID})
    const {email_verified, email, name, picture} = result.payload
    if (email_verified) {
      let user = await service.getOne({email})
      const {TOKEN_KEY} = process.env

      if (!user) {
        const newUser = await service.add({password: nanoid(), email, name, avatar: picture})
        user = newUser
      }

      const id = user._id
      const payload = {id}
      const token = jwt.sign(payload, TOKEN_KEY)
      await service.update(id, {token})

      res.json({
        status: 'success',
        code: 200,
        data: {
          user: {
            email: user.email,
            name: user.name,
            avatar: user.avatar,
          },
          token,
        },
      })
    } else {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorize',
      })
      return
    }
  } catch (error) {
    next(error)
  }
}

module.exports = googleLogin
