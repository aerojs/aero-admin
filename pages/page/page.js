let Humanize = require('humanize-plus')

exports.get = (request, response) => {
	let pageId = request.params.join('/')
	let page = this.app.site.pages.get(pageId)

	response.render({
		page,
		Humanize
	})
}