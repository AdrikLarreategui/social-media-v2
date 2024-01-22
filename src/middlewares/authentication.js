const User = require('../models/users.js')
const Post = require('../models/posts.js')
//const Comment = require('../models/comments.js')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const payload = jwt.verify(token, jwt_secret)
        const user = await User.findOne({ _id: payload._id, tokens: token })
        if(!user) {
            return res.status(401).send({ message: 'No estás autorizado'})
        }
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token'})
    }
}

const isAdmin = async (req, res, next) => {
	const admins = ['admin', 'superadmin']

	if (!admins.includes(req.user.role)) {
		return res.status(403).send({message: 'No tienes permiso'})
	}
	next()
}

const isAuthor = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id)
        if(post.UserId.toString() !== req.user._id.toString()) {
            res.status(403).send({ message: 'No puedes cambiar este comentario' })
        }
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send ({ error, message: 'Ha habido un problema'})
    }
}

module.exports = { authentication, isAdmin, isAuthor}

