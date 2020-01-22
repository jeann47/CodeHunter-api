const {user, post} = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    async index(req, res) {
        const {id} = req.params
        const data = await user.findByPk(id, {
            include: post
        })
        return res.json(data)
    },
    async store(req, res) {
        let {name, login, password, bio, email, techs, type} = req.body
        const User = await user.findOne({where: {login}})
        if(!User) 
        {
            await bcrypt.hash(password, 10, async (err, password) => {{
                const data = await user.create({name, login, password, bio, email, techs, type})
                return res.json(data)
            }})
        }
        else return res.send("This login is already taken")
    },
    async list(req, res) {
        const data = await user.findAll({include:post})
        return res.json(data)
    },
    async update(req, res) {
        const {id} = req.params
        const {
            name,
            login,
            password, 
            bio, 
            email, 
            techs, 
            pic, 
            github,
            stackOverflow, 
            linkedIn, 
            instagram, 
            notes
        } = req.body
        let data = null
        if(login) 
        {
            const User = await user.findOne({where: {login}})
            if(!User)
            {
                data = await user.update({login}, {where: {id}})
            }
            else res.status(350)
        }
        if(password)
        {
            const User = await user.findByPk(id)
            await bcrypt.compare(password, User.password)
            .then(async check => {
                if(check) 
                {
                    res.status(350)
                }
                else
                {
                    await bcrypt.hash(password, 10, async (err, password) => {{
                        data = await user.update({password}, {where: {id}})
                    }})
                }
            })
        }
        if(name || pic || bio || techs || email) //user info
        {
            data = await user.update({name, pic, email}, {where: {id}})
        }
        if(github, stackOverflow, linkedIn, instagram) //social info
        {
            data = await user.update({github, stackOverflow, linkedIn, instagram}, {where:{id}})
        }
        if(notes)
        {
            let User = await user.findByPk(id)
            if(!User.notes)
            {
                data = await user.update({notes: [notes]}, {where: {id}})
            }
            else
            {
                User.notes.push(notes)
                data = await user.update({notes: User.notes}, {where: {id}})
            }
        }
        return res.json(data)
    },
    async delete(req, res) {
        const {id} = req.params
        const data = await user.destroy({where: {id}})
        return res.json(data)
    }
}

//will be optimized later