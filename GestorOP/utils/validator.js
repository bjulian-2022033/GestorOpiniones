//Encriptar, validar... diferentes datos

import { compare, hash } from 'bcrypt'

export const encrypt = async (password) => {
    try {
        return await hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}


export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId) => {
    if (userId) {
        if (
            Object.entries(data).length === 0 ||
            data.password == ''
        ) return false
        return true
    }
}

export const checkUpdateP = async (data, publicationId) => {
    if (publicationId) {
        if (Object.entries(data).length === 0 || data.comments || data.comments == '') {
            return false
        }
        
        return true

    } else {

        return false
    }
}

export const checkUpdateCo = async (data, commentId) => {
    if (commentId) {
        if (Object.entries(data).length === 0 || data.publication || data.publication == '') {

            return false
        }

        return true

    } else {

        return false
    }
}