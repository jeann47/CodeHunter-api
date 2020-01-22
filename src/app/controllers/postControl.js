const {user, post} = require('../models')

module.exports = {
    async index(req, res) {
        const {id} = req.params
        const data = await post.findByPk(id, {
            include: user
        })
        return res.json(data)
    },
    async store(req, res) {
        const {userId, title, mainImg, texts, tags, type} = req.body
        const data = await post.create({userId, title, mainImg, texts, tags, type})
        return res.json(data)
    },
    
}