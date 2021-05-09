const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/menuDetailsItem')

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

app.use('/api/menuDetailsItem', bucketListItemRoutes)

app.listen(3000,()=>{
    console.log('Server started on port 3000.');
});