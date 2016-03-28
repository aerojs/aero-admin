window.updateProgress = function(pie) {
	let progressElement = pie.querySelector('.progress')
	let valueElement = pie.querySelector('.value')
	let value = parseFloat(valueElement.textContent)
	let progress = value / pie.dataset.limit
	progressElement.style.transform = `rotate(${180 + progress * 180}deg)`
}

let graphs = document.querySelectorAll('.dash-graph')

for(let i = 0; i < graphs.length; i++) {
	window.updateProgress(graphs[i])
}