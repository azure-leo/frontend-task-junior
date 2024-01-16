fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1')
	.then(response => response.json())
	.then(data => {
		const tableBody = document.querySelector('#crypto-table')
		data.forEach((coin, index) => {
			const { id, symbol, name } = coin
			const row = document.createElement('tr')
			if (index < 5) {
				row.classList.add('background-blue')
			} 
			if (symbol === 'usdt') {
				row.classList.add('background-green')
			}
			row.innerHTML = `
				<td>${id}</td>
				<td>${symbol}</td>
				<td>${name}</td>
			`
			tableBody.appendChild(row)
		});
	})