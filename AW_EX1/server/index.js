import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRoute from './routes/user.route.js'


const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send(`<h1>Welcome to Ex 1</h1>`)
})

app.use('/user',userRoute)


await mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log('connected to database!')
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log('Error connecting database.')
    })

