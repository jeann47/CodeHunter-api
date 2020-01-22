## Available Scripts

In the project directory, you can run:

### `yarn server`

Runs the app in the development mode.<br />
Use [http://localhost:3333](http://localhost:3333).

if the console logs you 'we are working fine' and the get request in root '/' returns an json object with working: true, you know thats working fine

**sequelize**

### `yarn sequelize`

List the commands for [sequelize-cli](https://github.com/sequelize/cli)

### Routes
**baseURL = http://localhost:3000**
# `Users`

## Get
 - `/users` -> list all the users
 - `/users/:id` -> find one user by id and all his posts

 - `/search/users` -> find all users mathing by name (pass as string in body) or techs (pass as array in body)

## Post
 - `/users/add` -> used to add one user, hashing password and checking login
 
## Put
- `/users/:id` -> used to update personal info about the user by his id by params and changes by body

## Delete
- `/users/:id` -> used to delete a user by his id


# `Posts`

## Get
 - `/posts` -> list all the posts
 - `/posts/:id` -> find one post by id and who wrote it

 - `/search/posts` -> find all posts mathing by title or type (pass as string in body) or tags (pass as array in body)

## Post
 - `/posts/add` -> used to add one post, userId required
 
## Put
- `/posts/:id` -> used to update the info and body of a post by his id by params and changes by body

## Delete
- `/posts/:id` -> used to delete a post by his id



