const getCurrentUser = async (req, res, next) => {
  const {email, name, avatar} = req.user
  try {
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email,
          name,
          avatar,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentUser
