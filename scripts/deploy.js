const hre = require("hardhat");


async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.deployContract("EXTO", ["0x4CB3Fb9E857fb02632cE5a34af9D015A2468416d"]);

  console.log("Contract address:", await contract.getAddress());

  
  //await token.getChainID();

  // owners.forEach(async owner => {
  //   let ownerBalance = await extoToken.balanceOf(owner.address);
  
  //   console.log(ownerBalance);    
  // });



  // //const token = await MyTest.attach(MyTest.target);


  // //await token.withdraw();
  
  // console.log(`contract deployed to: ${MyTest.target}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
