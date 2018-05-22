
const router = require('express').Router()

const {
  registerUser,
  loginUser,
  loginManual
} = require('../controllers/user.controller')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/login/manual', loginManual)

module.exports = router;