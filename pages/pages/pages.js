exports.get = (request, response) => {
	let pages = Array.from(this.app.site.pages.values())
	pages.sort((a, b) => {
		return a.id.localeCompare(b.id)
	})

	pages.forEach(page => {
		page.indent = 0
		page.opacity = 1.0

		if(page.id.indexOf('/') !== -1) {
			page.indent = (page.id.match(/\//g) || []).length + 1
			page.opacity = Math.max(1.0 - page.indent * 0.1, 0.2)
		}
	})

	response.render({
		pages
	})
}