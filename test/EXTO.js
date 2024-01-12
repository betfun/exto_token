const { expect } = require("chai");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Token contract", function () {

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    
    const [owner] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("EXTO");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    console.log(owner.address, ownerBalance);
    
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

  });

});