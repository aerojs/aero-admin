let path = require('path')

exports.get = (request, response) => {
	let pageId = request.params.join('/')
	let page = this.app.site.pages.get(pageId)

	response.render({
		page,
		path
	})
}