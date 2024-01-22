const Comment = require('../models/comment.js')
const User = require('../models/users.js')
const Post = require('../models/post')

const CommentController = {
    async create (req, res) {
        try {
            const comment = await Comment.create({
                ...req.body,
                UserId: req.user_id
            })
            await User.findByIdAndUpdate(req.user_id, {
                $push: { CommentsIds: comment._id}
            })
            await User.findByIdAndUpdate(req.user._id, {
				$push: { orderIds: order._id },
			})
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el comentario'})
        }
    },
    async update(req, res) {
		try {
			const comment = await Comment.findByIdAndUpdate(
				req.params._id,
				{ ...req.body, UserId: req.user._id },
				{
					new: true,
				}
			)
			res.send({ message: 'Comentario actualizado con éxito', comment })
		} catch (error) {
			console.error(error)
		}
	},
}

module.exports = CommentController