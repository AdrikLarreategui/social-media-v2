const Post = require('../models/post.js')
const User = require('../models/users.js')

const PostController = {
    create (req, res) {
        const { body } = req.body
        if (!body) {
            return res.status(400).send('Por favor, escribe algo en el campo correspondiente')
        }
    },
    // async create (req, res) {
    //     try {
    //         const post = await Post.create(req.body)
    //         res.status(201).send(post)
            
    //     } catch (error) {
    //         console.error(error)
    //         res.starus(500).send({ message: "Ha habido un problema al crear el post"})
    //     }
    // },
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

    // async getPostByName (req, res) {
    //     try {
    //         if (req.params.name.length>40) {
    //             return res.status(400).send('Búsqueda demasiado larga')
    //         }
    //         const name = new RegExp(req.params.name, "i")
    //         const post = await Post.find({ name })
    //         res.send(post)
    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).send({ message: "Ha habido un problema con la búsqueda"})
    //     }
    // }, 

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
            Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: "Post eliminado"})
        } catch(error) {
            console.error(error)
            res.status(500).send({ message: "Ha habido un problema al eliminar el post"})
        }
    },
    
}

module.exports = PostController