const modeNames = {
	js: 'javascript',
	jsonld: 'json',
	styl: 'stylus',
	md: 'markdown'
}

let file = $('fileName').textContent
let fileExtension = file.substr(file.lastIndexOf('.') + 1)
var modeName = modeNames[fileExtension] || fileExtension

// Needs to be reassigned every time due to closures
window.saveFile = function() {
	$.post('/_/edit', {
		file,
		contents: editor.getSession().getValue()
	}).then(() => {
		console.log('File saved.')
	})
}

window.resizeEditor = function() {
	$('json-editor').style.height = (window.innerHeight - $('nav').clientHeight) + 'px'
	editor.resize()
}

// Resize editor when resizing window
if(!window.editorEventsRegistered) {
	window.addEventListener('resize', window.resizeEditor)

	// Capture Ctrl + S event
	window.addEventListener('keydown', function(e) {
		if(e.ctrlKey && e.which === 83) {
	        window.saveFile()
	        e.preventDefault()
	        return false
	    }
	})

	window.editorEventsRegistered = true
}

// Init editor
var editor = ace.edit('json-editor')

editor.setTheme("ace/theme/monokai")
editor.setOption('showLineNumbers', false)
editor.setOption('showGutter', false)
editor.setOption('printMargin', false)
editor.setOption('useSoftTabs', false)
editor.setOption('fontSize', '1em')

if(window.modesLoaded === undefined)
	window.modesLoaded = {}

window.updateMode = function() {
	let JSONMode = ace.require('ace/mode/' + modeName).Mode
	editor.session.setMode(new JSONMode())
}

if(window.modesLoaded[modeName]) {
	window.updateMode()
} else {
	let highlighter = document.createElement('script')
	highlighter.src = `https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/mode-${modeName}.js`
	highlighter.onload = function() {
		window.modesLoaded[modeName] = true
		window.updateMode()
	}

	document.head.appendChild(highlighter)
}

window.resizeEditor()