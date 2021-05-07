// imports
const express = require('express')
const { networkInterfaces, hostname } = require('os')
const { readFileSync } = require('fs')
const pino = require('pino-http')()


// instantiation
const app = express()
const port = process.env.PORT || 3000
const nets = networkInterfaces()
const file = JSON.parse(readFileSync('./package.json', 'utf-8'))


// function to extract network information from os
const showNetworkInterfaces = () => {
	const results = Object.create(null) // Or just '{}', an empty object
	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === 'IPv4' && !net.internal) {
				if (!results[name]) {
					results[name] = []
				}
				results[name].push(net.address)
			}
		}
	}
	return results
}

//express injections 
app.use(pino)
app.use(express.json())

// show all network information
app.get('/', (req, res) => {
	res.json(showNetworkInterfaces())
})

// reflect payload if is json parsed
app.post('/payload', (req, res) => {
	try {
		pino.logger.info({ payload: req.body })
		res.status(200).json(req.body)
	} catch (e) {
		const message = 'the payload is not a JSON valid'
		pino.logger.error(message)
		res.status(400).json(message)
	}
})

// return all env variables
app.get('/env', (req, res) => {
	res.json(process.env)
})

// return version of the application
app.get('/version', (req, res) => {
	res.json(file.version)
})

//return current hostname 
app.get('/hostname', (req, res) => {
	res.json(hostname())
})

//return health response 
app.get('/health', (req, res) => {
	res.status(200).json('ok')
})

//return unhealth response aways
app.get('/unhealth', (req, res) => {
	res.status(500).json('not_ok')
})

app.listen(port, () => {
	pino.logger.info('application started')
})

