let num = 0;
let amountLArray = [];
let amountWArray = [];
let totalArray = [];
let resultArray = [];
let playArray = [];
let wCount = 0;
let amountLTotal = 0;
let amountWTotal = 0;
let winCheck;
let dealerCheck;

document.getElementById('start').onclick = function() {
	num = Number(document.getElementById('People').value);
	if (isNaN(num) || num < 1) {
		alert("Please enter the number of people.");
		return;
	}
	dealerCheck = document.getElementById(`dealerCheck`);
	if (dealerCheck.checked) {
		let html = "<table border='1'>";
		html += "<tr><th>No.</th><th>Dealer</th><th>Amount Won</th><th>Total</th></tr>";

		for (let i = 1; i <= num; i++) {
			html += `<tr>
		<td>${i}</td>
		<td><input type="radio" name="dealer" id="check${i}"></td>
		<td><input type="number" id="amountWon${i}"></td>
		<td id="total${i}">0</td>
		</tr>`;
		}
		html += "</table><hr>";
		html += `<button id="calc">Calculation</button>`;
		document.getElementById('tableArea').innerHTML = html;

		document.getElementById('calc').onclick = function() {
			amountWTotal = 0;

			for (let i = 1; i <= num; i++) {
				let inputAmountW = document.getElementById(`amountWon${i}`);
				let amountW = Number(inputAmountW.value);

				if (inputAmountW.value === "" || isNaN(amountW)) {
					amountW = 0;
				}

				let totalCell = document.getElementById(`total${i}`);
				let total = Number(totalCell.innerText) || 0;
				totalArray[i] = total;

				let dCheck = document.getElementById(`check${i}`);
				if (dCheck.checked) {
					playArray[i] = "dealer";
					amountW = 0;
				} else {
					playArray[i] = "player";
				}
				amountWArray[i] = amountW;
				amountWTotal += amountW;
			}

			for (let i = 1; i <= num; i++) {
				if (playArray[i] === "dealer") {
					totalArray[i] -= amountWTotal;
				} else {
					totalArray[i] += amountWArray[i];
				}
			}

			for (let i = 1; i <= num; i++) {
				document.getElementById(`total${i}`).innerText = totalArray[i];
				let amountWForm = document.getElementById(`amountWon${i}`);
				amountWForm.value = ``;
				dCheck = document.getElementById(`check${i}`);
				if (dCheck.checked) {
					dCheck.checked = false;
				}
			}
		};





	} else {
		let html = "<table border='1'>";
		html += "<tr><th>No.</th><th>Winner</th><th>Amount Lost</th><th>Total</th></tr>";

		for (let i = 1; i <= num; i++) {
			html += `<tr>
		<td>${i}</td>
		<td><input type="checkbox" id="check${i}"></td>
		<td><input type="number" id="amountLost${i}"></td>
		<td id="total${i}">0</td>
		</tr>`;
		}
		html += "</table><hr>";
		html += `<label for="amountWon">Amount Won</label>
	<input id="amountWon" type="number"><hr>`;
		html += `<button id="calc">Calculation</button>`;
		document.getElementById('tableArea').innerHTML = html;

		document.getElementById('calc').onclick = function() {
			let inputAmountW = document.getElementById(`amountWon`);
			let amountW = Number(inputAmountW.value);
			wCount = 0;
			amountLTotal = 0;

			for (let i = 1; i <= num; i++) {
				let inputAmountL = document.getElementById(`amountLost${i}`);
				let amountL = Number(inputAmountL.value);

				if (inputAmountL.value === "" || isNaN(amountL)) {
					amountL = amountW;
				}
				amountLArray[i] = amountL;

				let totalCell = document.getElementById(`total${i}`);
				let total = Number(totalCell.innerText) || 0;
				totalArray[i] = total;

				winCheck = document.getElementById(`check${i}`);
				if (winCheck.checked) {
					resultArray[i] = "win";
					wCount++;
					amountLArray[i] = 0;
				} else {
					resultArray[i] = "lose";
				}
			}

			for (let i = 1; i <= num; i++) {
				amountLTotal += amountLArray[i];
			}

			for (let i = 1; i <= num; i++) {
				if (resultArray[i] === "win") {
					totalArray[i] += amountLTotal / wCount;
				} else {
					totalArray[i] -= amountLArray[i];
				}
			}

			for (let i = 1; i <= num; i++) {
				document.getElementById(`total${i}`).innerText = totalArray[i];
				let amountLForm = document.getElementById(`amountLost${i}`);
				amountLForm.value = ``;
				winCheck = document.getElementById(`check${i}`);
				if (winCheck.checked) {
					winCheck.checked = false;
				}
			}
			let amountWForm = document.getElementById(`amountWon`);
			amountWForm.value = ``;
		}
	};
};






