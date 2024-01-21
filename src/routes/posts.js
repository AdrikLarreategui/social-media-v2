const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController.js')
//const { authentication, isAdmin } = require('../middlewares/authentication.js')
//const { authentication, isAdmin } = require('../middlewares/authentication.js')

router.post('/', PostController.create)
router.put('/:_id', PostController.update)
router.delete('/:_id', PostController.delete)
router.get('/.', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.get('/name/:name', PostController.getPostByName)

module.exports = router

//router.post('/', authentication, isAdmin, PostController.create)
//router.put('/:_id', authentication, PostController.update)
//router.delete('/:_id', authentication, PostController.delete)
// router.get('/getAll.', PostController.getAll)
// router.get('/getById/:_id', PostController.getById)
// router.get('/name/:name', PostController.getPostByName)
//router.put('/posts/:_id', authentication, PostController.insertPost)
//router.put('/comments/:postId', authentication, PostController.comment)
// router.put('/reviews/:_id', authentication, productController.insertComment)
// router.put('/like/:productId', authentication, productController.like)

