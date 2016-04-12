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

const fileNameLabels = Array.from(document.querySelectorAll('.page-element'))
.map(element => element.getElementsByTagName('label')[0])
.map(label => label.querySelector('.file-name'))

window.updateFileNames = function() {
	let pageId = $('page-id').value
	let parts = pageId.split('/')
	let fileName = parts[parts.length - 1]

	for(let label of fileNameLabels) {
		label.textContent = fileName
	}
}

// Focus input field
$('page-id').focus()