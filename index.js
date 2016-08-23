let aero = require('aero')
let bodyParser = require('body-parser')

module.exports = app => {
	global.admin = aero(__dirname)

	// Disable output for admin interface
	admin.verbose = false

	// The website we're administering
	admin.site = app

	// Copy certificate from the actual site
	admin.security = admin.site.security
	admin.certificate = admin.site.certificate

	// Copy favicon from the actual site
	admin.get('favicon.ico', admin.site.server.routes.GET['favicon.ico'])

	admin.on('server started', () => {
		const link = `${admin.server.protocol}://localhost:${admin.server.port}`
		console.log(`Admin interface ${chalk.dim('started on')} ${chalk.green(link)}.`)
	})

	admin.use(bodyParser.json())

	// Run all startup modules
	require('fs').readdirSync(__dirname + '/startup').forEach(mod => require('./startup/' + mod))

	return admin.run()
}