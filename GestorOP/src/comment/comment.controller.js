'use strict'

import { checkUpdateCo } from '../../utils/validator.js'
import User from '../user/user.model.js'
import Publication  from '../publication/publication.model.js'
import Comment from './comment.model.js'

export const saveComment = async(req, res) =>{
    try {

        let data = req.body
        let authorId = req.user
        data.author = authorId

        //user
        let user = await User.findOne({ _id: data.author })
        if (!user) return res.status(404).send({ message: 'User not found' })

        //publication
        let pub = await Publication.findOne({ _id: data.publication })
        if (!pub) return res.status(404).send({ message: 'Publication not found' })

        //comment
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Comment save successfully'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving comment',err})
        
    }
}

/*export const getCo = async (req, res) =>{
    try {

        let comments = await Comment.find()
        return res.send({ comments })

    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error getting comment'})
        
    }
}*/

export const commentUpdate = async(req, res) =>{
    try {

        let { id } = req.params
        let data = req.body

        let authorId = req.user.id
        data.author = authorId

        let comments = await Comment.findOne({ _id: id, author: authorId})
        if(!comments){
            return res.status(401).send({ message: 'You need authorization'})
        }

        let update = checkUpdateCo(data, id)
        if(!update) return res.satus(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updateComment = await Comment.findOneAndUpdate(
    
            {_id: id},
            data,
            {new: true}

            )
            if(!updateComment) return res.status(401).send({message: 'Comment not found and not updated'})
            return res.send({message: 'Update comment', updateComment})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
        
    }
}

export const deleteC = async( req, res) =>{
    try {

        let { id } = req.params
        let authorId = req.user.id

        let commentE = await Comment.findOne({_id: id, author: authorId})
        if(!commentE){
            return res.status(401).send({ message: 'You need permission to delete the comment'})
        }

        let deletedComment = await Comment.findOneAndDelete({_id: id})
        if(!deletedComment.deleteCount == 0) return res.status(404).send({message: 'Comment not found and not delete'})
        return res.send({message: 'Comment delete successfully'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting Comment'})
    }
}