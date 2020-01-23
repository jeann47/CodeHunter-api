const {user} = require('../models')
const {generateToken, generateAdminToken} = require('../utils')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')

module.exports = {
    async login(req, res) {
        const {login, password} = req.body
        const User = await user.findOne({
            where: {
                [Sequelize.Op.or]: [{login}, {email: login}]
            }
        })
        await bcrypt.compare(password, User.password, async (err, check) => {
            if(check)
            {
                const token = generateToken(User)
                let adminToken = null
                if(User.type) adminToken = generateAdminToken(User)
                return res.json({User, token, adminToken})
            }
            else return res.status(400).send('failed')
        })
    }
}