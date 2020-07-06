const express = require('express')
const app = express()
const port = 3000
var path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log("DB connected")})
.catch((err) => { console.error(err) })

const subscriberRouter = require('./routes/subscribers')
app.use('/subscribers', subscriberRouter)

app.get('*', (req, res) => {
    res.send("wrong route")
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))



// const db = mongoose.connection
// db.on('error', (error) => {
//     console.log(error)
// })
// db.once('open', () => {
//     console.log('connnected to the database')
// })