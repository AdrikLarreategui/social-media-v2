const mongoose = require ('mongoose')
const CommentId = mongoose.SchemaTypes.CommentId

const CommentSchema = new mongoose.Schema(
    {
    status: String,
    UserId: {
        type: CommentId,
        ref: 'User'
    },
    deliveryDate: Date,
    PostId: [{ type: CommentId, ref: 'Post'}]
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment