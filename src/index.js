const express = require('express')
const app = express()
const PORT = 3000
const { dbConnection } = require('./config/config.js')
app.use(express.json())
dbConnection()

// app.use('/users', require('./routes/users.js'))
// app.use('/posts', require('./routes/post.js'))
// app.use('/comments', require('./routes/comment.js'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))