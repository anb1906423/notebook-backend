const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            default: '',
            maxLength: 100,
        },
        content: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        words: {
            type: String,
            default: 0,
        },
        characters: {
            type: String,
            default: 0,
        },
        flag: Boolean,
    },
    {
        timestamps: true,
    }
)

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('notebook', schema)