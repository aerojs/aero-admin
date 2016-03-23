var editor = ace.edit('json-editor')
editor.setTheme("ace/theme/monokai")
editor.setOption('showLineNumbers', false)
editor.setOption('showGutter', false)
editor.setOption('printMargin', false)
editor.setOption('useSoftTabs', false)
editor.setOption('fontSize', '1em')

let file = $('fileName').textContent
let fileExtension = file.substr(file.lastIndexOf('.') + 1)
let JSONMode = ace.require(`ace/mode/${fileExtension}`).Mode
editor.session.setMode(new JSONMode())

window.saveFile = function() {
	$.post('/_/edit', {
		file,
		contents: editor.getSession().getValue()
	})
}

window.addEventListener('keydown', function(e) {
	// Ctrl S...
})