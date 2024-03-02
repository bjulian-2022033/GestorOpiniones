import { Schema, model } from 'mongoose'

const CommentSchema = Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    publication: {
        type: Schema.ObjectId,
        ref: 'publication',
        required: true
    },
    comment:{
        type: String,
        required: true
    },
})

export default model('comment', CommentSchema)