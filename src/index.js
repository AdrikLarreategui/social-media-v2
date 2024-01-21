const express = require('express')
const app = express()
const PORT = 3000
const { dbConnection } = require('./config/config.js')
app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users.js'))
// app.use('/posts', require('./routes/post.js'))
// app.use('/comments', require('./routes/comment.js'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

// const express = require('express')
// const app = express()
// const { typeError } = require('./middlewares/errors')
// require('dotenv').config()

// const PORT = process.env.PORT || 3001

// const { dbConnection } = require('./config/config')

// app.use(express.json())

// dbConnection()

// app.use('/products', require('./routes/products'))
// app.use('/users', require('./routes/users'))
// app.use('/orders', require('./routes/orders'))

// app.use(typeError)

// app.listen(PORT, () => console.log(`http://localhost:${PORT}`))