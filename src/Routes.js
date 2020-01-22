const {Router} = require('express')

const userControl = require('./app/controllers/userControl')
const postControl = require('./app/controllers/postControl')
const SearchControl = require('./app/controllers/SearchControl')
const loginControl = require('./app/controllers/loginControl')
const youtubeControl = require('./app/controllers/youtubeApiControl')

const routes = Router()

/////Users routes/////
routes.get('/users', userControl.list) //return all the users
routes.get('/users/:id', userControl.index) //get one user and his posts by id
routes.post('/users/add', userControl.store) //adds a user into db
routes.put('/users/:id', userControl.update) //used to update data about a user
routes.delete('/users/:id', userControl.delete) //self explanatory
/////Posts routes/////
routes.get('/posts', postControl.list) //return all the users
routes.get('/posts/:id', postControl.index) //get one postand the user who wrote it by post id
routes.post('/posts/add', postControl.store) //adds a post into db, have to beare a userId
                                            //will be in the route params of front end at admin page
routes.put('/posts/:id', postControl.update) //used to update data about a post
routes.delete('/posts/:id', postControl.delete) //self explanatory
/////Search routes/////
routes.get('/search/users', SearchControl.findUsers) //find all users by name or techs
routes.get('/search/posts', SearchControl.findPosts) //find all posts by title, tags or type

routes.post('/login', loginControl.login) //can use email or login

routes.post('/youtube', youtubeControl.list) //return the items of the youtube api, still need to handle pagination



module.exports = routes