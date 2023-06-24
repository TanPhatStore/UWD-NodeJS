
const User = require('../models/user')
const jwt = require('jsonwebtoken')

class middlewareControllers {

    async verifyToken (req, res, next) {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, 'myserectkey', (err, user) => {
                if (err) {
                    res.json({code : 403, message : "Token is not valid"})
                } else {
                    req.user_id =  user.id
                    next()
                }
            })
        } else {
            res.json({code : 401, message : "You 're not authentication"})
        }
    } 

}

module.exports = new middlewareControllers