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

	admin.use((request, response, next) => {
		request.globals = {
			fileExtensionClass: function(file) {
				let extension = file.substr(file.lastIndexOf('.') + 1)

				switch(extension) {
					case 'js':
						return 'fa-code'
					case 'jade':
						return 'fa-html5'
					case 'md':
						return 'fa-file-text-o'
					case 'json':
						return 'fa-gear'
					case 'jsonld':
						return 'fa-database'
					case 'styl':
						return 'fa-paint-brush'
					default:
						return 'fa-file-o'
				}
			}
		}
		next()
	})

	return admin.run()
}
