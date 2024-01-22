const Post = require('../models/posts.js')
const User = require('../models/users.js')

const PostController = {
    
    async create (req, res) {
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post)
            
        } catch (error) {
            console.error(error)
            res.starus(500).send({ message: "Ha habido un problema al crear el post"})
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const post = await Post.find()
            .limit(limit)
            .skip(( page -1) * limit)
            res.status(200).send(post)
        } catch(error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema"})
        }
    },

    async getById(req, res) {
        try{
            const post = await Post.findById(req.params._id)
            res.status(200).send(post)
        } catch(error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema con la búsqueda" })
        }
    },

    async getPostByName (req, res) {
        try {
            const post = await Post.find({
                $text: {
                    $search: req.params.name
                },
            })
            res.status(200).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema con la búsqueda" })
        }
    },

    async update(req, res) {
        try{
            const post = await Post.findByIdAndUpdate(
                req.params._id, 
                req.body, 
                {new: true }
                )
            res.status(201).send({ message: "Post actualizado con éxito", post})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema al actualizar el post"})
        }
    },

    async delete (req, res) {
        try{
            const post = await
            Post.findByIdAndDelete(
                req.params._id, 
                req.body, 
                { new: true }
                )
            res.status(201).send({ post, message: "Post eliminado"})
        } catch(error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema al eliminar el post"})
        }
    },
    async insertComment(req, res) {
		try {
			const post = await Post.findByIdAndUpdate(
				req.params._id,
				{
					$push: {
						reviews: { comment: req.body.comment, UserId: req.user._id },
					},
				},
				{ new: true }
			)
			res.send(post)
		} catch (error) {
			console.error(error)
			res.status(500).send({ message: 'Ha habido un problema al insertar el comentario' })
		}
	},

	async like(req, res) {
		try {
			const post = await Post.findByIdAndUpdate(
				req.params.PostId,
				{ $push: { likes: req.user._id } },
				{ new: true }
			)
			await User.findByIdAndUpdate(
				req.user._id,
				//{ $push: { wishList: req.params.productId } },
				{ new: true }
			)
			res.send(post)
		} catch (error) {
			console.error(error)
			res.status(500).send({ message: 'Ha habido un problema' })
		}
	},
}

module.exports = PostController