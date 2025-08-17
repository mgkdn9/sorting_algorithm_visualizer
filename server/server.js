// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const scoreRoutes = require('./app/routes/score_routes')
const userRoutes = require('./app/routes/user_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
const serverDevPort = 8000
const clientDevPort = 3000

// connect to MongoDB
mongoose.connect(db, {
	useNewUrlParser: true,
})

mongoose.connection.once('open', () => {
	console.log(`Connected to MongoDb at ${mongoose.connection.host}:${mongoose.connection.port}`)
})

// instantiate express app
const app = express()

// define allowed origin for CORS
const allowedOrigin = process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`

// set up CORS middleware
app.use(cors({
	origin: ['https://mgkdn9.github.io', 'http://localhost:3000'],
	credentials: true, // include if you use cookies or credentials in requests
}))

// handle preflight OPTIONS requests
app.options('*', cors({
	origin: ['https://mgkdn9.github.io', 'http://localhost:3000'],
	credentials: true,
}))

// middleware for token replacement (for auth headers)
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// parse JSON and URL-encoded request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// request logging middleware
app.use(requestLogger)

// register route files
app.use(scoreRoutes)
app.use(userRoutes)

// error handling middleware
app.use(errorHandler)

// start the server
const port = process.env.PORT || serverDevPort
app.listen(port, () => {
	console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
