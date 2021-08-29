// const { tests } = require('../../utils/validationSchemas')
const {cards: service} = require('../../services')

const add = async (req, res, next) => {
  const {body, user} = req
  try {
    // const {id} = body
    // const result = await service.getOne({id})
    // if (result) {
    //   return res.status(409).json({
    //     status: 'error',
    //     code: 409,
    //     message: 'This card already exist',
    //   })
    // }
    body.user = user._id
    const data = await service.add(body)
    res.json({
      status: 'success',
      code: 201,
      data,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
