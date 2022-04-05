const mongoose = require('mongoose')

const schema = mongoose.Schema (
    {
         title: String,
         content: String,
         createdAt: Date,
         lastModified: Date,
         favorite: Boolean,
         words: {
             type: DataType.Integer,
         },
         characters: {
             type: DataType.Integer,
         },
    },
    {
        username: String,
        password: String,
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