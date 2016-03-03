exports.get = (request, response) => {
	let pages = Array.from(this.app.site.pages.values())
	pages.sort((a, b) => {
		return a.id.localeCompare(b.id)
	})

	response.render({
		pages
	})
}