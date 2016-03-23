exports.get = (request, response) => {
	let pages = Array.from(this.app.site.pages.values())

	pages.sort((a, b) => {
		return a.id.localeCompare(b.id)
	})

	pages.forEach(page => {
		page.indent = 0

		if(page.id.indexOf('/') !== -1)
			page.indent = (page.id.match(/\//g) || []).length
	})

	response.render({
		pages
	})
}