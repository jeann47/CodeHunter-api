const {user, post} = require('../models')

module.exports = {
    async index(req, res) {
        const {id} = req.params
        const Post = await post.findByPk(id, {include: [{model: user, as: 'user'}]})
        return res.json(Post)
    },
    async store(req, res) {
        const {userId, title, mainImg, images, texts, videoLink, tags, type} = req.body
        const data = await post.create({userId, title, mainImg, images, texts, videoLink, tags, type})
        return res.json(data)
    },
    async list(req, res) {
        const Post = await post.findAll({include: [{model: user, as: 'user'}]})
        return res.json(Post)
    },
    async update(req, res) {
        const {id} = req.params
        const {
            title,
            mainImg,
            images, //objet {image: {index, link}}
            texts, //objet {text: {index, content}}
            videoLink,
            tags,
            type
        } = req.body
        let data = null
        {
            if(title)
            {
                data = await post.update({title}, {where: {id}})
            }
            if(tags)
            {
                data = await post.update({tags}, {where: {id}})
            }
            if(type)
            {
                data = await post.update({type}, {where: {id}})
            }
        } //post info
        {
            if(videoLink)
            {
                data = await post.update({videoLink}, {where: {id}})
            }
            if(mainImg)
            {
                data = await post.update({mainImg}, {where: {id}})
            }
            if(images)
            {
                let Post = await  post.findByPk(id)
                Object.entries(images).map(i =>{
                    const {index, link} = i[1]
                    Post.images[index] = link
                })
                data = await post.update({images: Post.images}, {where: {id}})
            }
            if(texts)
            {
                let Post = await  post.findByPk(id)
                Object.entries(texts).map(t =>{
                    const {index, content} = t[1]
                    Post.texts[index] = content
                })
                data = await post.update({texts: Post.content}, {where: {id}})
            }
        } //post body
        return res.send(data)
    },
    async delete(req, res) {
        const {id} = req.params
        const data = await post.destroy({where: {id}})
        return res.json(data)
    }
}

//will be optimised later