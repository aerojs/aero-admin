exports.get = (request, response) => {
	let validity = (new Date(this.app.site.certificate.validity.end)).toISOString()

	validity = validity.substring(0, validity.indexOf('T'))

	response.render({
		validity
	})
}