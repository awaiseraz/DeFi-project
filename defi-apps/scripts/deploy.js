// // import { ethers } from "hardhat";
// const { ethers } = require("hardhat");
// const fs = require("fs");

// async function main() {
//     const [deployer] = await ethers.getSigners();
//     // console.log("Deployer address:", await deployer.getAddress());
//     const contractList = [
//         ["DeFi Token", "DeFiToken"],
//         ["Meme Token", "MemeToken"],
//         ["Pair Factory", "PairFactory"],
//         ["AMM Router", "AMMRouter"]
//     ];

//     const balance = await ethers.provider.getBalance(deployer);
//     balanceETH = await ethers.formatEther(balance);
//     console.log("Deployer balance:", balanceETH, "ETH");

//     const Contract = await ethers.getContractFactory("DeFiToken");
//     const contract = await Contract.deploy(deployer, deployer);
//     await contract.waitForDeployment();
//     console.log("Contract address:", await contract.getAddress());
//     saveContractToFrontend(contract,"DeFiToken");
// }

// async function saveContractToFrontend(contract, name) {
//     const contractsDir = __dirname + "/../frontend/contracts";
//     if (!fs.existsSync(contractsDir)) {
//         fs.mkdirSync(contractsDir);
//     }

//     fs.writeFileSync(
//         contractsDir + `/${name}-address.json`,
//         JSON.stringify({ address: await contract.getAddress() }, undefined, 2)
//     );

//     const contractArtifact = artifacts.readArtifactSync(name);

//     fs.writeFileSync(
//         contractsDir + `/${name}.json`,
//         JSON.stringify({ contractArtifact }, null, 2)
//     );
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractList = [
    // "Contract Name", "Contract Factory Name"
    ["DeFi Token", "DeFiToken"],
    ["Meme Token", "MemeToken"],
    ["Pair Factory", "PairFactory"],
    ["AMM Router", "AMMRouter"], // AMMRouter must come after PairFactory
  ];

  let pairFactoryAddress;

  // Deploying the smart contracts and save contracts to frontend
  for (const [name, factory] of contractList) {
    let contractFactory = await ethers.getContractFactory(factory);
    let contract = factory === "AMMRouter" ? await contractFactory.deploy(pairFactoryAddress) : await contractFactory.deploy();
    // await contractFactory.waitForDeployment();
    console.log(`${name} Contract Address:`, await contract.getAddress());
    if (factory === "PairFactory") {
      pairFactoryAddress = contract.getAddress();
    }
    saveContractToFrontend(contract, factory);
  }

  console.log("Deployer: ", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer ETH balance: ", ethers.formatEther(balance));
}

function saveContractToFrontend(contract, name) {
  const contractsDir = __dirname + "/../frontend/contracts";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.getAddress() }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});