async function suggestStock() {
    try {
        const budgetInRupees = parseFloat(document.getElementById("budget").value);
        const selectedCompany = document.getElementById("selectedCompany").value;

        const apiKey = "BOJYSCSACVIGSCHI"; // Replace with your actual API key

        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectedCompany}&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch stock data for ${selectedCompany}. Status: ${response.status}`);
            throw new Error(`Failed to fetch stock data for ${selectedCompany}. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data["Global Quote"]) {
            const stockPriceUSD = parseFloat(data["Global Quote"]["05. price"]);
            const stockPriceINR = stockPriceUSD * 75; // Example conversion rate
            const sharesToBuy = Math.floor(budgetInRupees / stockPriceINR);

            const resultMessage = `${selectedCompany}: Buy ${sharesToBuy} shares at ${stockPriceINR.toFixed(2)} INR per share.`;
            document.getElementById("result").textContent = resultMessage;
        } else {
            console.error(`Failed to fetch stock data for ${selectedCompany}. Response: ${JSON.stringify(data)}`);
            throw new Error(`Failed to fetch stock data for ${selectedCompany}. Response: ${JSON.stringify(data)}`);
        }
    } catch (error) {
        console.error(error.message);
        document.getElementById("result").textContent = "Error suggesting stocks. Please try again.";
    }
}
