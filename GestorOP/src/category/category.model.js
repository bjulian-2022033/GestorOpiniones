import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    nameCa: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model('category', categorySchema)