const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

module.exports = {
    authentication (req, res, next){
        const { apptoken } = req.headers

        jwt.verify(apptoken, process.env.JWTSECRET, (err) => {
            if(err){
                return res.status(403).json({
                    message: 'Invalid token'
                })
            }else{
                next()
            }
        })
    },

    authorization (req, res, next){
        const { apptoken } = req.headers
        const status = jwt.decode(apptoken, process.env.JWTSECRET)

        if(status.id==req.params.id){
            next()
        }else{
            return res.status(200).json({
                message: 'Your access user not match'
            })
        }
    }
}