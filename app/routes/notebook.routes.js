const express = require('express')
const notebooks = require('../controllers/notebook.controller')
const accounts = require('../controllers/account.controller')

module.exports = (app) => {
    const router = express.Router()

    router.get('/', notebooks.findAll)

    router.post('/', notebooks.create)

    router.post('/log-up', accounts.create)

    router.delete('/', notebooks.deleteAll)

    router.get('/flag', notebooks.findAllFlag)

    router.get('/:id', notebooks.findOne)

    router.put('/:id', notebooks.update)

    router.delete('/:id', notebooks.delete)

    app.use('/api/notebooks', router)
}