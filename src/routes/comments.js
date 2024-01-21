const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/commentController.js')
//const { authentication } =  require('../middlewares/authentication.js')

//router.post('/', authentication, CommentController.create)
module.exports = router
