'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js'
import { generateJwt } from '../../utils/jwt.js'


export const register = async (req, res) => {
    try {

        let data = req.body
        data.password = await encrypt(data.password)

        let user = new User(data)
        await user.save()

        return res.send({ message: 'Registered successfully' })

    } catch (err) {
        console.error(err)
        return res.send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {

        let { phone, email, username, password } = req.body

        let user = await User.findOne({ $or: [{ username }, { email }, { phone }] })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }

            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login', err})
    }
}

export const update = async (req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let { oldPassword, newPassword } = req.body

        let user = await User.findById(id)
        if (!user) return res.status(404).send({ message: 'User not found' })

        let passwordC = await checkPassword(oldPassword, user.password)
        if (!passwordC) {
            return res.status(401).send({ message: 'old password does not match' })
        }

        data.password = await encrypt(newPassword)

        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or mising data' })



        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Update user', updatedUser })

    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already token` })
        return res.status(500).send({ message: 'Error updating account' })

    }
}