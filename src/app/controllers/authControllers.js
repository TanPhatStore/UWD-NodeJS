
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authControllers {

    async register (req, res) {
        try {
            const salt  = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            const newUser = await new User ({
                username : req.body.username,
                password : hashed,
                email : req.body.email,
                name : req.body.name,
                dateOfBirth : req.body.dateOfBirth
            })
            const user = await newUser.save()
            res.status(200).json({message : 'success'})
        } catch (error) {
            res.json(error)
        }
    }

    async login (req,res) {
        try {
            const user = await User.findOne({username : req.body.username})
            if (!user) {
                res.json({code : 404, message : 'Login Failed'})
            } else {
                const validPassword = await bcrypt.compare(req.body.password, user.password)
                if (!validPassword) {
                    json.json({code : 404, message : 'Login Failed'})
                } else {
                    const token = jwt.sign({
                        id : user.id,
                        admin : user.admin
                    },'myserectkey', {expiresIn : '1d'})
                    res.status(200).json({token : token})
                }
            }
        } catch (error) {
            res.json({code : 404, message : 'Login Failed'})
        }
    }

    async checkUserName (req, res) {
        const user = await User.findOne({username : req.query.username})
        if (user) {
            res.json({exist : false})
        } else {
            res.json({exist : true})
        }
    }

    async checkEmail (req, res) {
        const user = await User.findOne({email : req.query.email})
        if (user) {
            res.json({exist : false})
        } else {
            res.json({exist : true})
        }
    }

    async checkToken (req, res) {
        const token = req.query.token
        if (token) {
            jwt.verify(token, 'myserectkey', (err, user) => {
                if (err) {
                    res.json({message : false})
                } else {
                    res.json({message : true})
                }
            })
        } else {
            res.json({message : false})
        }
    }
}

module.exports = new authControllers