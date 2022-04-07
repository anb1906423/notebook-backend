const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username cannot be empty!'],
        },
        password: {
            type: String,
            required: [true, 'Password cannot be empty!'],
        },
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

module.exports = mongoose.model('account', schema)