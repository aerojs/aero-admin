let exec = Promise.promisify(require('child_process').exec)

exports.get = function*(request, response) {
	let output = yield exec('git status -s')
	let changes = output ? output.split('\n') : []

	response.render({
		changes
	})
}