const fileInput = document.getElementById('file');
const list = document.getElementById('list');
const root = document.getElementById('root');
const output = document.getElementById('output');

let actualOutput = '';

fileInput.addEventListener('change', (event) => {
	console.log(fileInput.files);

	let fileList = event.target.files;

	let canFiles = [];

	Object.keys(fileList).forEach((key) => {
		if (fileList[key].name.slice(-3) === 'can') {
			canFiles.push(fileList[key]);
		}
	});

	//CANFILES als liste rendern, onclick event inhalt des files lesen und ausgeben
	// nachdem die liste erstellt wurde soll nach string gesucht werden koennen

	for (let file of canFiles) {
		// console.log(file);
		// const reader = new FileReader();
		// reader.onload = function(e) {
		// 	output.innerText = reader.result;
		// };
		// reader.readAsText(file);
		addListItem(file, list);
	}

	console.log(canFiles);
});

function addListItem(file, listRef) {
	setTimeout(() => {
		let listItem = document.createElement('li');
		let infoBox = document.createElement('div');

		listItem.innerHTML = file.name;
		listItem.classList.add('sidebar__item');

		infoBox.style.fontSize = '1.6rem';
		infoBox.style.background = 'rgba(0, 0, 0, 0.9)';
		infoBox.style.color = 'white';
		infoBox.style.position = 'absolute';
		infoBox.style.visibility = 'hidden';
		infoBox.style.opacity = '0';
		infoBox.style.top = '0';
		infoBox.style.left = '105%';
		infoBox.style.padding = '1rem';
		infoBox.style.borderRadius = '3px';
		infoBox.style.transition = 'all .2s';

		infoBox.innerHTML += file.path;

		// on hover show box with pathname

		listItem.addEventListener('mouseenter', (event) => {
			infoBox.style.visibility = 'visible';
			infoBox.style.opacity = '1';
		});

		listItem.addEventListener('mouseleave', (event) => {
			infoBox.style.opacity = '0';
			infoBox.style.visibility = 'hidden';
		});

		listItem.addEventListener('click', () => {
			//LOAD FILE INSIDE THE OUTPUT
			const reader = new FileReader();
			reader.onload = function(e) {
				let htmlstring = reader.result
					.replace(/(\r\n|\n|\r)/gm, '<br>')
					.replace(/(\t)/gm, '&nbsp;&nbsp;&nbsp;&nbsp;');
				output.innerHTML = htmlstring;
				console.log(reader.result);
			};
			reader.readAsText(file);
		});

		listRef.appendChild(listItem);
		listItem.appendChild(infoBox);
	}, 0);
}

function onKeyDown(e) {
	if (e.keyCode === 9) {
		// tab key
		e.preventDefault(); // this will prevent us from tabbing out of the editor

		// now insert four non-breaking spaces for the tab key
		// var editor = document.getElementById("editor");
		let doc = output.ownerDocument.defaultView;
		let sel = doc.getSelection();
		let range = sel.getRangeAt(0);

		let tabNode = document.createTextNode('\u00a0\u00a0\u00a0\u00a0');
		range.insertNode(tabNode);

		range.setStartAfter(tabNode);
		range.setEndAfter(tabNode);
		sel.removeAllRanges();
		sel.addRange(range);
	}
}

output.addEventListener('keydown', onKeyDown);
