const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/commentController.js')
//const { authentication, isAuthor } =  require('../middlewares/authentication.js')

// router.post('/', authentication, CommentController.create)
router.put('/id/:_id', authentication, isAuthor, OrderController.update)
module.exports = router
