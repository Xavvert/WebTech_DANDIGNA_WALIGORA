
const supertest = require('supertest')
const microtime = require('microtime')
const app = require('../lib/app')
const db = require('../lib/db')

afterEach( async () => {
  await db.admin.clear()
})
describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Create a user 
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', userId: user.id})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.eql([])
  })
  
  it('list one message', async () => {
    // Create a user 
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', userId: user.id})
    // and a message inside it
    await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({author: 'whoami', content: 'Hello ECE'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([{
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    }])
  })
  
  it('add one element', async () => {
    // Create a user 
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', userId: user.id})
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({author: 'whoami', content: 'Hello ECE'})
    .expect(201)
    message.should.match({
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    messages.length.should.eql(1)
  })
  
  it('access invalid channel', async () => {
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/1234/messages`)
    .expect(404)
  })
  
})
