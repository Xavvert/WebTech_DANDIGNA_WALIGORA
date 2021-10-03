// ./handles.js
// Necessary imports
// question 8)

//common to all questions
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

//7)
const url = require('url')
const qs = require('querystring')

module.exports = {
    serverHandle: function (req, res) {

        //console.log("Hello NodeJS!")
        /*

        // Declare an http server
        http.createServer(function (req, res) {

          // Write a response header
          res.writeHead(200, {'Content-Type': 'text/plain'});

          // Write a response content
          res.end('Hello World\n');

        // Start the server
        }).listen(8080)

        */


        /* //3)
        const serverHandle = function (req, res) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Hello World\n');
        }

        */



        /* //4)
        const serverHandle = function (req, res) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(content);
          res.end();
        }

        */

        /*
        //5) ,  6) (http://localhost:8080/?name=John&email=john@email.com)
        // Import Node url module
        const url = require('url')
        const qs = require('querystring')

        const serverHandle = function (req, res) {
          // Retrieve and print the current path
          const path = url.parse(req.url).pathname;
          console.log(path);
              // Retrieve and print the queryParams
          const queryParams = qs.parse(url.parse(req.url).query);
          console.log(queryParams);

          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(content);
          res.end();
        }
        */

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
