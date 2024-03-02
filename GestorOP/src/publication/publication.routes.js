'use strict'

import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { deletePub, publicationUpdate, savePublication, getP } from './publication.controller.js'

const api = Router()
api.post('/savePublication',[validateJwt], savePublication)
api.put('/publicationUpdate/:id',[validateJwt], publicationUpdate)
api.delete('/deletePub/:id',[validateJwt], deletePub)
api.get('/getP', [validateJwt], getP)

export default api