const {Router} = require('express')

const userControl = require('./app/controllers/userControl')

const routes = Router()

routes.get('/users', userControl.list) //return all the users
routes.get('/users/:id', userControl.index) //get one user and his posts by id
routes.post('/users/add', userControl.store) //adds a user into db
routes.put('/users/:id', userControl.update) //used to update data about an user
routes.delete('/users/:id', userControl.delete) //self explanatory



module.exports = routes