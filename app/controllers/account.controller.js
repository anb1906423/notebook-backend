const mongoose = require('mongoose')
const { BadRequestError } = require('../errors')
const handlePromise = require('../helpers/promise.helper')
const Account = require('../models/account.model')

exports.create = async (req, res, next) => {
    
    const account = new Account({
        username: req.body.username,
        password: req.body.password,
    })

    const [error, document] = await handlePromise(account.save())

    if(error) {
        return next(new BadRequestError(500,
            'An error occurred while creating the note!'))
    }

    return res.send(document)

}

