const express = require('express')
const app = express()
const logger = require('./logger')

//req => middleware => res

app.use(logger)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})


app.listen(5000, () => {
    console.log('server is running on port 5000')
})