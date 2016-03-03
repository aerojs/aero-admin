const aero = require('aero')

module.exports = app => {
	const admin = aero(__dirname)
	
	admin.verbose = false
	admin.site = app

	admin.on('server started', () => {
		const link = `${admin.server.protocol}://localhost:${admin.server.port}`
		console.log(`Admin interface ${chalk.dim('started on')} ${chalk.green(link)}.`)
	})

	return admin.run()
}