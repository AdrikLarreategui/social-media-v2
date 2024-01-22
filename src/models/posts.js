const mongoose = require('mongoose')
//const User = require('./users')
const CommentId = mongoose.Schema.Types.CommentId
const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required:true,
        comments: [
            {
                UserId: { type: CommentId, ref: 'User'},
                comment: String,
            },
        ],  likes : [{ type: CommentId }]
    },
}, {timestamps: true})

PostSchema.index({
    name:"text",
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post