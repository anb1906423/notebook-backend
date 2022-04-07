const express = require('express')
const notebooks = require('../controllers/notebook.controller')
const accounts = require('../controllers/account.controller')

module.exports = (app) => {
    const router = express.Router()

    router.post('/log-up', accounts.create)

    router.post('/', notebooks.create)

    router.get('/', notebooks.findAll)

    app.use('/api/notebooks', router)
}