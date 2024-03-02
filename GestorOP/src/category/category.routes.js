'use strict'

import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { get,categoryUpdate, deleteCA, saveCategory } from './category.controller.js'

const api = Router()
api.post('/saveCategory', saveCategory)
api.put('/categoryUpdate/:id', categoryUpdate)
api.delete('/deleteCA/:id', deleteCA)
api.get('/get', [ validateJwt ], get)

export default api