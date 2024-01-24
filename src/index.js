const express = require('express')
const app = express()
const { dbConnection } = require('./config/config.js')
const { typeError }= require('./middlewares/errors.js');

require('dotenv').config()

app.use(express.json())

dbConnection()

app.use('/users', require('./routes/users.js'))
app.use('/posts', require('./routes/posts.js'))

app.use(typeError)

app.listen(process.env.PORT, () => console.log(`Servers started at port ${process.env.PORT}`))
