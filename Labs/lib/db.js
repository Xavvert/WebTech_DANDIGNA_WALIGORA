
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

// const store =  {
//   channels: {
//   },

//   users: {
//   },
// }


const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: { 
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      id = uuid()
      //store.channels[id] = channel
      
      await db.put(`channels:${id}`, JSON.stringify(merge(channel, {id: id}, {messages: []})))
      return merge(channel, {id: id})
    },
    list: async () => {
    //   return Object.keys(store.channels).map( (id) => {
    //     const channel = clone(store.channels[id])
    //     channel.id = id
    //     return channel
    //   })
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
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  admin: {
    clear: async () => {
      //store.channels = {}
      await db.clear()
    }
  },

  users: {
    list: async () => {
      // return Object.keys(store.users).map( (id) => {
      //   const user = clone(store.users[id])
      //   user.id = id
      //   return user
      // })
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream().on( 'data', ({key, value}) => {
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
    create: async(user) => {
      if(!user.username) throw Error('Invalid user')
      id = uuid()
      //store.users[id] = user
      try {
        await db.put(`users:${id}`, JSON.stringify(merge(user, {id: id})))
      } catch(err) {
        throw(err)
      }
      return merge(user, {id: id})
    }
  },

  messages: {
    list: async(channelId) => {
    //   if(!channelId) throw Error('Invalid Channel')
    //   return Object.keys(store.channels[channelId].messages).map( x => {
    //     const content = store.channels[channelId].messages[x]
    //     return content
    //   })
    return new Promise( (resolve, reject) => {
      const messages = []
      db.createReadStream().on( 'data', ({key, value}) => {
        console.log(value)
        channel = JSON.parse(value)
        channel.id = key.split(':')[1]
        message = channel.messages
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(channel.messages)
      })
    })
    },
    create: async (message, channelId) => {
      if (!message.content) throw Error('Invalid message')
      message_id = uuid()
      
      //store.channels[channelId].messages.push(merge({creation: Date.now()},message))
      //content = message.content
      await db.put(`channel:${channelId}:message:${message_id}`, JSON.stringify(message))
      return merge({creation: Date.now()}, message)
    }
  }
}
