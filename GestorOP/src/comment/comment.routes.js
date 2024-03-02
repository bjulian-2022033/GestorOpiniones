'use strict'

import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { deleteC, commentUpdate, saveComment } from './comment.controller.js'

const api = Router()
api.post('/saveComment', [validateJwt],saveComment)
api.put('/commentUpdate/:id',[validateJwt], commentUpdate)
api.delete('/deleteC/:id', [validateJwt], deleteC)

export default api