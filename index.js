let aero = require('aero')
let bodyParser = require('body-parser')

module.exports = app => {
	global.admin = aero(__dirname)

	admin.verbose = false
	admin.site = app
	admin.get('favicon.ico', app.server.routes.GET['favicon.ico'])

	admin.on('server started', () => {
		const link = `${admin.server.protocol}://localhost:${admin.server.port}`
		console.log(`Admin interface ${chalk.dim('started on')} ${chalk.green(link)}.`)
	})

	admin.use(bodyParser.json())

	// Run all startup modules
	require('fs').readdirSync(__dirname + '/startup').forEach(mod => require('./startup/' + mod))

	return admin.run()
}