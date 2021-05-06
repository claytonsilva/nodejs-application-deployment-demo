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

app.use(pino)


app.get('/', (req, res) => {
	res.json(showNetworkInterfaces())
})

app.get('/version', (req, res) => {
	res.json(file.version)
})

app.get('/hostname', (req, res) => {
	res.json(hostname())
})

app.get('/health', (req, res) => {
	res.status(200).json(ok)
})

app.get('/unhealth', (req, res) => {
	res.status(500).json(not_ok)
})

app.listen(port, () => { })

