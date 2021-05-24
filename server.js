const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const menuDetailsItemRoutes = require('./routes/api/menuDetailsItem')
const transactionDetailsRoutes = require('./routes/api/transactionDetails')

app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect("mongodb://localhost:27017/menuColl", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/menuDetailsItem', menuDetailsItemRoutes)
app.use('/api/transactionDetails', transactionDetailsRoutes)

app.listen(3000,()=>{
    console.log('Server started on port 3000.');
});