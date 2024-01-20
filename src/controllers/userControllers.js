const User = require('../models/users.js')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const userController = {
    create(req, res, next) {
        const { name, email, password } = req.body
        if(!name || !email || password) {
            return res.status(400).send('Por favor, completa todos los campos')
        }
        const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 10): undefined
        if(hashedPassword === undefined) {
        return res.status(400).send('Contraseña requerida')
        }
    },

    async register (req, res) {
        try {
            const user = await User.create({ ...req.body, role:'user'})
            res.status(201).send({message: 'Usuario registrado con éxito', user})
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'Error al registar el usuario'})
        }
    },

    async login(req, res) {
		try {
			const user = await User.findOne({
				email: req.body.email,
			})
			const token = jwt.sign({ _id: user._id }, jwt_secret)

			if (user.tokens.length > 4) user.tokens.shift()

			user.tokens.push(token)
			await user.save()

			res.send({ message: 'Bienvenid@ ' + user.name, token })
		} catch (error) {
			console.error(error)
		}
	},

    async logout (req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            })
            res.send({ message:"Usuario desconectado con éxito" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ 
                message: "Ha habido un problema con la desconexión del usuario"
            })
        }
    }
}

module.exports = userController