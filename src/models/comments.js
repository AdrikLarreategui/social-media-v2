const mongoose = require ('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
    {
    status: String,
    UserId: {
        type: ObjectId,
        ref: 'User'
    },
    PostsId: [{ type: ObjectId, ref: 'Post'}]
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment