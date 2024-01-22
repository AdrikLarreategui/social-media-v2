const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')


const { authentication } = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/logout', authentication, userController.logout)
router.get('/info', authentication, userController.getInfo)

module.exports = router
