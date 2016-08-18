exports.render = (request, render) => {
	render({
		user: request.user
	})
}