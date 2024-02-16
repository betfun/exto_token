const { expect } = require("chai");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  async function deployFixture() {
    
    const [owner, addr1, addr2] = await ethers.getSigners();

    const contract = await ethers.deployContract("EXTO");

    return { contract, owner, addr1, addr2 };
  }  

  describe("Deployment", function () {
    it("transfer and receive", async function () {
      const { contract, owner, addr1, addr2 } = await loadFixture(deployFixture);

      let contractaddress = await contract.getAddress();

      console.log("contract address : " + contractaddress);

      // Transfer 50 tokens from owner to addr1
      await contract.transfer(addr1.address, 50);
      expect(await contract.balanceOf(addr1.address)).to.equal(50);

      //이더전송
      await owner.sendTransaction({
        to: addr1.address,
        value: ethers.parseEther("0.0001"), // Sends exactly 1.0 ether
      });

      // 이더리움 가격 
      let ethaddr1balance = await ethers.provider.getBalance(addr1.address);
      // let ethaddr1balance = await owner.getBalance();
      // 토큰 가격
      let tokenaddr1balance = await contract.balanceOf(addr1.address);
      
      console.log("addr1 eth balance " + ethers.formatEther(ethaddr1balance));
      console.log("addr1 token balance " + tokenaddr1balance);

      let ownner = await contract.owner();
      console.log(ownner);

      // Transfer 50 tokens from addr1 to addr2
      await contract.connect(addr1).transfer(addr2.address, 50);
      expect(await contract.balanceOf(addr2.address)).to.equal(50);

      const blockNumber = await ethers.provider.getBlockNumber();
      console.log("Current block number: " + blockNumber);
    });

    it("exchangeToken", async function () {
      const { contract, owner, addr1, addr2 } = await loadFixture(deployFixture);

      let tokenaddr1balance = await contract.balanceOf(addr1.address);

      let eth_owner_balance = await ethers.provider.getBalance(owner.address);
      console.log("before : " + eth_owner_balance);
      console.log("before token : " + tokenaddr1balance);
      
      const ethAmount = ethers.parseEther("1"); // 1 이더리움
      await contract.connect(addr1).exchangeTokens({ value: ethAmount });
      
      eth_owner_balance = await ethers.provider.getBalance(owner.address);
      tokenaddr1balance = await contract.balanceOf(addr1.address);

      console.log("after : " + eth_owner_balance);      
      console.log("after token : " + tokenaddr1balance);

      // 이벤트를 확인합니다.
      const exchangeEvent = (await contract.queryFilter("ExchangeCompleted"))[0];
      console.log(exchangeEvent.args);

    });
  });
});