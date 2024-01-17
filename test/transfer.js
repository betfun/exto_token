const { expect } = require("chai");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");

describe("Token transfer", function () {
  it("test contract", async function () {
    
    const [owner, addr1, addr2] = await ethers.getSigners();

    let list = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("EXTO", ["0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"]);

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);

    let symbol = await hardhatToken.symbol();
    console.log(symbol);
  });
});