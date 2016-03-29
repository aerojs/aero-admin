window.createPage = function() {
	let pageId = $('page-id').value

	let extensions = Array.from(document.querySelectorAll('.page-element'))
	.map(element => element.getElementsByTagName('input')[0])
	.filter(element => element.checked)
	.map(element => element.id)

	$.post('/pages/add', {
		pageId,
		extensions
	}).then(response => {
		$.loadURL('/pages', true)
	})
}