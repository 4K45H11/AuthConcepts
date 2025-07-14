import { User } from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
import authMiddleware from "../../../Auth1/server/middleware/auth.js";
dotenv.config()

const router = express.Router()

router.post('/register',async(req,res)=>{
    try {
        const {name,email,password,role} = req.body
        const exist = await User.findOne({email})
        if(exist){
            return res.status(409).json({error: 'User already exists'})
        }
        const hasedPassword = await bcrypt.hash(password,10);

        const newUser = new User({name,email,password: hasedPassword,role})

        const savedData = await newUser.save()

        if(savedData){
            res.status(201).json({message:'new user'})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/login', async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:'Invalid Email'})
        }

        const isMatch = bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:'Invalid Password'})
        }

        //token generation
        const token  = jwt.sign(
            {id:user._id,role: user.role, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.status(200).json({token})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/dashboard',authMiddleware,(req,res)=>{
    res.json({
        message: `welcome ${req.user.name}`,
        id: req.user.id,
        role: req.user.role,
    })
})

export default router;
