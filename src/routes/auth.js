
const router = require('express').Router()
const authControllers = require('../app/controllers/authControllers')

router.post('/register', authControllers.register)
router.post('/login', authControllers.login)
router.get('/check-username', authControllers.checkUserName)
router.get('/check-email', authControllers.checkEmail)
router.get('/check-token', authControllers.checkToken)

module.exports = router