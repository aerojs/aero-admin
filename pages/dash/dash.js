exports.get = (request, response) => {
	let certificateValidity = (new Date(this.app.site.certificate.validity.end)).toISOString()
	certificateValidity = certificateValidity.substring(0, certificateValidity.indexOf('T'))

	response.render({
		averageResponseTime: this.app.site.averageResponseTime,
		averageCodeSize: this.app.site.averageCodeSize,
		certificateValidity
		// ...
	})
}