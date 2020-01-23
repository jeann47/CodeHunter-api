const jwt = require('jsonwebtoken')

module.exports = {
    generateToken(User) {
        return jwt.sign({id: User.id}, "secret", {
            expiresIn: 86400
        })
    },
    generateAdminToken(User) {
        return jwt.sign({id: User.id}, "adminSecret", {
            expiresIn: 86400
        })
    }
}