const express = require('express')

const server = express();

const PORT = 3000

server.get('/', (req, res) => {
    res.send('welcome to your very first Express API')
})
server.get('/greeting', (req, res) => {
    res.send('awfa my guy, how you dey')
})
server.get('/salute', (req, res) => {
    res.send('boohoohahaha')
})

server.listen(PORT, () => {
    console.log('Express server is running ...')
})