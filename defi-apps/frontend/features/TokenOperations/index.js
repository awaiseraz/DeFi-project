import { localProvider } from "../../components/Wallet";
import { ethers } from "hardhat";
import TokenABI from "../../contracts/DeFiToken.json";
import TokenAddress from "../../contracts/DeFiToken-address.json";

// const TokenOperations = () => {
//     const getTotalSupply = (async () => {
//         try {
//             const contract = new ethers.Contract(TokenAddress.address, TokenABI.abi, localProvider);
//             const response = await contract.totalSupply();
//             setTotalSupply(ethers.utils.formatEther(response));
//         } catch (error) {
//             console.error('Cannot get total supply', error);
//         }
//     });
// }
// () => {
//     getTotalSupply();
// }
// export default TokenOperations;

// app.js
// const tokenAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with actual address
// const tokenABI = [
//   // Minimal ABI needed
//   "function totalSupply() view returns (uint256)",
//   "function balanceOf(address) view returns (uint256)",
//   "function decimals() view returns (uint8)"
// ];

let tokenContract;
let provider;
let signer;

// Initialize when MetaMask is connected
async function initContract() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  tokenContract = new ethers.Contract(TokenAddress.address, TokenABI.abi, signer);
  
  await updateTokenData();
}

// Update displayed token data
async function updateTokenData() {
  try {
    // Get total supply
    const totalSupply = await tokenContract.totalSupply();
    //const decimals = await tokenContract.decimals();
    const formattedSupply = ethers.utils.formatEther(totalSupply);
    document.getElementById('totalSupply').textContent = formattedSupply + " DFT";
    
    // Get user balance
    const userAddress = await signer.getAddress();
    const userBalance = await tokenContract.balanceOf(userAddress);
    const formattedBalance = ethers.utils.formatEther(userBalance);
    document.getElementById('userBalance').textContent = formattedBalance + " DFT";
  } catch (error) {
    console.error("Error fetching token data:", error);
  }
}

// Call this after successful wallet connection
async function onWalletConnected() {
  await initContract();
  
  // Update every 15 seconds (optional)
  setInterval(updateTokenData, 15000);
}

// Modify your existing connectWallet function to call this:
// document.getElementById('connectWallet').addEventListener('click', async () => {
//   if (window.ethereum) {
//     try {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       updateWalletUI(accounts[0]);
//       await onWalletConnected(); // Initialize contract after connection
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     alert("Please install MetaMask!");
//   }
// });