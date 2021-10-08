const express = require('express')
const metrics = require('./lib/metrics')
const app = express()
const path = require ('path');
const {list,get} = require('./db');

/*const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))*/

const config = {
    port:3000,
};

app.set('port', 1337)

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

/*{
 "scripts": {
    "start": "node ./lib/index.js"
 },
}*/

app.get(
    '/hello/:name',
    (req, res) => res.send("Hello " + req.params.name)
)

app.get('/metrics.json', async (req, res) => {
    const data = await metrics.list()
    res.status(200).json(data)
})

app.listen(
    app.get('port'),
    () => console.log(`server listening on ${app.get('port')}`)
)


/*

// const express = require('express')
// const app = express()
const config = {
  port: 3000
}
const data = {
  channels: [{
    id: '1',
    name: 'Channel 1',
  },{
    id: '2',
    name: 'Channel 2',
  },{
    id: '3',
    name: 'Channel 3',
  }]
}

app.get('/', (req, res) => {
  // Project homepage
  // Return some HTML content inside `body` with:
  // * The page title
  // * A link to the `/channels` page
  // Don't bother with the `head` tag
})

app.get('/channels', (req, res) => {
  // List of channels
  // Return some HTML content inside `body` with:
  // * The page title
  // * A list of every channel with a link to the channel page
  // Notes:
  // * Channels are identified by channel ids.
  // * Make sure to find the appropriate HTML tag to respect the HTML semantic
  //   of a list
})

app.get('/channel/:id', (req, res) => {
  // Channel information
  // Print the channel title
})

// app.listen(config.port, () => {
//   console.log(`Chat is waiting for you at http://localhost:${config.port}`)
// })

*/