let editor = ace.edit('json-editor')
editor.setTheme("ace/theme/monokai")
editor.setOption('showLineNumbers', false)
editor.setOption('showGutter', false)
editor.setOption('printMargin', false)
editor.setOption('useSoftTabs', false)
editor.setOption('fontSize', '1em')

let JSONMode = ace.require("ace/mode/json").Mode
editor.session.setMode(new JSONMode())