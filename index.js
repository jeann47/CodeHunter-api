const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./src/Routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use(routes)

console.log('we are working fine.')

app.listen(3333)