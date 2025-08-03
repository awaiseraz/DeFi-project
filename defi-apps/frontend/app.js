// Basic wallet connection simulation
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('connectWallet').textContent =
                `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;

            // Simulate loading token data
            document.getElementById('totalSupply').textContent = "1000000 DFT";
            document.getElementById('userBalance').textContent = "5000 DFT";
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please install MetaMask!");
    }
});

// Form submission handlers
document.getElementById('transferForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Transfer ${document.getElementById('transferAmount').value} DFT to ${document.getElementById('recipient').value}`);
    // Add actual blockchain interaction here
});

document.getElementById('burnForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Transfer & Burn ${document.getElementById('burnAmount').value} DFT to ${document.getElementById('burnRecipient').value}`);
    // Add actual blockchain interaction here
});