const {user, post} = require('../models')
const Sequelize = require('sequelize')

let attributes = [
    'name',
    'pic',
    'bio',
    'gitHub',
    'stackOverflow',
    'linkedIn',
    'instagram',
    'techs',
]

module.exports = {
    async findUsers(req, res) {
        const {
            name,
            techs //array
        } = req.body
        let data = null
        if(name)
        {
            data = await user.findAll({
                attributes,
                where: {
                    name: {
                        [Sequelize.Op.substring]: name
                    }
                },
                include: post
            })
        }
        if(techs)
        {
            data = await user.findAll({
                attributes,
                where: {
                    techs: {
                        [Sequelize.Op.contains]: techs
                    }
                },
                include: post
            })
        }
        return res.json(data)
    },
    async findPosts(req, res) {
        const {
            title,
            tags,
            type
        } = req.body
        let data = null
        if(title)
        {
            data = await post.findAll({
                where: {
                    title: {
                        [Sequelize.Op.substring]: title
                    }
                },
                include: [{model: user, attributes, as: 'user'}]
            })
        }
        if(tags)
        {
            data = await post.findAll({
                where: {
                    tags: {
                        [Sequelize.Op.contains]: tags
                    }
                },
                include: [{model: user, attributes, as: 'user'}]
            })
        }
        if(type)
        {
            data = await post.findAll({
                where: {type},
                include: [{model: user, attributes, as: 'user'}]
            })
        }
        return res.json(data)
    }
}