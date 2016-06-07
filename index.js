import makeStore from './server/store'
import { startServer } from './server/server'

var http = require('http')
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + '/dist'))
export const store = makeStore()
startServer(store)
var server = http.createServer(app)
server.listen(port)
