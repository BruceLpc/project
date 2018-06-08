var connect = require('connect')
var url = require('url')
var serveStatic = require('serve-static')
var proxy = require('proxy-middleware')
var path = require('path')

var config = require('./build.config')

var distDir = config.distDir

var argv = process.argv
if (argv.length === 3) {
    distDir = argv[2]
}

var app = connect()

if (config.proxy) {
    for (var key in config.proxy) {
        var target = config.proxy[key]
        console.log('proxy [' + key + '] to ' + target)
        app.use(key, proxy(url.parse(target)))
    }
}

var root = path.resolve(__dirname, distDir)
app.use(serveStatic(root)).listen(3000, function () {
    console.log('www root: ' + root)
    console.log('Server running on http://localhost:3000 ...')
})
