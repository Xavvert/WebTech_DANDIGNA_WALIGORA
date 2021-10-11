
const db = require('./db')
const express = require('express')
const app = express()

// test stash 

app.use(require('body-parser').json())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

app.get('/channels', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

app.put('/channels/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})

// Lets start with the user test by creating it routes 

app.post('/users', async(req, res) => { 
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users', async(req, res) => {
  const user = await db.users.list()
  res.json(user)
})

// lets now create routes for messages 

app.get('/channels/:channelId/messages', async (req, res) => {
  const message = await db.messages.list(req.params.channelId)
  res.json(message)
})


app.post('/channels/:channelId/messages', async (req, res) => {
  // create a message in a specific channel
  const message = await db.messages.create(req.body, req.params.channelId)
  res.status(201).json(message) 
})

module.exports = app
