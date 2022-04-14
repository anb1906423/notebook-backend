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
        flag: req.body.flag === true,
    })

    const [error, document] = await handlePromise(notebook.save())

    if(error) {
        return next(new BadRequestError(500,
            'Đã xảy ra lỗi khi tạo ghi chú! (＞︿＜)'))
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
            'Đã xảy ra lỗi khi truy xuất ghi chú! (＞︿＜)'))
    }

    return res.send(documents)
}

exports.findOne = async (req, res, next) => {
    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(Notebook.findOne(condition))

    if (!document) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi truy xuất ghi chú có id=${req.params.id}`))
    }

    if (!document) {
        return next(new BadRequestError(404, 'Không tìm thấy ghi chú!'))
    }

    return res.send(document)
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400,
            'Dữ liệu không được để trống!'))
    }

    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        Notebook.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật ghi chú có id=${req.params.id}`))
    }

    if (!document) {
        return next(new NotFoundError(404,
            'Không tìm thấy ghi chú'))
    }

    return res.send({ message: 'Cập nhật ghi chú thành công!', })
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const  condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        Notebook.findOneAndDelete(condition)
    )

    if (error) {
        return next(new BadRequestError(500,
            `Không thể xóa ghi chú có id=${req.params.id}`))
    }

    if (!document) {
        return next(new BadRequestError(404, 'Không tìm thấy ghi chú'))
    }

    return res.send({ message: 'Xóa ghi chú thành công!', })
}

exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handlePromise(
        Notebook.deleteMany({ })
    )

    if (error) {
        return next(new BadRequestError(500,
            'Đã xảy ra lỗi khi xóa tất cả ghi chú!'))
    }

    return res.send({
        message: `Đã xóa thành công tất cả(${data.deletedCount}) ghi chú!`,
    })
}

exports.findAllFlag = async (req, res, next) => {
    const [error, documents] = await handlePromise(
        Notebook.find({ flag: true, })
    )

    if (error) {
        return next(new BadRequestError(500,
            'Đã xảy ra lỗi khi truy xuất ghi chú có gắn cờ!'))
    }

    return res.send(documents)
}

