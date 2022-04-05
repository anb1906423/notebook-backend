const express = require('express')
const cors = require('cors')

const setupNotebookRouters = require('./app/routes/notebook.routes')
const { BadRequestError, errorHandler } = require('./app/errors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Welcome to homepage!!')
})

setupNotebookRouters(app)

app.use((req, res, next) => {
    next(new BadRequestError(404, 'Resource not found'))
})

app.use((err, req, res, next) => {
    errorHandler.handleError(err, res)
})

module.exports = app