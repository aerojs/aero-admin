exports.get = (request, response) => {
	response.render({
		averageResponseTime: this.app.site.averageResponseTime
		// ...
	})
}