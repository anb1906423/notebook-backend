const config = {
    app: {
        port: process.env.PORT || 4400,
    },
    db: {
        uri: process.env.MONGODB_URL || 'mongodb://localhost:27017/notebook'
    }
}

module.exports = config