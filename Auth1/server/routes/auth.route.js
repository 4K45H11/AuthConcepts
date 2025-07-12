const express = require('express')
require('dotenv').config()
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthUser = require('../models/User.model')
const authMiddleware = require('../middleware/auth')
const adminOnly = require('../middleware/admin')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, name, password,role } = req.body
        const existingUser = await AuthUser.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'user already exixsts' })
        }

        const hashedPassowrd = await bycrypt.hash(password, 10)

        const newUser = new AuthUser({ email, name, password: hashedPassowrd,role })

        const savedData = await newUser.save()

        if (savedData) {
            res.status(201).json({ messsage: 'new user added successfully' })
        }


    } catch (error) {
        console.log(error.messsage)
        res.status(500).json({ error: 'server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await AuthUser.findOne({ email })
        //finding user exists or not
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }
        //comparing password
        const isMatch = bycrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }

        //generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({ token })
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: `Welcome user ${req.user.id}`,
        role: req.user.role
    });
});

router.get('/admin', authMiddleware, adminOnly, (req, res) => {
    res.json({
        message: `Welcome Admin ${req.user.id}`,
        role: req.user.role
    });
});

module.exports = router

