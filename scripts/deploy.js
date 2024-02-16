const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  //만석 주소 0x4CB3Fb9E857fb02632cE5a34af9D015A2468416d
  //const contract = await ethers.deployContract("EXTO", ["0x4CB3Fb9E857fb02632cE5a34af9D015A2468416d"]);
  const contract = await ethers.deployContract("EXTO");

  console.log("Contract address:", await contract.getAddress());
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
