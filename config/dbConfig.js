const mongodb = require("mongodb")
const dbName = process.env.DB_NAME
const dbURL = `${process.env.DB_URL}/${dbName}`

module.exports = { mongodb, dbURL }