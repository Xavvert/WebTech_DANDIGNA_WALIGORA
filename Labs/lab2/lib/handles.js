// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
    '<html>' +
    '    <head>' +
    '        <meta charset="utf-8" />' +
    '        <title>ECE AST</title>' +
    '    </head>' +
    '    <body>' +
    '       <p>Hello World!</p>' +
    '    </body>' +
    '</html>'

const url = require('url')
const qs = require('querystring')

module.exports = {
    serverHandle: function (req, res) {

        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        if (path === '/hello/' && 'name' in params) {
            if (params['name'] == 'Xavier') {
                res.write('Hello, I am Xavier and I am 21 years old')
            } else if (params['name'] == 'Paul') {
                res.write('Hello, I am Paul and I am 21 years old')
            } else {
                res.write('Hello ' + params['name'])
            }
        } else {
            res.write('ERROR 404')
        }
        res.end();
    }
}
