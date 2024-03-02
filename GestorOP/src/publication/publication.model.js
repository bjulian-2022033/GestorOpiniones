'use strict'

import { Schema, model } from 'mongoose'

const publicationSchema = Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category:{
        type: Schema.ObjectId,
        required: true
    },
    principalText:{
        type: String,
        required: true
    },
    comments:{
        type: Schema.ObjectId,
        ref: 'comment'
    }
})

export default model('publication', publicationSchema)