// const express = require("express")
// const app = express()
// const dotenv = require("dotenv")
// dotenv.config()
// const mongoose = require("mongoose")
// const cors = require("cors")

// app.use(cors())
// app.use(express.json())

// const { dbURL } = require('./config/dbConfig')
// const userRoutes = require('./routes/router')

// app.get('/', (req, res) => {
//     res.send("<h1>welcome to server</h1>")
// })

// app.use('/', userRoutes)

// mongoose.connect(dbURL, {

//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,

// })

// const PORT = process.env.PORT || 8000

// app.listen(PORT, () => console.log(`App running in port ${PORT}`))

const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/router')
const { dbURL } = require('./config/dbConfig')

app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send("<h1>welcome server</h1>")
})

mongoose.connect(dbURL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log('App running port ' + PORT))