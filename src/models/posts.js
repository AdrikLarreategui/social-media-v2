const mongoose = require('mongoose')
const User = require('../models/users')
const ObjectId = mongoose.Schema.Types.ObjectId
const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required:true,
        // comments: [
        //     {
        //         UserId: { type: ObjectId, ref: 'User'},
        //         comment: String,
        //     },
 //       ],  likes : [{ type: ObjectId }]
    },
}, {timestamps: true})

PostSchema.index({
    name:"text",
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
module.exports = Post