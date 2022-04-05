const express = require('express')
const notebook = require('../controllers/notebook.controller')

module.exports = (app) => {
    const router = express.Router()

    // router.get('/', notebook.findAll)

    app.use('notebook', router)
}