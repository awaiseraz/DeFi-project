// // import { Web3ReactProvider } from '@web3-react/core';
// import { getLibrary, walletConnectConnector } from './components/Wallet';

// // Initialize Web3React
// const App = () => {
//     return (
//         <Web3ReactProvider getLibrary={getLibrary}>
//             {/* Your app components */}
//         </Web3ReactProvider>
//     );
// };


// Basic wallet connection simulation
document.getElementById('connectWallet').addEventListener('click', async () => {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //    document.getElementById('connectWallet').textContent =
            //      `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
            updateWalletUI(accounts[0]);

            // Simulate loading token data
            //document.getElementById('totalSupply').textContent = "1000000 DFT";
            //document.getElementById('userBalance').textContent = "5000 DFT";
        } 
        // else {
        //     //      alert("Please install MetaMask!");
        //     const connector = walletConnectConnector();
        //     await connector.activate();
        //     const provider = await connector.getProvider();
        //     const accounts = await provider.enable();
        //     updateWalletUI(accounts[0]);
        // }
    } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Wallet connection failed. Please try again.");
    }
});

function updateWalletUI(address) {
    const walletBtn = document.getElementById('connectWallet');
    walletBtn.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
    walletBtn.style.backgroundColor = "#2ecc71";
    //document.getElementById('totalSupply').textContent = "1000000 DFT";
    //document.getElementById('userBalance').textContent = "5000 DFT";
}
// // Form submission handlers
// document.getElementById('transferForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert(`Transfer ${document.getElementById('transferAmount').value} DFT to ${document.getElementById('recipient').value}`);
//     // Add actual blockchain interaction here
// });

// document.getElementById('burnForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert(`Transfer & Burn ${document.getElementById('burnAmount').value} DFT to ${document.getElementById('burnRecipient').value}`);
//     // Add actual blockchain interaction here
// });