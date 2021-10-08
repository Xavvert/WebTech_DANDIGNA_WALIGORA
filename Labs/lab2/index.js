const express = require('express')
const metrics = require('./lib/metrics')
const app = express()

/*const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))*/


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
