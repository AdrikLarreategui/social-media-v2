const mongoose = require('mongoose')
const PostId = mongoose.Schema.Types.PostId
const PostSchema = new mongoose.Schema({
    // commentNumber: {
    //     type: Number,
    //     required: true,
    // },
    body: {
        type: String,
        required:true,
    },
    tokens: [],
}, {timestamps: true})

PostSchema.index({
    name:"text",
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
