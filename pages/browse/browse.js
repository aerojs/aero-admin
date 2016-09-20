let fs = Promise.promisifyAll(require('fs'))
let path = require('path')

exports.get = function*(request, response) {
	let localPath = request.params.join('/')
	let files = yield fs.readdirAsync(admin.site.path(localPath))
	files = files.filter(name => !name.startsWith('.') && name !== 'node_modules')

	let stats = {}
	files.forEach(name => stats[name] = fs.statAsync(admin.site.path(path.join(localPath, name))))
	stats = yield stats

	files = files.map(name => {
		return {
			name,
			info: stats[name]
		}
	})

	files.sort((a, b) => {
		let diff = b.info.isDirectory() - a.info.isDirectory()

		if(diff !== 0)
			return diff;

		return a.name.localeCompare(b.name)
	})

	response.render({
		files,
		localPath,
		path
	})
}