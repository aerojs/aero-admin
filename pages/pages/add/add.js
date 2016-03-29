let mkdir = Promise.promisify(require('mkdirp'))
let fs = Promise.promisifyAll(require('fs'))
let path = require('path')

const defaultContent = {
	'jade': '',
	'js': 'exports.get = (request, response) => {\n\t\n}',
	'styl': '',
	'md': '',
	'json': '{\n\t\n}',
	'jsonld': '{\n\t\n}',
}

exports.get = (request, response) => {
	let pageIdList = Array.from(this.app.site.pages.values()).map(page => page.id)
	pageIdList.sort()

	response.render({
		pageIdList
	})
}

exports.post = function*(request, response) {
	if(!request.body.pageId)
		return response.end()

	let pageId = request.body.pageId
	let extensions = request.body.extensions
	let pagePath = path.join('pages', pageId)
	let parts = pageId.split('/')
	let baseName = parts[parts.length - 1]

	yield mkdir(pagePath)
	yield extensions.map(extension => fs.writeFileAsync(path.join(pagePath, baseName + `.${extension}`), defaultContent[extension], 'utf8'))

	response.end(pageId)
}