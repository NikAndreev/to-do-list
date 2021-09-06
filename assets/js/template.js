document.addEventListener('DOMContentLoaded', function(){

	const list = document.querySelector('#js-list');
	const listItemGroup = list.getElementsByClassName('js-list-item');
	const push = document.querySelector('#js-push');
	const input = document.querySelector('#js-input');
	const clear = document.querySelector('#js-clear');
	const messageListEmpty = document.querySelector('#js-message-list-empty');
	const messageInvalidLength = document.querySelector('#js-message-invalid-length');

	if (localStorage.getItem('listItemArray')) {
		let listItemArray = JSON.parse(localStorage.getItem('listItemArray'));

		listItemArray.forEach( listItem => {
			list.innerHTML += listItem;
		})
	}

	checkListEmptiness();

	push.addEventListener('click', ()=> {

		if (input.value.trim()) {
			const inputValue = input.value;
			input.value = '';

			const newItem = document.createElement('li');
			newItem.className = 'list-item js-list-item';
			newItem.innerHTML = `
			<span class='list-item__checkbox'></span>
			<span class='list-item__text'>${inputValue}</span>
			`;

			newItem.addEventListener('click', toComplete);
			list.append(newItem);
			checkListEmptiness();
			messageInvalidLength.classList.remove('active');
			toLocalStorage();
		} else {
			messageInvalidLength.classList.add('active');
			messageListEmpty.classList.remove('active');
		}

	});

	Array.from(listItemGroup).forEach( listItem => {
		listItem.addEventListener('click', toComplete);
	})

	clear.addEventListener('click', ()=> {
		Array.from(listItemGroup).forEach( listItem => {
			if (listItem.classList.contains('completed')) listItem.remove();
		});

		checkListEmptiness();
		toLocalStorage();
	});

	function toComplete() {
		this.classList.toggle('completed');
		toLocalStorage();
	}

	function toLocalStorage() {
		let listItemArray = [];
		for (let i = 0; i < listItemGroup.length; i++) {
			listItemArray.push(listItemGroup[i].outerHTML);
		}
		// console.log(listItemArray);
		localStorage.setItem('listItemArray', JSON.stringify(listItemArray));
		// console.log(JSON.parse(localStorage.getItem('listItemArray')))
	}

	function checkListEmptiness() {
		if (listItemGroup.length == 0) {
			messageListEmpty.classList.add('active');
			list.classList.add('empty');
			messageInvalidLength.classList.remove('active');
		} else {
			messageListEmpty.classList.remove('active');
			list.classList.remove('empty');
		}
	}
	 
});