// import { ethers } from "hardhat";
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", await deployer.getAddress());

    const balance = await ethers.provider.getBalance(deployer);
    balanceETH = await ethers.formatEther(balance);
    console.log("Deployer balance:", balanceETH, "ETH");

    const Contract = await ethers.getContractFactory("DeFiToken");
    const contract = await Contract.deploy(deployer, deployer);
    await contract.waitForDeployment();
    console.log("Contract address:", await contract.getAddress());
    saveContractToFrontend(contract,"DeFiToken");
}

async function saveContractToFrontend(contract, name) {
    const contractsDir = __dirname + "/../frontend/contracts";
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + `/${name}-address.json`,
        JSON.stringify({ address: await contract.getAddress() }, undefined, 2)
    );

    const contractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        contractsDir + `/${name}.json`,
        JSON.stringify({ contractArtifact }, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});