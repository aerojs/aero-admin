let fs = Promise.promisifyAll(require('fs'))
let path = require('path')

// TODO: SECURITY

exports.get = function*(request, response) {
	let file = request.params.join('/')

	try {
		var contents = yield fs.readFileAsync(path.join(this.app.site.root, file), 'utf8')
	} catch(e) {
		contents = ''
	}

	response.render({
		file,
		contents
	})
}

exports.post = function*(request, response) {
	// Save file
	let file = request.body.file
	let contents = request.body.contents

	yield fs.writeFileAsync(path.join(this.app.site.root, file), contents, 'utf8')

	response.end()
}