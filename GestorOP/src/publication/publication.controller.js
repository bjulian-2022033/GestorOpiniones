'use strict'

import { checkUpdateP } from '../../utils/validator.js'
import Publication from './publication.model.js'
import User from '../user/user.model.js'
import Comment from '../comment/comment.model.js'

export const savePublication = async(req, res) =>{
    try {

        let data = req.body
        let userId = req.user.id
        data.user = userId

        let user = await User.findOne({ _id: data.user })
        if(!user){

            return res.status(404).send({message: 'User not found'})
        }

        let publication = new Publication(data)
        await publication.save()
        return res.send({message: 'Publication save successfully'})

        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving publication', err})
        
    }
}

export const getP = async (req, res) => {
    try {
        // Obtenemos el id del usuario logueado
        const userId = req.user.id;

        // Buscamos las publicaciones que están asociadas al usuario logueado
        const listOfPublications = await Publication.find({ user: userId })
            .populate({ path: 'user', select: 'name -_id' })
            .populate({ path: 'category', select: 'nameCa -_id' })
            .select('-__v');

        // Obtener los comentarios para cada publicación
        const publicationPromises = listOfPublications.map(async (publication) => {
            const comments = await Comment.find({ publication: publication._id })
                .populate({ path: 'author', select: 'name -_id' })
                .select('-_id -__v -publication');

            return { ...publication.toObject(), comments };
        });

        const publicationsWithComments = await Promise.all(publicationPromises);

        if (publicationsWithComments.length > 0) {
            return res.send({ listOfPublications: publicationsWithComments });
        } else {
            return res.status(404).send({ msg: 'No publications found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Error getting publications' });
    }
}


export const publicationUpdate = async(req, res) =>{
    try {

        let { id } = req.params
        let data = req.body
        let publicationId = req.user.id
        data.user = publicationId

        let publicationE = await Publication.findOne({ _id: id, user: publicationId})

        if(!publicationE){
            return res.status(401).send({ message: 'You need authorization'})
        }

        let updatePublication = await Publication.findOneAndUpdate(
    
            {_id: id},
            data,
            {new: true}

            )
            if(!updatePublication) return res.status(401).send({message: 'Publication not found and not updated'})
            return res.send({message: 'Update publication', updatePublication})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating publication'})
        
    }
}

export const deletePub = async (req, res) => {
    try {
        let { id } = req.params
        let userId = req.user.id

        let publicationEx = await Publication.findOne({ _id: id, user: userId })
        if (!publicationEx) {
            return res.status(404).send({ message: 'You need permission to delete the post' })
        }

        await Comment.deleteMany({ publication: id })

        let deletePost = await Publication.findOneAndDelete({ _id: id })
        if (!deletePost.deleteCount == 0) return res.status(404).send({ message: 'publication not found, not deleted' })
        return res.send({ message: 'Deleted publication successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting publication' })
    }
}