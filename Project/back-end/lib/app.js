
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  test_payload_email: process.env['TEST_PAYLOAD_EMAIL'],
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE WebTech Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

// app.post('/channels', async (req, res) => {
//   const channel = await db.channels.create(req.body)
//   res.status(201).json(channel)
// })

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  // add the id of this channel to the array ChannelBelong of the user
  const user = await db.users.updateUserChannels(channel.id, req.body.userId)
  res.status(201).json(channel)
}) 

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.delete('/channelDelete/:id', async (req, res) => {
  const channel = await db.channels.delete(req.params.id)
  await db.users.deleteUserChannels(channel.id, req.body.userId)
  res.json(channel)
})


app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  try{
    const channel = await db.channels.get(req.params.id)
  }catch(err){
    return res.status(404).send('Channel does not exist.')
  }
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

//invite

app.get('/invite', async (req, res) => {
  const invites = await db.invite.list()
  res.json(invites)
})

app.post('/invite', async (req, res) => {
  const invite = await db.invite.create(req.body.userInvited, req.body.adminUser, req.body.channelId, req.body.channelName)
  res.status(201).json(invite)
})

app.delete('/invite/:id', async (req, res) => {
  const invite = await db.invite.delete(req.params.id)
  res.json(invite)
})

//Others
app.post('/updateChannelBelong', async (req, res) => {
  const user = await db.users.updateUserChannels(req.body.channelId, req.body.userId)
  res.json(user)
})


module.exports = app
