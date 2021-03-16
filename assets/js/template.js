document.addEventListener("DOMContentLoaded", function(){

	const list = document.querySelector("#js-list");
	const listItemGroup = list.getElementsByClassName("js-list-item");
	const push = document.querySelector("#js-push");
	const input = document.querySelector("#js-input");
	const clear = document.querySelector("#js-clear");
	const messageListEmpty = document.querySelector("#js-message-list-empty");
	const messageInvalidLength = document.querySelector("#js-message-invalid-length");

	checkListEmptiness();

	push.addEventListener("click", ()=> {

		if (input.value.trim()) {
			const inputValue = input.value;
			input.value = "";

			const newItem = document.createElement("li");
			newItem.className = "list-item js-list-item";
			newItem.innerHTML = `
			<span class="list-item__checkbox"></span>
			<span class="list-item__text">${inputValue}</span>
			`;

			newItem.addEventListener("click", function() {
				this.classList.toggle("completed");
			});
			list.append(newItem);
			checkListEmptiness();
			messageInvalidLength.classList.remove("active");
		} else {
			messageInvalidLength.classList.add("active");
		}

	});

	Array.from(listItemGroup).forEach( listItem => {
		listItem.addEventListener("click", function(){
			this.classList.toggle("completed");
		});
	})

	clear.addEventListener("click", ()=> {
		Array.from(listItemGroup).forEach( listItem => {
			if (listItem.classList.contains("completed")) listItem.remove();
		});

		checkListEmptiness();
	});

	function checkListEmptiness() {
		if (listItemGroup.length == 0) {
			messageListEmpty.classList.add("active");
			list.classList.add("empty");
		} else {
			messageListEmpty.classList.remove("active");
			list.classList.remove("empty");
		}
	}
	 
});