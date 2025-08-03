const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeFiToken", () => {
  let deployer, user1, user2, token, initialSupply;
  beforeEach(async () => {
    [deployer, user1, user2] = await ethers.getSigners();
    const tokenContractFactory = await ethers.getContractFactory("DeFiToken");
    token = await tokenContractFactory.deploy(deployer, deployer);
    initialSupply = ethers.parseEther("1000000");
  });

  it("Should have correct name, symbol and supply", async () => {
    expect(await token.name()).to.equal("DeFi Token");
    expect(await token.symbol()).to.equal("DFT");
    expect(await token.totalSupply()).to.equal(initialSupply);
  });

  it("Should transfer tokens from one user to other user", async () => {
    expect(await token.balanceOf(deployer.address)).to.equal(initialSupply);
    await token.connect(deployer).transfer(user1.address, ethers.parseEther("5"));
    expect(await token.balanceOf(user1)).to.equal(ethers.parseEther("5"));
    expect(await token.balanceOf(deployer)).to.equal(ethers.parseEther("999995"));
  });

  it("Should not transfer when the amount exceeded the user balance", async () => {
    await token.connect(deployer).transfer(user1.address, ethers.parseEther("5"));
    await expect(token.connect(user1).transfer(user2.address, ethers.parseEther("10"))).to.be.reverted;
    expect(await token.balanceOf(user1)).to.equal(ethers.parseEther("5"));
    expect(await token.balanceOf(user2)).to.equal(ethers.parseEther("0"));
  });

  it("Should burn tokens correctly when calling the transferWithAutoBurn", async () => {
    await token.connect(deployer).transferWithAutoBurn(user1.address, ethers.parseEther("10"));
    expect(await token.balanceOf(deployer)).to.equal(ethers.parseEther("999990"));
    expect(await token.balanceOf(user1)).to.equal(ethers.parseEther("9"));
  });
});