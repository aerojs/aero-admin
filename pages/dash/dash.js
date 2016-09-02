let osVersion = null
let execWithCallback = require('child_process').exec
let exec = Promise.promisify((command, callback) => {
	execWithCallback(command, function(error, stdout, stderr) {
		callback(error, stdout)
	})
})

exec('lsb_release -r -s').then(output => osVersion = output.trim())

exports.get = (request, response) => {
	let certificateValidity = (new Date(this.app.site.certificate.validity.end)).toISOString()
	certificateValidity = certificateValidity.substring(0, certificateValidity.indexOf('T'))

	response.render({
		averageResponseTime: this.app.site.averageResponseTime,
		averageCodeSize: this.app.site.averageCodeSize,
		certificateValidity,
		osVersion
		// ...
	})
}