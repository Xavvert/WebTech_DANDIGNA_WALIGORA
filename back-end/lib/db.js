
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: async (id) => {
      db.del(`channels:${id}`, function(err) {
        if(err) {
          console.log("error")
        }
      })
      return {id: id}
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content,
        id: uuid()
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    update: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      if(!message.creation) throw Error('Invalid message')
      await db.put(`messages:${channelId}:${message.creation}`, JSON.stringify({
        author: message.author,
        content: message.content,
        id: uuid()
      }))
      return merge(message, {channelId: channelId})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    delete: async (channelId, creation) => {
      const data = await db.del(`messages:${channelId}:${creation}`)
      console.log(data)
      return "deleted"
    },
  },
  
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      user.channelsBelong = []
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})  
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    updateUserChannels: async (channelId, userId) => {
      if(!userId) throw Error('Invalid id')
      if(!channelId) throw Error('Invalid id')
      const data = await db.get(`users:${userId}`)
      const user = JSON.parse(data)
      user.channelsBelong.push(channelId) 
      await db.put(`users:${userId}`, JSON.stringify(user))
    },
    deleteUserChannels: async (channelId, userId) => {
      if(!userId) throw Error('Invalid id')
      if(!channelId) throw Error('Invalid id')
      const data = await db.get(`users:${userId}`)
      const user = JSON.parse(data)
      user.channelsBelong = user.channelsBelong.filter(channel => channel != channelId )
      await db.put(`users:${userId}`, JSON.stringify(user))
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  invite: {
    list: async () => {
      return new Promise( (resolve, reject) => {
        const invites = []
        db.createReadStream({
          gt: "invite:",
          lte: "invite" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          invite = JSON.parse(value)
          invite.id = key.split(':')[1]
          invites.push(invite)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(invites)
        })
      })
    },
    create: async (userInvited, adminUser, channelId, channelName) => {
      if(!userInvited) throw Error('Invalid id')
      if(!adminUser) throw Error('Invalid id')
      if(!channelId) throw Error('Invalid id')
      if(!channelName) throw Error('Invalid id')
      const id = uuid()
      const invite = {
        userInvited: userInvited,
        adminUser: adminUser,
        channelId: channelId,
        channelName: channelName
      }
      await db.put(`invite:${id}`, JSON.stringify(invite))
      return merge(invite, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`invite:${id}`)
      const invite = JSON.parse(data)
      return merge(invite, {id: id})
    },
    delete: async (id) => {
      db.del(`invite:${id}`, function(err) {
        if(err) {
          console.log("error")
        }
      })
      return {id: id}
    }
    
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
