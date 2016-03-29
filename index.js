const aero = require('aero')
const bodyParser = require('body-parser')

module.exports = app => {
	const admin = aero(__dirname)

	admin.verbose = false
	admin.site = app
	admin.get('favicon.ico', app.server.routes.GET['favicon.ico'])

	admin.on('server started', () => {
		const link = `${admin.server.protocol}://localhost:${admin.server.port}`
		console.log(`Admin interface ${chalk.dim('started on')} ${chalk.green(link)}.`)
	})

	admin.use(bodyParser.json())

	return admin.run()
}