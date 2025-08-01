// import { ethers } from "hardhat";
const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", await deployer.getAddress());

    const balance = await ethers.provider.getBalance(deployer);
    balanceETH = await ethers.formatEther(balance);
    console.log("Deployer balance:", balanceETH, "ETH");

    const Contract = await ethers.getContractFactory("DeFiToken");
    const contract = await Contract.deploy(deployer,deployer);
    await contract.waitForDeployment();
    console.log("Contract address:", await contract.getAddress());
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});