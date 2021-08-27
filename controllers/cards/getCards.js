const {cards: service} = require('../../services')

const getCards = async (req, res, next) => {
  const {user} = req
  console.log(user)
  try {
    const cards = await service.getAll({user: user._id})
    res.json({
      status: 'success',
      code: 200,
      data: {
        cards: cards,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCards
