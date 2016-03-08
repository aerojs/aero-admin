var editor = ace.edit('json-editor')
editor.setTheme("ace/theme/monokai")
editor.setOption('showLineNumbers', false)
editor.setOption('showGutter', false)
editor.setOption('printMargin', false)
editor.setOption('useSoftTabs', false)
editor.setOption('fontSize', '1em')

let fileName = $('fileName').textContent
let fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1)
let JSONMode = ace.require(`ace/mode/${fileExtension}`).Mode
editor.session.setMode(new JSONMode())

window.saveFile = function() {
	$.post('/_/edit', {
		fileName,
		contents: editor.getSession().getValue()
	})
}