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

    if (error) {
        return next(new BadRequestError(500,
            'Đã xảy ra lỗi khi tạo tài khoảng!'))
    }

    if (account.username === req.params.username) {
        return next(new BadRequestError(500,
            'Tên tài khoảng đã tồn tại!'))
    }

    if (account.password.length < 6) {
        return next(new BadRequestError(500,
            'Mật khẩu phải nhiều hơn 5 ký tự!'))
    }

    return res.send(document)

}

