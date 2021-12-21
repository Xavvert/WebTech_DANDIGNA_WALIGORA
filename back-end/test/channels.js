
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

afterEach( async () => {
  await db.admin.clear()
})
describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  describe( 'list', () => {
  
    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.eql([])
    })
    
    it('list one element', async () => {
      // Create a user 
      const {body: user} = await supertest(app)
      .post('/users')
      .send({username: 'user_1'})
      .expect(201)
      // Create a channel
      await supertest(app)
      .post('/channels')
      .send({name: 'channel 1', userId: user.id})
      // Ensure we list the channels correctly
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1'
      }])
    })
    
  })
  
  it('create one element', async () => {
    // Create a user 
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', userId: user.id})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1',
      userId: /^\w+-\w+-\w+-\w+-\w+$/
    })
    // Check it was correctly inserted in the channel
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
    // Check if the user belongs to the channel he created 
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      username: 'user_1',
      channelsBelong:[/^\w+-\w+-\w+-\w+-\w+$/]
    }])
  })
  
  it('get channel', async () => {
    // Create a user 
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', userId: user.id})
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .get(`/channels/${channel1.id}`)
    .expect(200)
    channel.name.should.eql('channel 1')
  })
  
})
