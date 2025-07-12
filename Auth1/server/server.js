const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/auth.route')

const app = express()

app.use(cors())
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('Api is running...')
})
app.use('/auth',authRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('database connected')
    app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`))
})
.catch((err)=>console.log('Db Error',err.message))
