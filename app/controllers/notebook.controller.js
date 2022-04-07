const mongoose = require('mongoose')
const { BadRequestError } = require('../errors')
const handlePromise = require('../helpers/promise.helper')
const Notebook = require('../models/notebook.model')

exports.create = async (req, res, next) => {
    const notebook = new Notebook ({
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
        words: req.body.words,
        characters: req.body.characters,
        flag: req.body.flag === false,
    })

    const [error, document] = await handlePromise(notebook.save())

    if(error) {
        return next(new BadRequestError(500,
            'An error occurred while creating the note!'))
    }

    return res.send(document)
}

exports.findAll = async (req, res, next) => {
    const condition = {}
    const { name } = req.query
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: 'i' }
    }

    const [error, documents] = await handlePromise(Notebook.find(condition))

    if(error) {
        return next(new BadRequestError(500,
            'An error occurred while retrieving notebooks!'))
    }

    return res.send(documents)
}

exports.findOne = async (req, res, next) => {
    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }
}

