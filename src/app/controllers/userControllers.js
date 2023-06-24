

const User = require('../models/user')
const bcrypt = require('bcrypt')

class userControllers {

    async getCurrentUser (req, res) {
        try {
            const user = await User.findById(req.user_id)   
            const {password, ...currentUser} = user
            res.json({code : 200, currentUser})
        } catch (error) {
            res.json({code : 404, message : 'Not Found'})
        }
    }
    async updateAvatar (req, res) {
        try {
            await User.updateOne({ _id: req.user_id }, { URL_Avatar : "http://localhost:8080/" + req.file.path })
            res.json({code : 200, message : 'success'})
        } catch (error) {
            res.json({code : 500, message : 'fail'})
        }
    }
    async deleteAvatar (req, res) {
        try {
            await User.updateOne({ _id: req.user_id }, { URL_Avatar : "" })
            res.json({code : 200, message : 'success'})
        } catch (error) {
            res.json({code : 500, message : 'fail'})
        }
    }
    async updateEmail (req, res) {
        try {
            await User.updateOne({ _id: req.user_id }, { email : req.body.email })
            res.json({code : 200, message : 'success'})
        } catch (error) {
            res.json({code : 500, message : 'fail'})
        }
    }
    async updatePassword (req, res)  {
        const user = await User.findById(req.user_id)
        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!validPassword) {
            res.json({code : 401, message : 'fail'})
        } else {
            try {
                const salt  = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(req.body.newPassword, salt)
                await User.updateOne({ _id: req.user_id }, { password : hashed });
                res.json({code : 200, message : 'success'})
            } catch (error) {
                res.json({code : 500, message : 'fail'})
            }
        }
    }
    async updateProfile (req, res) {
        try {
            await User.updateOne({ _id: req.user_id }, { name: req.body.name, location: req.body.location, bio : req.body.bio, dateOfBirth : req.body.date });
            res.json({code : 200, message : 'success'})
        } catch (error) {
            res.json({code : 500, message : 'fail'})
        }
    }

    async deleteUser (req, res) {
        try {
            await User.deleteOne({ _id: req.user_id });
            res.json({code : 200, message : 'success'})
        } catch (error) {
            res.json({code : 500, message : 'fail'})
        }
    }
}

module.exports = new userControllers