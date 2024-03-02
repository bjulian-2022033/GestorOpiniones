import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type:String,
        required: true
    },
    surname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phone: {
        type: Number,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    publication: {
        type: Schema.ObjectId,
        ref: 'publications'
    }
})

export default model('user', userSchema)